import React, { useState, useEffect, useLayoutEffect } from 'react'
import 'assets/styles/beforemeeting.css'
import MeetingMemoModal from 'components/Memo/MeetingMemoModal'
// import MeetingQna from 'components/Meeting/MeetingQna'
import io from 'socket.io-client'
import noProfileImg from 'assets/image/noProfileImg.png'
import MeetingPresentTime from 'components/Meeting/MeetingPresentTime'
import MeetingQna from 'components/Meeting/MeetingQna'

// ============================================
let myStream

let myName
let roomId
let userNames // userNames[socketId]="이름"
let socketIds // socketIds["이름"]=socketId

let pcConfig

let sendPC
let receivePCs

let selfStream

let numOfUsers
let socket
let isOwner

let postingSeq

const prevMeetingSetting = () => {
  socket = io('https://meeting.ssafysignal.site', { secure: true, cors: { origin: '*' } })
  // socket = io('https://localhost:443', { secure: true, cors: { origin: '*' } })
  console.log('사전 미팅 소켓 통신 시작!')

  // console.log(params.get('userSeq'))

  pcConfig = {
    iceServers: [
      {
        urls: 'stun:edu.uxis.co.kr',
      },
      {
        urls: 'turn:edu.uxis.co.kr?transport=tcp',
        username: 'webrtc',
        credential: 'webrtc100!',
      },
    ],
  }

  const params = new URLSearchParams(location.search)
  roomId = 'prev' + params.get('applySeq')
  myName = sessionStorage.getItem('nickname')
  isOwner = params.get('owner')
  console.log(isOwner, params.get('applySeq'))

  // 공고 질문 얻기 위한 postingSeq 파람 추가
  postingSeq = params.get('postingSeq')

  if (myName !== params.get('nickname')) {
    if (!alert('권한이 없습니다. 다시 로그인하세요')) {
      window.close()
    }
  }

  userNames = {} // userNames[socketId]="이름"
  socketIds = {} // socketIds["이름"]=socketId

  sendPC = {
    // sendPC[purpose]=pc
    user: {}, // 유저 얼굴
    share: {}, // 화면공유
  }
  receivePCs = {
    // receivePCs[purpose][socketId]=pc
    user: {},
    share: {},
  }

  numOfUsers = 0

  socket.emit('room_info', {
    roomId,
    userName: myName,
  })
}

function Beforemeeting() {
  if (socket == null) {
    prevMeetingSetting()

    // 기존 방의 유저수와 방장이름 얻어옴
    socket.on('room_info', (data) => {
      numOfUsers = data.numOfUsers + 1
      console.log(numOfUsers, '명이 이미 접속해있음')

      if (data.isDup === true) {
        if (!alert('중복접속입니다.!!')) {
          window.close()
        }
        return
      }

      if (numOfUsers > 2) {
        if (!alert('정원 초과입니다.')) {
          // window.location = '..'
          window.close()
        }
        return
      }
      meetingStart()
    })

    // user가 들어오면 이미 들어와있던 user에게 수신되는 이벤트
    socket.on('user_enter', async (data) => {
      enterUserHandler(data)
    })

    // 처음 방에 접속했을 때, 이미 방안에 들어와있던 user들의 정보를 받음
    socket.on('all_users', (data) => {
      console.log('all_users : ', data.users)
      allUsersHandler(data) // 미리 접속한 유저들의 영상을 받기위한 pc, offer 생성
    })

    // 클라이언트 입장에서 보내는 역할의 peerConnection 객체에서 수신한 answer 메시지(sender_offer의 응답받음)
    socket.on('get_sender_answer', (data) => {
      try {
        console.log('get_sender_answer 받음')
        sendPC[data.purpose].setRemoteDescription(new RTCSessionDescription(data.answer))
      } catch (error) {
        console.error(error)
      }
    })

    // 클라이언트 입장에서 받는 역할의 peerConnection 객체에서 수신한 answer 메시지(receiver_offer의 응답받음)
    socket.on('get_receiver_answer', (data) => {
      try {
        const pc = receivePCs[data.purpose][data.id]
        if (pc.signalingState === 'stable') return // ?
        pc.setRemoteDescription(new RTCSessionDescription(data.answer))
      } catch (error) {
        console.error(error)
      }
    })

    // 보내는 역할의 peerConnection 객체에서 수신한 candidate 메시지
    socket.on('get_sender_candidate', (data) => {
      try {
        const pc = sendPC[data.purpose]
        if (!data.candidate) return
        if (!pc) return
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      } catch (error) {
        console.error(error)
      }
    })

    // 받는 역할의 peerConnection 객체에서 수신한 candidate 메시지
    socket.on('get_receiver_candidate', (data) => {
      try {
        const pc = receivePCs[data.purpose][data.id]
        if (!data.candidate) return
        if (!pc) return
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      } catch (error) {
        console.log(error)
      }
    })

    // 같은 방에 있던 user가 나가면 그 방 안에있던 모든 user들에게 전송되는 이벤트
    socket.on('user_exit', (data) => {
      exitUserHandler(data)
    })
  }

  // const now = ''
  // const today = ''
  console.log('랜더링')

  // const [now, setNow] = useState('00:00:00')
  // const dateNow = new Date()
  // const year = dateNow.getFullYear()
  // const month = ('0' + (dateNow.getMonth() + 1)).slice(-2)
  // const day = ('0' + dateNow.getDate()).slice(-2)
  // const today = year + '-' + month + '-' + day
  // setNow('----')
  // const currentTimer = () => {
  //   const date = new Date()
  //   const hours = String(date.getHours()).padStart(2, '0')
  //   const minutes = String(date.getMinutes()).padStart(2, '0')
  //   const seconds = String(date.getSeconds()).padStart(2, '0')
  //   setNow(`${hours}:${minutes}:${seconds}`)
  // }

  // const startTimer = () => {
  //   setInterval(currentTimer, 1000)
  // }
  // startTimer()

  function meetingStart() {
    console.log('meetingStart 실행')
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 320, height: 240 },
      })
      .then(async (stream) => {
        myStream = stream
        myStream.getVideoTracks().forEach((track) => (track.enabled = false)) // 초기에 mute
        myStream.getAudioTracks().forEach((track) => (track.enabled = false))
        const myVideo = document.querySelector('.before-meeting-right-video')
        myVideo.autoplay = true
        myVideo.playsinline = true

        // 내 영상 비디오에 띄우기
        selfStream = new MediaStream()
        selfStream.addTrack(stream.getVideoTracks()[0])
        myVideo.srcObject = selfStream

        // 내 영상 전송용 pc와 offer생성
        sendPC.user = createSenderPeerConnection(stream, 'user')
        const offer = await createSenderOffer(sendPC.user)

        // 방에 입장 요청
        socket.emit('join_room', {
          roomId,
          userName: myName,
        })

        // sender_offer를 전송
        await socket.emit('sender_offer', {
          offer,
          purpose: 'user',
        })
      })
      .catch((error) => {
        console.error(error)
        if (!alert('카메라(또는 마이크)가 없거나 권한이 없습니다')) {
          // window.location = '..'
          window.close()
        }
      })
  }

  // 스트림 보내는 역할의 peerConnection 객체 생성
  function createSenderPeerConnection(stream, purpose, isAudioTrue = 1) {
    const pc = new RTCPeerConnection(pcConfig)

    pc.oniceconnectionstatechange = (e) => {
      // console.log(e);
    }

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('sender_candidate', {
          candidate: e.candidate,
          purpose,
        })
      }
    }

    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
      const audioTrack = stream.getAudioTracks()[0]
      pc.addTrack(videoTrack, stream)
      // console.log("audio:",is_audio_true)
      if (isAudioTrue !== 0)
        // 나중에 수정하기
        pc.addTrack(audioTrack, stream)
    } else {
      console.log('no localStream')
    }

    return pc
  }

  // 스트림 받는 역할의 peerConnection 객체 생성
  function createReceiverPeerConnection(senderSocketId, userName, purpose) {
    const pc = new RTCPeerConnection(pcConfig)
    receivePCs[purpose][senderSocketId] = pc
    pc.oniceconnectionstatechange = (e) => {
      // console.log(e);
    }

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        // 수신 candidate 보냄
        socket.emit('receiver_candidate', {
          candidate: e.candidate,
          receiverSocketId: socket.id,
          senderSocketId,
          purpose,
          roomId,
        })
      }
    }

    // 스트림 보내는 쪽의 peerConnection에서 addTrack시 이벤트 발생
    let once = 1
    pc.ontrack = (e) => {
      if (once === 1) {
        // stream을 video에 넣어주기
        if (purpose === 'user') {
          userOntrackHandler(e.streams[0], userName, senderSocketId)
        }
        // console.log('한번만 나오는지')
      }
      once += 1
    }

    return pc
  }

  // 보내는 역할의 peerConnection 객체에서 offer 전송 (통신 시작)
  async function createSenderOffer(pc) {
    try {
      const offer = await pc.createOffer({
        // 보내기 위함으로 false임..?
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      })
      await pc.setLocalDescription(new RTCSessionDescription(offer))

      // console.log("send offer:",offer);

      return offer
    } catch (error) {
      console.log(error)
    }
  }

  // 받는 역할의 peerConnection 객체에서 offer 전송 (통신 시작)
  async function createReceiverOffer(pc) {
    try {
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })
      await pc.setLocalDescription(new RTCSessionDescription(offer))

      return offer
    } catch (error) {
      console.error(error)
    }
  }

  // 기존 모든 유저들 영상을 받기위한 pc와 offer생성
  async function allUsersHandler(data) {
    // 자신을 제외한 모든 유저의 receiverPc생성, 비디오 생성(처음 접속했을 때 한번만)
    try {
      const len = data.users.length

      for (let i = 0; i < len; i++) {
        const socketId = data.users[i].socketId
        const userName = data.users[i].userName
        // const stream = data.users[i].stream

        userNames[socketId] = userName
        socketIds[userName] = socketId

        // 기존 유저들 영상을 받을 pc와 offer를 생성
        const pc = createReceiverPeerConnection(socketId, userName, 'user')
        const offer = await createReceiverOffer(pc)

        // 수신 offer 보냄
        await socket.emit('receiver_offer', {
          offer,
          receiverSocketId: socket.id,
          senderSocketId: socketId,
          purpose: 'user',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 누군가 들어왔을 때
  async function enterUserHandler(data) {
    try {
      const pc = createReceiverPeerConnection(data.socketId, data.userName, 'user')
      const offer = await createReceiverOffer(pc)

      userNames[data.socketId] = data.userName
      socketIds[data.userName] = data.socketId
      numOfUsers++

      await socket.emit('receiver_offer', {
        offer,
        receiverSocketId: socket.id,
        senderSocketId: data.socketId,
        purpose: 'user',
      })
    } catch (error) {
      console.error(error)
    }
  }

  // 유저별 stream을 video에 넣어줌(화면에 영상 띄움)
  function userOntrackHandler(stream, userName, senderSocketId) {
    const video = document.querySelector('.before-meeting-left-video')
    video.autoplay = true
    video.playsinline = true
    video.srcObject = stream
    console.log('접속자 이름:', userName)
    setOtherName(userName)
  }

  // 나간 유저 video삭제
  function removeUserVideo(socketId, userName) {
    const video = document.querySelector('.before-meeting-left-video')
    video.srcObject = null
  }

  // 나간 유저의 정보 지우고 video 지우기
  function exitUserHandler(data) {
    const socketId = data.socketId
    const userName = data.userName

    numOfUsers--
    try {
      delete userNames[socketId]
      delete socketIds[userName]

      if (!receivePCs.user[socketId]) {
        receivePCs.user[socketId].close()
        delete receivePCs.user[socketId]
      }

      removeUserVideo(socketId, userName)
      setOtherName('부재중')
      console.log('나간사람 이름:', userName)
    } catch (e) {
      console.error(e)
    }
  }

  // ======================================================================================

  const [memoOpen, setMemoOpen] = useState(false)
  const handleMemoOpen = () => setMemoOpen(true)
  const handleMemoClose = () => setMemoOpen(false)

  const [qnaOpen, setQnaOpen] = useState(false)
  const handleQnaOpen = () => setQnaOpen(true)
  const handleQnaClose = () => setQnaOpen(false)

  const [voice, setVoice] = useState(false)
  const handleToVoice = () => {
    setVoice(true)
    myStream.getAudioTracks().forEach((track) => (track.enabled = true))
  }
  const handleNoVoice = () => {
    setVoice(false)
    myStream.getAudioTracks().forEach((track) => (track.enabled = false))
  }
  const [video, setVideo] = useState(false)
  const handleToVideo = () => {
    setVideo(true)
    myStream.getVideoTracks().forEach((track) => (track.enabled = true))
  }
  const handleNoVideo = () => {
    setVideo(false)
    myStream.getVideoTracks().forEach((track) => (track.enabled = false))
  }

  const [otherName, setOtherName] = useState('부재중')
  useLayoutEffect(() => {
    console.log('한번만')
  }, [])

  useEffect(() => {
    console.log('voice : ' + voice + '// video : ' + video, '//otherName', otherName)
  }, [voice, video])
  return (
    <div className="before-meeting-container">
      <div className="before-meeting-center">
        <div className="before-meeting-main">
          <div className="before-meeting-left-person">
            <video className="before-meeting-left-video" alt="상대방" poster={noProfileImg} />
            <div className="before-meeting-left-person-name">{otherName}</div>
          </div>
          <div className="before-meeting-right-person">
            <video className="before-meeting-right-video" alt="나" />
            <div className="before-meeting-right-person-name">{myName}</div>
          </div>
        </div>
      </div>
      <div className="before-meeting-footer">
        <div className="before-meeting-time">
          <MeetingPresentTime key={10000}></MeetingPresentTime>
        </div>
        <div className="before-meeting-btn">
          {voice === false ? (
            <div className="before-meeting-footer-right-novoice" onClick={handleToVoice}></div>
          ) : (
            <div className="before-meeting-footer-right-voice" onClick={handleNoVoice}></div>
          )}
          {video === false ? (
            <div className="before-meeting-footer-right-novideo" onClick={handleToVideo}></div>
          ) : (
            <div className="before-meeting-footer-right-video" onClick={handleNoVideo}></div>
          )}
        </div>
        <div className="before-meeting-footer-right">
          {isOwner === 'true' ? (
            <>
              <div className="before-meeting-btn-memo-container" onClick={handleMemoOpen}>
                <div className="before-meeting-btn-memo"></div>
                <div className="before-meeting-btn-name">메모</div>
              </div>
              <MeetingMemoModal
                open={memoOpen}
                onClose={handleMemoClose}
                applySeq={parseInt(roomId.replace('prev', ''))}
              ></MeetingMemoModal>
              <div className="before-meeting-btn-memo-container" onClick={handleQnaOpen}>
                <div className="before-meeting-btn-qna"></div>
                <div className="before-meeting-btn-name">사전 질문</div>
              </div>
              <MeetingQna
                open={qnaOpen}
                onClose={handleQnaClose}
                applySeq={parseInt(roomId.replace('prev', ''))}
                postingSeq={postingSeq}
              ></MeetingQna>
            </>
          ) : (
            <></>
          )}

          <div className="before-meeting-btn-memo-container" onClick={window.close}>
            <div className="before-meeting-btn-door"></div>
            <div className="before-meeting-btn-name">종료</div>
          </div>
          {/* <div className="before-meeting-footer-right-chat"></div> */}
        </div>
      </div>
    </div>
  )
}

export default Beforemeeting
