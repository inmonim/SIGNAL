let numOfUsers = 0;
let userNames = {}; //userNames[socketId]="이름"
let socketIds = {}; //socketIds["이름"]=socketId

let sendPC = {
  //sendPC[purpose]=pc
  user: {}, //유저 얼굴
  share: {}, //화면공유
};
let receivePCs = {
  //receivePCs[purpose][socketId]=pc
  user: {},
  share: {},
};

let shareUserName; //undefined

let myStream, selfStream;

onload2();
function onload2() {
  document.querySelector("#share_start_btn").onclick = shareCheck;
  document.querySelector("#share_stop_btn").onclick = shareStop;
  document.querySelector("#video_btn").onclick = videoFlip;
  document.querySelector("#audio_btn").onclick = audioFlip;
  document.querySelector("#msg_btn").onclick = sendMsg;
}
function sendMsg() {
  let message = document.querySelector("#msg_input").value;
  document.querySelector("#msg_input").value = "";
  document.querySelector("#msg_area").innerHTML = "나의 메시지 : " + message;
  socket.emit("send_message", { userName: myName, message });
}
function showStatus() {
  socket.emit("show_status");
  /*myStream.getVideoTracks().forEach(ele=>{
        console.log(ele.getSettings());
    })*/
}

// 막 들어왔을때 현재 화면공유중이면 화면공유받음
function getShare() {
  socket.emit("get_share");
}

let videoOn = false;
let audioOn = false;
function videoFlip() {
  videoOn = !videoOn;
  myStream.getVideoTracks().forEach((track) => (track.enabled = videoOn));
}
function audioFlip() {
  audioOn = !audioOn;
  myStream.getAudioTracks().forEach((track) => (track.enabled = audioOn));
}

//기존 방의 유저수와 방장이름 얻어옴
socket.on("room_info", (data) => {
  console.log(data.numOfUsers, "명이 이미 접속해있음");
  numOfUsers = data.numOfUsers + 1;
  console.log(data.isDup)
  if (data.isDup) {
    if (alert("중복접속입니다.")) {
      window.location = "..";
    }
  } else {
    meetingStart();
  }
});

//user가 들어오면 이미 들어와있던 user에게 수신되는 이벤트
socket.on("user_enter", async (data) => {
  enterUserHandler(data);
});

//처음 방에 접속했을 때, 이미 방안에 들어와있던 user들의 정보를 받음
socket.on("all_users", data =>{ 
    console.log("all_users : ",data.users)
    let users =data.users ;
    allUsersHandler(data)  //미리 접속한 유저들의 영상을 받기위한 pc, offer 생성

    //이미 해당 방이 화면 공유 중이면 화면 공유 받음
    getShare();
    
})


//클라이언트 입장에서 보내는 역할의 peerConnection 객체에서 수신한 answer 메시지(sender_offer의 응답받음)
socket.on("get_sender_answer", (data) => {
  try {
    console.log("get_sender_answer 받음");
    sendPC[data.purpose].setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  } catch (error) {
    console.error(error);
  }
});

//클라이언트 입장에서 받는 역할의 peerConnection 객체에서 수신한 answer 메시지(receiver_offer의 응답받음)
socket.on("get_receiver_answer", (data) => {
  try {
    let pc = receivePCs[data.purpose][data.id];
    if (pc.signalingState === "stable") return; //?
    pc.setRemoteDescription(new RTCSessionDescription(data.answer));
  } catch (error) {
    console.error(error);
  }
});

//보내는 역할의 peerConnection 객체에서 수신한 candidate 메시지
socket.on("get_sender_candidate", (data) => {
  try {
    let pc = sendPC[data.purpose];
    if (!data.candidate) return;
    if (!pc) return;
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  } catch (error) {
    console.error(error);
  }
});

//받는 역할의 peerConnection 객체에서 수신한 candidate 메시지
socket.on("get_receiver_candidate", (data) => {
  try {
    let pc = receivePCs[data.purpose][data.id];
    if (!data.candidate) return;
    if (!pc) return;
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  } catch (error) {
    console.log(error);
  }
});

//같은 방에 있던 user가 나가면 그 방 안에있던 모든 user들에게 전송되는 이벤트
socket.on("user_exit", (data) => {
  exitUserHandler(data);
});

//채팅 받음
socket.on("get_message", (data) => {
  console.log("message : ", data);
  document.querySelector("#msg_area").innerHTML =
    data.userName + "의 메시지 : " + data.message;
});

//내 비디오에 내 영상 넣고 전송하기
function meetingStart() {
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: { width: 320, height: 240 },
    })
    .then(async (stream) => {
      myStream = stream;
      myStream.getVideoTracks().forEach((track) => (track.enabled = videoOn)); //초기에 mute
      myStream.getAudioTracks().forEach((track) => (track.enabled = audioOn));

      let myVideo = document.querySelector("#my_video");
      myVideo.autoplay = true;
      myVideo.playsinline = true;

      //내 영상 비디오에 띄우기
      selfStream = new MediaStream();
      selfStream.addTrack(stream.getVideoTracks()[0]);
      myVideo.srcObject = selfStream;

      //내 영상 전송용 pc와 offer생성
      sendPC["user"] = createSenderPeerConnection(stream, "user");
      let offer = await createSenderOffer(sendPC["user"]);

      //방에 입장 요청
      socket.emit("join_room", {
        roomId: roomId,
        userName: myName,
      });

      //sender_offer를 전송
      await socket.emit("sender_offer", {
        offer,
        purpose: "user",
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

//스트림 보내는 역할의 peerConnection 객체 생성
function createSenderPeerConnection(stream, purpose, is_audio_true = 1) {
  let pc = new RTCPeerConnection(pc_config);

  pc.oniceconnectionstatechange = (e) => {
    //console.log(e);
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      socket.emit("sender_candidate", {
        candidate: e.candidate,
        purpose: purpose,
      });
    }
  };

  if (stream) {
    var videoTrack = stream.getVideoTracks()[0];
    var audioTrack = stream.getAudioTracks()[0];
    pc.addTrack(videoTrack, stream);
    //console.log("audio:",is_audio_true)
    if (is_audio_true != 0)
      //나중에 수정하기
      pc.addTrack(audioTrack, stream);
  } else {
    console.log("no localStream");
  }

  return pc;
}

//스트림 받는 역할의 peerConnection 객체 생성
function createReceiverPeerConnection(senderSocketId, userName, purpose) {
  let pc = new RTCPeerConnection(pc_config);
  receivePCs[purpose][senderSocketId] = pc;
  pc.oniceconnectionstatechange = (e) => {
    //console.log(e);
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      //수신 candidate 보냄
      socket.emit("receiver_candidate", {
        candidate: e.candidate,
        receiverSocketId: socket.id,
        senderSocketId: senderSocketId,
        purpose: purpose,
        roomId: roomId,
      });
    }
  };

  //스트림 보내는 쪽의 peerConnection에서 addTrack시 이벤트 발생
  var once = 1;
  pc.ontrack = (e) => {
    if (once == 1) {
      //stream을 video에 넣어주기
      if (purpose == "user") {
        userOntrackHandler(e.streams[0], userName, senderSocketId);
      } else if (purpose == "share") {
        shareOntrackHandler(e.streams[0], userName, senderSocketId);
      }
      //console.log('한번만 나오는지')
    }
    once += 1;
  };

  return pc;
}

//보내는 역할의 peerConnection 객체에서 offer 전송 (통신 시작)
async function createSenderOffer(pc) {
  try {
    let offer = await pc.createOffer({
      //보내기 위함으로 false임..?
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
    });
    await pc.setLocalDescription(new RTCSessionDescription(offer));

    //console.log("send offer:",offer);

    return offer;
  } catch (error) {
    console.log(error);
  }
}

//받는 역할의 peerConnection 객체에서 offer 전송 (통신 시작)
async function createReceiverOffer(pc) {
  try {
    let offer = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await pc.setLocalDescription(new RTCSessionDescription(offer));

    return offer;
  } catch (error) {
    console.error(error);
  }
}

//기존 모든 유저들 영상을 받기위한 pc와 offer생성
async function allUsersHandler(data) {
  //자신을 제외한 모든 유저의 receiverPc생성, 비디오 생성(처음 접속했을 때 한번만)
  try {
    let len = data.users.length;

    for (let i = 0; i < len; i++) {
      var socketId = data.users[i].socketId;
      var userName = data.users[i].userName;
      var stream = data.users[i].stream;

      makeUserVideo(socketId, userName);

      userNames[socketId] = userName;
      socketIds[userName] = socketId;

      /*
            if(stream ===null){ //noCam인 경우
                usersName[socketId]=userName;
                userOntrackHandler(null, userName, socketId) 
            }
            else{*/

      //기존 유저들 영상을 받을 pc와 offer를 생성
      let pc = createReceiverPeerConnection(socketId, userName, "user");
      let offer = await createReceiverOffer(pc);

      //수신 offer 보냄
      await socket.emit("receiver_offer", {
        offer,
        receiverSocketId: socket.id,
        senderSocketId: socketId,
        purpose: "user",
      });
    }
  } catch (err) {
    console.error(err);
  }
}

//누군가 들어왔을 때
async function enterUserHandler(data) {
  try {
    makeUserVideo(data.socketId, data.userName);

    let pc = createReceiverPeerConnection(data.socketId, data.userName, "user");
    let offer = await createReceiverOffer(pc);

    userNames[data.socketId] = data.userName;
    socketIds[data.userName] = data.socketId;
    numOfUsers++;

    await socket.emit("receiver_offer", {
      offer,
      receiverSocketId: socket.id,
      senderSocketId: data.socketId,
      purpose: "user",
    });
  } catch (error) {
    console.error(error);
  }
}

//유저별 stream을 video에 넣어줌(화면에 영상 띄움)
function userOntrackHandler(stream, userName, senderSocketId) {
  //##################수정해서 쓰삼#######################
  //userStream[senderSocketId]=stream;
  let videoId = userName + "_video";
  let video = document.querySelector(`#${videoId}`);
  video.srcObject = stream;
}

//새로운 유저 비디오 생성
function makeUserVideo(socketId, userName) {
  //##################수정해서 쓰삼#######################
  let box = document.querySelector(".user-video-box");
  let newVideo = document.createElement("video");
  newVideo.autoplay = true;
  newVideo.playsinline = true; //?
  newVideo.id = userName + "_video";
  box.appendChild(newVideo);
}

//나간 유저 video삭제
function removeUserVideo(socketId, userName) {
  //##################수정해서 쓰삼#######################
  let video = document.querySelector(`#${userName}_video`);
  video.remove();
}

//나간 유저의 정보 지우고 video 지우기
function exitUserHandler(data) {
  let socketId = data.socketId;
  let userName = data.userName;

  numOfUsers--;
  try {
    delete userNames[socketId];
    delete socketIds[userName];

    if (!receivePCs["user"][socketId]) {
      receivePCs["user"][socketId].close();
      delete receivePCs["user"][socketId];
    }

    removeUserVideo(socketId, userName);
  } catch (e) {
    console.error(e);
  }
}

//================================화면공유관련==============================================

//화면 공유 가능하다는 허락받음
socket.on("share_ok", (data) => {
  console.log("화면 공유 가능");
  shareStart();
});

//다른 유저가 화면공유를 시작함
socket.on("share_request", (data) => {
  shareRequestHandler(data);
  console.log("공유 request 받음!!", data);
});

//다른 유저가 화면공유 중지함
socket.on("share_disconnect", (data) => {
  let socketId = data.id;
  shareUserName = undefined;

  receivePCs["share"][socketId].close();
  delete receivePCs["share"][socketId];
  removeShareVideo();
});

//화면공유 가능여부 체크
function shareCheck() {
  if (shareUserName !== undefined) return;
  socket.emit("share_check");
}

//내가 화면 공유 시작
function shareStart() {
  navigator.mediaDevices
    .getDisplayMedia({
      audio: true,
      video: true,
    })
    .then(async function (stream) {
      console.log("stream check:", stream.getAudioTracks().length); //1이면 audio(o) 0이면 audio(x)
      var is_audio_true = stream.getAudioTracks().length;
      shareUserName = myName;

      //내 화면공유 볼 비디오 생성
      makeShareVideo();

      //내 화면 stream을 비디오에 넣기
      let selfShareStream = new MediaStream();
      selfShareStream.addTrack(stream.getVideoTracks()[0]);
      document.querySelector("#share_video").srcObject = selfShareStream;

      sendPC["share"] = createSenderPeerConnection(
        stream,
        "share",
        is_audio_true
      );
      let offer = await createSenderOffer(sendPC["share"]);

      await socket.emit("sender_offer", {
        offer,
        purpose: "share",
      });
    })
    .catch((error) => {
      console.log("error display stream", error);
    });
}

//나의 화면 공유 중지
function shareStop() {
  console.log("shareStop", myName, shareUserName);
  if (shareUserName !== myName) {
    return;
  }
  shareUserName = undefined;

  removeShareVideo();

  sendPC["share"].close();
  sendPC["share"] = {};
  socket.emit("share_disconnect");
}

//다른사람의 화면공유 받는 요청 처리
async function shareRequestHandler(data) {
  makeShareVideo();

  let pc = createReceiverPeerConnection(data.socketId, data.userName, "share");
  let offer = await createReceiverOffer(pc);

  shareUserName = data.userName;

  await socket.emit("receiver_offer", {
    offer,
    receiverSocketId: socket.id,
    senderSocketId: data.socketId,
    purpose: "share",
  });
}

//화면 공유용 비디오 생성
function makeShareVideo() {
  //##################수정해서 쓰삼#######################
  let box = document.querySelector(".share-video-box");
  let shareVideo = document.createElement("video");
  shareVideo.autoplay = true;
  shareVideo.playsinline = true; //?
  shareVideo.id = "share_video";
  box.appendChild(shareVideo);
}

//화면공유 비디오 삭제
function removeShareVideo() {
  //##################수정해서 쓰삼#######################
  let shareVideo = document.querySelector("#share_video");
  shareVideo.remove();
}

//화면 공유 stream을 video에 넣음
function shareOntrackHandler(stream, userName, senderSocketId) {
  //##################수정해서 쓰삼#######################
  let video = document.querySelector("#share_video");
  video.srcObject = stream;
}
