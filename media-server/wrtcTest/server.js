const express = require("express");
const app = express();
const https = require("https");
const wrtc = require("wrtc");
const fs = require("fs");

const mkdirp = require("mkdirp");
const path = require("path");

const options = {
  key: fs.readFileSync("./keys/server.key"),
  cert: fs.readFileSync("./keys/server.crt"),
};

const server = https.createServer(options, app).listen(4443, () => {
  //서버에서는 4443
  console.log("Create HTTPS Server");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let meetingRooms = {}; //meetingRooms[roomId][0]=socketId
let userNames = {}; //userNames[socketId]="김민수"
let meetingLeaders = {}; //meetingLeaders[roomId]=방장 이름이나 id  //아직 안썼음

let shareUsers = {}; //shareUsers[roomId]=socketId

let sendPCs = {
  //sendPCs[purpose][senderSocketId][receiverSocketId]= pc
  user: {},
  share: {},
};
let receivePCs = {
  //receivePCs[purpose][socketId]=pc
  user: {},
  share: {},
};

let streams = {
  //streams[purpose][roomId][socketId]=stream  //받는 stream만
  user: {},
  share: {},
};

let cursors = {};
let files = {};

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:edu.uxis.co.kr",
    },
    {
      urls: "turn:edu.uxis.co.kr?transport=tcp",
      username: "webrtc",
      credential: "webrtc100!",
    },
  ],
};
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/", express.static(__dirname + "/"));
app.get("/index", (request, response) => {
  //확인용 html url
  response.render("./test.html");
});

io.on("connection", function (socket) {
  console.log("connection");

  let userName;
  let roomId;
  let socketId;
  let edited_file;
  let isDup = false;

  //새로 접속했을때 방의 정보(유저수)를 얻음
  socket.on("room_info", (data) => {
    roomId = data.roomId;
    userName = data.userName;
    socketId = socket.id;
    try {
      if (meetingRooms[roomId] == undefined) {
        //내가 처음
        meetingRooms[roomId] = [];
        //meetingLeaders[roomId]=data.name;
      }

      //중북접속체크
      for (let i = 0; i < meetingRooms[roomId].length; i++) {
        if (userNames[meetingRooms[roomId][i]] === userName) {
          isDup = true;
          break;
        }
      }

      socket.emit("room_info", {
        //현재방 유저수 전달
        numOfUsers: meetingRooms[roomId].length,
        isDup,
        //roomLeader: meetingLeaders[roomId],
      });
    } catch (e) {
      console.error(e);
    }
  });

  //방에 처음 접속한 user에게 접속하고 있었던 user들의 정보를 제공하는 역할및 join room해줌
  socket.on("join_room", async (data) => {
    userJoinRoomHandler(data, socket);

    /*if(shareSwitch[message.roomId]==true){
            shareJoinRoomHandler(message,socket);
        }*/
  });

  //노캠 유저가 입장
  socket.on("noCam_enter", async (data) => {
    if (!streams["user"][roomId]) streams["user"][roomId] = {};
    streams["user"][roomId][socket.id] = null; //노캠은 stream이 null

    if (roomId === undefined) {
      roomId = data.roomId;
      userName = data.userName;
    }

    //해당 유저가 들어옴을 알려줌
    socket.broadcast.to(roomId).emit("user_enter", {
      socketId: socket.id,
      roomId: roomId,
      userName: userName,
      purpose: "user",
      isNoCam: true,
    });
  });
  //클라이언트 -> 서버 peerConnection offer
  socket.on("sender_offer", async (data) => {
    try {
      var offer = data.offer;

      let pc = createReceiverPeerConnection(socket, roomId, userName, data.purpose);
      let answer = await createReceiverAnswer(offer, pc); //offer에 대한 응답

      await io.to(socketId).emit("get_sender_answer", {
        answer,
        purpose: data.purpose,
      });
    } catch (error) {
      console.error(error);
    }
  });

  //클라이언트 <- 서버 peerConnection offer
  socket.on("receiver_offer", async (data) => {
    try {
      let offer = data.offer;
      let purpose = data.purpose;
      let senderSocketId = data.senderSocketId;
      let receiverSocketId = data.receiverSocketId;

      let pc = createSenderPeerConnection(receiverSocketId, senderSocketId, purpose, roomId);
      let answer = await createSenderAnswer(offer, pc);

      await io.to(receiverSocketId).emit("get_receiver_answer", {
        id: senderSocketId,
        purpose: purpose,
        answer,
      });
    } catch (error) {
      console.error(error);
    }
  });

  //클라이언트 -> 서버 candidate
  socket.on("sender_candidate", (data) => {
    try {
      let pc = receivePCs[data.purpose][socket.id];
      if (!data.candidate) return;
      if (!pc) return;
      pc.addIceCandidate(new wrtc.RTCIceCandidate(data.candidate));
    } catch (error) {
      console.error(error);
    }
  });

  //클라이언트 <- 서버 candidate
  socket.on("receiver_candidate", (data) => {
    try {
      if (!data.candidate) return;
      let pc = sendPCs[data.purpose][data.senderSocketId][data.receiverSocketId];
      pc.addIceCandidate(new wrtc.RTCIceCandidate(data.candidate));
    } catch (error) {
      console.error(error);
    }
  });

  //유저가 나감
  socket.on("disconnect", () => {
    if (isDup) {
      console.log("중복접속자", userName, "나감");
      return;
    }

    try {
      console.log(
        roomId,
        "방의 ",
        userName,
        "이 나감!",
        meetingRooms[roomId].length - 1,
        "명 남음"
      );
    } catch (e) {
      return;
    }

    try {
      //화면공유 진행중인 경우
      if (shareUsers[roomId] !== undefined) {
        let shareSocketId = shareUsers[roomId];

        if (shareSocketId == socket.id) {
          //공유중인 사람이 나감
          console.log("화면공유 하던 ", userName, "나감");
          try {
            delete shareUsers[roomId];
          } catch (e) {}
          try {
            receivePCs["share"][socket.id].close();
            delete receivePCs["share"][socket.id];
          } catch (e) {}

          for (let i = meetingRooms[roomId].length - 1; i >= 0; i--) {
            if (meetingRooms[roomId][i] !== socket.id) {
              try {
                let otherSocketId = meetingRooms[roomId][i];
                sendPCs["share"][socket.id][otherSocketId].close();
              } catch (e) {}
            }
          }
          try {
            delete sendPCs["share"][socket.id];
          } catch (e) {}
          try {
            delete streams["share"][roomId];
          } catch (e) {}
          socket.broadcast.to(roomId).emit("share_disconnect", { id: socket.id });
        } else {
          console.log("화면공유 받던 ", userName, "나감");
          try {
            sendPCs["share"][shareSocketId][socketId].close();
            delete sendPCs["share"][shareSocketId][socketId];
          } catch (e) {}
        }
      }
    } catch (e) {
      console.error(e);
    }

    socket.broadcast.to(roomId).emit("user_exit", {
      socketId: socketId,
      userName: userName,
    });

    //유저 정보 지우기
    try {
      let outUserIdx = 0;
      for (let i = meetingRooms[roomId].length - 1; i >= 0; i--) {
        if (meetingRooms[roomId][i] == socketId) {
          outUserIdx = i;
        } else {
          let otherSocketId = meetingRooms[roomId][i];
          try {
            sendPCs["user"][socketId][otherSocketId].close();
          } catch (e) {}
          try {
            sendPCs["user"][otherSocketId][socketId].close();
          } catch (e) {}
          try {
            delete sendPCs["user"][otherSocketId][socketId];
          } catch (e) {}
        }
      }
      try {
        delete sendPCs["user"][socketId];
      } catch (e) {}

      try {
        receivePCs["user"][socketId].close();
        delete receivePCs["user"][socketId];
      } catch (e) {}
      try {
        delete userNames[socketId];
      } catch (e) {}

      try {
        delete streams["user"][roomId][socketId];
      } catch (e) {
        console.log(e);
      }
      meetingRooms[roomId].splice(outUserIdx, 1);
      if (meetingRooms[roomId].length == 0) {
        try {
          delete meetingRooms[roomId];
        } catch (e) {}
        try {
          delete streams["user"][roomId];
        } catch (e) {}
      }
    } catch (e) {
      console.error(e);
    }

    //커서, 파일 삭제
    if (cursors[roomId]) {
      if (cursors[roomId][userName]) {
        delete cursors[roomId][userName];
        socket.broadcast.to(roomId).emit("cursorremove", userName);
      }

      if (meetingRooms[roomId] === undefined) {
        try {
          delete files[edited_file];
        } catch (e) {}
        try {
          delete cursors[roomId];
        } catch (e) {}
        //console.log(Object.keys(files))
      }
    }

    //리액트 에디터 정보삭제
    if (meetingRooms[roomId] === undefined) {
      try {
        delete files[roomId];
      } catch (e) {}
    }
  });

  //새로운 유저가 방에 들어왔는데 현재 방이 화면공유가 진행중이면 공유해줌
  socket.on("get_share", () => {
    if (shareUsers[roomId] !== undefined) {
      let shareSocketId = shareUsers[roomId];
      let shareUserName = userNames[shareSocketId];
      socket.emit("share_request", {
        userName: shareUserName,
        socketId: shareSocketId,
      });
    }
  });

  //현재 room에 화면공유가 가능한지
  socket.on("share_check", () => {
    if (shareUsers[roomId] === undefined) {
      socket.emit("share_ok");
    }
  });

  //화면 공유자가 화면공유를 중지함. 모든 유저에게 화면공유 중지해줌
  socket.on("share_disconnect", (data) => {
    console.log(roomId, "방의 화면 공유 중지함");
    try {
      if (shareUsers[roomId] != socket.id) return;
      try {
        delete shareUsers[roomId];
      } catch (e) {}

      try {
        receivePCs["share"][socket.id].close();
        delete receivePCs["share"][socket.id];
      } catch (e) {}

      for (let i = meetingRooms[roomId].length - 1; i >= 0; i--) {
        if (meetingRooms[roomId][i] !== socket.id) {
          try {
            let otherSocketId = meetingRooms[roomId][i];
            sendPCs["share"][socket.id][otherSocketId].close();
          } catch (e) {}
        }
      }
      try {
        delete sendPCs["share"][socket.id];
      } catch (e) {}
      try {
        delete streams["share"][roomId];
      } catch (e) {}

      socket.broadcast.to(roomId).emit("share_disconnect", { id: socket.id });
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("send_message", function (data) {
    console.log("message room", roomId);
    socket.broadcast.to(roomId).emit("get_message", data);
  });

  socket.on("show_status", () => {
    let names = "";
    let nn_1 = 0;
    meetingRooms[roomId].forEach((id) => {
      names += userNames[id] + ",";

      try {
        nn_1 += Object.keys(sendPCs["user"][id]).length;
      } catch (e) {}
    });

    console.log("이름들", names);
    console.log("snedPcs 총 갯수( n*(n-1) ):", nn_1);
    Object.keys(cursors[roomId]).forEach((name) => {
      console.log(name, "의 커서:", cursors[roomId][name]);
    });
    console.log("==========");

    /*let receivePCsNames=""
        receivePCs['user'].forEach((id)=> {
            receivePCsNames+=userNames[id]+","
        })
        console.log("전체 receive :",receivePCsNames)*/
  });

  //=======================================================================

  //처음 접속시 코드편집기의 파일 정보 받기
  socket.on("open", (data) => {
    edited_file = data.filename;
    console.log("open", edited_file);
    if (typeof files[edited_file] === "undefined") {
      //없으면 생성
      cursors[roomId] = {};
      files[edited_file] = {
        version: 0,
        content: "hello world!!",
      };
    }
    console.log("open version:", files[edited_file].version);
    for (var otheruser in cursors[roomId]) {
      if (!cursors[roomId].hasOwnProperty(otheruser)) continue;
      if (cursors[roomId][otheruser].file != edited_file) continue;

      socket.emit("cursor", {
        user: otheruser,
        cursor: cursors[roomId][otheruser].cursor,
      });
    }
    socket.emit("open", {
      version: files[edited_file].version,
      content: files[edited_file].content,
    });
  });

  //코드 편집시
  socket.on("post", function (operation, callback) {
    if (applyOperation(files[edited_file], operation)) {
      //편집 문제없음
      callback({ success: true, version: files[edited_file].version });
      socket.broadcast.to(roomId).emit("operation", operation);
    } else {
      //편집에 문제생김
      callback({ success: false });
      console.log(
        userName,
        "으로인한 롤백",
        "oper:",
        operation.version,
        "file:",
        files[edited_file].version
      );

      //문제생기기 전으로 롤백시키기
      socket.emit("rollback", {
        version: files[edited_file].version,
        content: files[edited_file].content,
        cursor: cursors[roomId][userName].cursor,
      });
    }
  });

  //커서이동시
  socket.on("cursor", function (cursor) {
    cursors[roomId][userName] = { cursor: cursor, file: edited_file };
    socket.broadcast.to(roomId).emit("cursor", { user: userName, cursor: cursor });
  });

  //처음 접속시 리액트 코드편집기의 파일 정보 받기
  socket.on("get_editor", (data) => {
    //roomId = data.roomId;
    //socket.join(roomId); //나중에 지워주기!!!!!!!!

    console.log("getEditor", roomId);
    if (typeof files[roomId] === "undefined") {
      //없으면 생성
      files[roomId] = {
        version: 0,
        content: "hello world!!",
      };
    }
    console.log("open version:", files[roomId].version);

    socket.emit("get_editor", {
      version: files[roomId].version,
      content: files[roomId].content,
    });
  });

  //유저의 리액트 코드 편집
  socket.on("change_editor", ({ content, version, changes }) => {
    let file = files[roomId];
    //console.log(roomId, "입력받음", changes.text);

    //동기화 문제발생
    if (version < file.version) {
      console.log(
        "롤백발생! 유저",
        userName,
        "의 버전:",
        version,
        "파일 버전",
        file.version,
        ", 수정내용:",
        changes.text
      );
      socket.emit("rollback_editor", {
        version: file.version,
        content: file.content,
      });
    } // 문제없음
    else {
      file.content = content;
      file.version++;
      socket.broadcast.to(roomId).emit("change_editor", { version: file.version, changes });
    }
  });

  //그림 그림
  socket.on("drawing", function (data) {
    socket.broadcast.to(roomId).emit("drawing", data);
  });

  //전체 지우기
  socket.on("clear", function () {
    socket.broadcast.to(roomId).emit("clear");
  });
});

//기존에 접속해있던 유저들의 정보를 새로온 유저에게 전달해주고
//새로온 유저를 room에 join
function userJoinRoomHandler(data, socket) {
  let roomId = data.roomId;
  try {
    var users = [];
    for (let i in meetingRooms[roomId]) {
      let otherSocketId = meetingRooms[roomId][i];
      let isNoCam = false; //노캠유저인지
      if (streams["user"][roomId][otherSocketId] === null) {
        isNoCam = true;
      }
      users.push({
        socketId: otherSocketId,
        userName: userNames[otherSocketId],
        isNoCam,
      });
    }
    socket.emit("all_users", {
      //같은 방 유저의 socketId와 userName 전달, 클라이언트는 받을 pc를 생성하게됨
      users: users,
    });

    socket.join(roomId); //방에 join

    meetingRooms[roomId].push(socket.id);
    userNames[socket.id] = data.userName;
    console.log(
      data.userName,
      "가  ",
      roomId,
      "방에 join함 id:",
      socket.id,
      ", 총",
      meetingRooms[roomId].length + "명"
    );
  } catch (error) {
    console.error(error);
  }
}

//클라이언트의 영상 수신용 pc 생성
function createReceiverPeerConnection(socket, roomId, userName, purpose) {
  let pc = new wrtc.RTCPeerConnection(pc_config);

  receivePCs[purpose][socket.id] = pc;

  pc.onicecandidate = (e) => {
    if (!e.candidate) return;
    socket.emit("get_sender_candidate", {
      candidate: e.candidate,
      purpose: purpose,
    });
  };

  pc.oniceconnectionstatechange = (e) => {
    //console.log(e);
  };
  var once_ontrack = 1;
  pc.ontrack = (e) => {
    if (once_ontrack == 1) {
      //video, audio로 두번하므로 한번만 하도록  ??
      //해당 방 사람들에게 알려줌
      if (purpose == "user") {
        userOntrackHandler(e.streams[0], socket, roomId, userName);
      } else if (purpose == "share") {
        shareOntrackHandler(e.streams[0], socket, roomId, userName);
      }
    }
    once_ontrack += 1;
  };
  return pc;
}

//클라이언트에게 영상 전송용 pc 생성
function createSenderPeerConnection(receiverSocketId, senderSocketId, purpose, roomId) {
  let pc = new wrtc.RTCPeerConnection(pc_config);

  if (!sendPCs[purpose][senderSocketId]) {
    sendPCs[purpose][senderSocketId] = {};
  }
  sendPCs[purpose][senderSocketId][receiverSocketId] = pc;

  let stream;
  stream = streams[purpose][roomId][senderSocketId];

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      io.to(receiverSocketId).emit("get_receiver_candidate", {
        id: senderSocketId,
        candidate: e.candidate,
        purpose: purpose,
      });
    }
  };

  pc.oniceconnectionstatechange = (e) => {
    //console.log(e);
  };

  //전송용 pc에 stream 넣어주는듯
  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream);
  });

  return pc;
}

//들어온 유저 stream 저장 후, 같은방 유저에게 새 유저 접속을 알림
function userOntrackHandler(stream, socket, roomId, userName) {
  if (!streams["user"][roomId]) streams["user"][roomId] = {};
  streams["user"][roomId][socket.id] = stream; //유저의 stream을 변수에 저장

  //해당 유저가 들어옴을 알려줌
  socket.broadcast.to(roomId).emit("user_enter", {
    socketId: socket.id,
    roomId: roomId,
    userName: userName,
    purpose: "user",
    isNoCam: false,
  });

  return;
}

//시작된 화면공유 stream 저장 후 같은방 사람에게 화면공유 시작을 알려줌
function shareOntrackHandler(stream, socket, roomId, userName) {
  if (!streams["share"][roomId]) streams["share"][roomId] = {};
  streams["share"][roomId][socket.id] = stream; //화면공유 stream을 변수에 저장
  shareUsers[roomId] = socket.id;

  console.log(roomId, "방의 ", userName, "가 화면공유 시작");

  //같은방 사용자에게 화면공유를 알림
  socket.broadcast.to(roomId).emit("share_request", {
    userName: userName,
    socketId: socket.id,
  });

  return;
}

//receiver offer에 대한 응답
async function createReceiverAnswer(offer, pc) {
  try {
    await pc.setRemoteDescription(offer);
    let answer = await pc.createAnswer({
      //수신은 true로
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await pc.setLocalDescription(answer);

    return answer;
  } catch (err) {
    console.error(err);
  }
}

//sender offer에 대한 응답
async function createSenderAnswer(offer, pc) {
  try {
    await pc.setRemoteDescription(offer);
    let answer = await pc.createAnswer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
    });
    await pc.setLocalDescription(answer);

    return answer;
  } catch (err) {
    console.error(err);
  }
}

var applyOperation = function (file, operation) {
  if (operation.version < file.version) {
    console.error("Dropped operation, bad version (TODO)", operation);

    return false;
  }
  if (typeof operation.insert !== "undefined") {
    file.content = [
      file.content.slice(0, operation.position),
      operation.insert,
      file.content.slice(operation.position),
    ].join("");
    file.version++;
  } else if (typeof operation.remove !== "undefined") {
    file.content = [
      file.content.slice(0, operation.position),
      file.content.slice(operation.position + operation.remove),
    ].join("");
    file.version++;
  }
  return true;
};
