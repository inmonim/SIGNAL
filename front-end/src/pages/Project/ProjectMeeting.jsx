import React, { useState, useEffect, useRef } from 'react'
import CodeEditIcon from 'assets/image/code-edit.png'
import MeetingDoor from 'assets/image/meeting-door.png'
import Share from 'assets/image/share.png'
import Eraser from 'assets/image/eraser.png'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import MeetingPresentTime from 'components/Meeting/MeetingPresentTime'
import Chatting from 'components/Meeting/Chatting'
import SignalBtn from 'components/common/SignalBtn'
import { videoList, codeEidt, share } from 'assets/styles/projectMeeting'
import io from 'socket.io-client'
import 'assets/styles/projectMeeting.css'
import Codemirror from 'codemirror'
import Select from 'react-select'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/python/python'
import { SketchPicker } from 'react-color'

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
// ======================================
let canvas
let ctx

const INITIAL_COLOR = '#2c2c2c'
let CANVAS_H
let CANVAS_W

const DRAWING = 0
const ERASE = 1
let MODE
const ERASER_SIZE = 30

let drawingXYs
let drawingColor
let drawingSize

let mx, my, isPainting

// ==================================
let codemirror, version

const modeOptions = [
  { value: 'text/html', label: 'HTML' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'text/x-java', label: 'JAVA' },
  { value: 'text/x-c++src', label: 'C++' },
  { value: 'python', label: 'Python' },
]

const themeOptions = [
  { value: 'monokai', label: '다크 모드' },
  { value: 'default', label: '라이트 모드' },
]

const projectMeetingSetting = () => {
  // socket = io('https://sfsad', { secure: true, cors: { origin: '*' } })
  socket = io('https://meeting.ssafysignal.site', { secure: true, cors: { origin: '*' } })
  // socket = io('https://localhost:443', { secure: true, cors: { origin: '*' } })
  console.log('프로젝트 미팅 소켓 통신 시작!')

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

  const nickname = params.get('nickname')
  const projectSeq = params.get('projectSeq')
  roomId = 'project' + projectSeq
  myName = sessionStorage.getItem('nickname')
  console.log(roomId, myName)
  if (myName !== nickname) {
    if (!alert('권한이 없습니다. 다시 로그인하세요')) {
      window.close()
    }
  }
  // myName = Math.random() + ''
  // roomId = 'a123'

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

function startPaint() {
  canvas = document.querySelector('.canvas')
  ctx = canvas.getContext('2d')
  ctx.globalAlpha = 1

  const shareBox = document.querySelector('.project-meeting-video-share')
  CANVAS_H = Number(window.getComputedStyle(shareBox).height.replace(/[^0-9]/g, ''))
  CANVAS_W = Number(window.getComputedStyle(shareBox).width.replace(/[^0-9]/g, ''))
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H

  MODE = DRAWING

  drawingXYs = []
  drawingColor = INITIAL_COLOR
  drawingSize = 2.5

  ctx.strokeStyle = INITIAL_COLOR
  ctx.lineWidth = drawingSize

  isPainting = false
}

function ProjectMeeting() {
  if (socket == null) {
    projectMeetingSetting()

    // 기존 방의 유저수와 방장이름 얻어옴
    socket.on('room_info', (data) => {
      numOfUsers = data.numOfUsers + 1
      console.log(numOfUsers, '명이 접속해있음')

      if (data.isDup === true) {
        if (!alert('중복접속입니다.!!')) {
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

      // 이미 해당 방이 화면 공유 중이면 화면 공유 받음
      getShare()
    })

    // 클라이언트 입장에서 보내는 역할의 peerConnection 객체에서 수신한 answer 메시지(sender_offer의 응답받음)
    socket.on('get_sender_answer', (data) => {
      try {
        // console.log('get_sender_answer 받음')
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

    // 화면 공유 가능하다는 허락받음
    socket.on('share_ok', (data) => {
      console.log('화면 공유 가능')
      shareStart()
    })

    // 다른 유저가 화면공유를 시작함
    socket.on('share_request', (data) => {
      shareRequestHandler(data)
      console.log('공유 request 받음!!', data)
    })

    // 다른 유저가 화면공유 중지함
    socket.on('share_disconnect', (data) => {
      const socketId = data.id
      setShareUserName('')

      receivePCs.share[socketId].close()
      delete receivePCs.share[socketId]
      removeShareVideo()
    })

    // 페인트보드 =========================================================================================
    // 다른 사람이 그리거나 지움
    socket.on('drawing', function (data) {
      const xys = data.xys

      if (data.mode === DRAWING) {
        // 그리기
        const size = data.size
        const drawingColor = data.color
        ctx.beginPath()
        for (let i = 1; i < xys.length; i++) {
          const [px, py] = xys[i - 1]
          const [cx, cy] = xys[i]
          ctx.moveTo(px, py)
          ctx.lineTo(cx, cy) // (px,py) ->(cx,cy)로 긋기
          ctx.strokeStyle = drawingColor
          ctx.lineWidth = size
          ctx.stroke()
          ctx.beginPath()
        }
      } else {
        // 지우개
        for (let i = 0; i < xys.length; i++) {
          const [cx, cy] = xys[i]
          ctx.clearRect(cx - ERASER_SIZE / 2, cy - ERASER_SIZE / 2, ERASER_SIZE, ERASER_SIZE)
        }
      }
    })

    // 다른사람이 전체를 지움
    socket.on('clear', function () {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    })

    // 메시지받음
    socket.on('get_message', (data) => {
      getMessage(data)
    })

    // 코드에디터 내용받아오기
    socket.on('get_editor', (data) => {
      // console.log('editor정보 받아옴')
      version = data.version
      codemirror.setValue(data.content)
    })

    // 다른유저의 코드에디터 수정 반영하기
    socket.on('change_editor', (data) => {
      version = data.version
      const changes = data.changes
      codemirror.replaceRange(changes.text, changes.from, changes.to)
    })

    // 나의 수정이 다른유저와 수정이 겹쳤을때 롤백
    socket.on('rollback_editor', (data) => {
      version = data.version
      const content = data.content
      // console.log('rollback_editor', content)
      // console.log('cursor', codemirror.getCursor())
      const cursor = codemirror.getCursor()
      codemirror.setValue(content)
      codemirror.setCursor({ line: cursor.line, ch: cursor.ch })
    })
  }

  // =============================================================================================

  function meetingStart() {
    console.log('meetingStart 실행')

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 320, height: 240 },
      })
      .then(async (stream) => {
        myStream = stream

        setStreams((streams) => {
          const streams2 = { ...streams }
          streams2[myName] = stream
          return streams2
        })

        myStream.getVideoTracks().forEach((track) => (track.enabled = false)) // 초기에 mute
        myStream.getAudioTracks().forEach((track) => (track.enabled = false))

        // 내 영상 비디오에 띄우기
        selfStream = new MediaStream()
        selfStream.addTrack(stream.getVideoTracks()[0])
        // myVideo.srcObject = selfStream

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
        // console.error(error)
        setStreams((streams) => {
          const streams2 = { ...streams }
          streams2[myName] = null
          return streams2
        })
        socket.emit('join_room', {
          roomId,
          userName: myName,
        })
        socket.emit('noCam_enter', {
          roomId,
          userName: myName,
        })
        if (error.name === 'NotFoundError') {
          // alert('카메라 또는 마이크가 인식되지 않습니다.')
          // window.close()
        } else if (error.name === 'NotAllowedError') {
          // alert(
          //   '카메라 및 마이크 접근 권한이 없습니다. \n더보기 구성 > 설정 > 개인정보 및 보안 > 사이트 설정에서 접근 권한을 부여해주세요'
          // )
        } else {
          console.log(error.name)
        }
        setMode(1)
        /* if (!alert('카메라(또는 마이크)가 없거나 권한이 없습니다')) {
          // window.location = '..'
          // window.close()
        } */
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
        } else if (purpose === 'share') {
          shareOntrackHandler(e.streams[0], userName, senderSocketId)
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
        const isNoCam = data.users[i].isNoCam

        userNames[socketId] = userName
        socketIds[userName] = socketId

        if (!isNoCam) {
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
        } else {
          // 노캠유저

          userOntrackHandler(null, userName, socketId)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 누군가 들어왔을 때
  async function enterUserHandler(data) {
    userNames[data.socketId] = data.userName
    socketIds[data.userName] = data.socketId
    numOfUsers++

    // 일반유저 입장
    if (!data.isNoCam) {
      try {
        const pc = createReceiverPeerConnection(data.socketId, data.userName, 'user')
        const offer = await createReceiverOffer(pc)

        await socket.emit('receiver_offer', {
          offer,
          receiverSocketId: socket.id,
          senderSocketId: data.socketId,
          purpose: 'user',
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      // 노캠유저 입장
      userOntrackHandler(null, data.userName, data.socketId)
    }
  }

  // 유저별 stream을 video에 넣어줌(화면에 영상 띄움)
  function userOntrackHandler(stream, userName, senderSocketId) {
    console.log('접속자 이름:', userName)
    setPersonList((personList) => [...personList, userName])

    setStreams((streams) => {
      const streams2 = { ...streams }
      streams2[userName] = stream
      return streams2
    })
  }

  // 나간 유저 video삭제
  function removeUserVideo(socketId, userName) {
    setPersonList((personList) => {
      const personList2 = [...personList]
      for (let i = personList.length - 1; i >= 0; i--) {
        if (personList2[i] === userName) {
          personList2.splice(i, 1)
          break
        }
      }
      return personList2
    })

    setStreams((streams) => {
      const streams2 = { ...streams }
      try {
        delete streams2[userName]
      } catch (e) {}
      return streams2
    })
  }

  // 나간 유저의 정보 지우고 video 지우기
  function exitUserHandler(data) {
    const socketId = data.socketId
    const userName = data.userName

    numOfUsers--
    try {
      try {
        delete userNames[socketId]
      } catch (e) {}
      try {
        delete socketIds[userName]
      } catch (e) {}

      if (!receivePCs.user[socketId]) {
        try {
          receivePCs.user[socketId].close()
        } catch (e) {}
        try {
          delete receivePCs.user[socketId]
        } catch (e) {}
      }

      removeUserVideo(socketId, userName)

      console.log('나간사람 이름:', userName)
    } catch (e) {
      console.error(e)
    }
  }
  // ============================================================================

  function shareCheck() {
    // console.log('shareCheck실행됨!!')
    if (shareUserName !== '') return
    socket.emit('share_check')
  }

  // 내가 화면 공유 시작
  function shareStart() {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: true,
      })
      .then(async function (stream) {
        console.log('stream check:', stream.getAudioTracks().length) // 1이면 audio(o) 0이면 audio(x)
        const isAudioTrue = stream.getAudioTracks().length

        setShareUserName(myName)

        // 내 화면 stream을 비디오에 넣기
        const selfShareStream = new MediaStream()
        selfShareStream.addTrack(stream.getVideoTracks()[0])
        const shareVideo = document.querySelector('.project-meeting-video-share > video')
        shareVideo.srcObject = selfShareStream

        sendPC.share = createSenderPeerConnection(stream, 'share', isAudioTrue)
        const offer = await createSenderOffer(sendPC.share)

        await socket.emit('sender_offer', {
          offer,
          purpose: 'share',
        })
      })
      .catch((error) => {
        console.log('error display stream', error)
      })
  }

  // 나의 화면 공유 중지
  function shareStop() {
    console.log('shareStop', myName, shareUserName)
    if (shareUserName !== myName) {
      return
    }
    setShareUserName('')

    sendPC.share.close()
    sendPC.share = {}
    socket.emit('share_disconnect')
    removeShareVideo()
  }

  // 다른사람의 화면공유 받는 요청 처리
  async function shareRequestHandler(data) {
    const pc = createReceiverPeerConnection(data.socketId, data.userName, 'share')
    const offer = await createReceiverOffer(pc)

    setShareUserName(data.userName)

    await socket.emit('receiver_offer', {
      offer,
      receiverSocketId: socket.id,
      senderSocketId: data.socketId,
      purpose: 'share',
    })
  }

  // 막 들어왔을때 현재 화면공유중이면 화면공유받음
  function getShare() {
    socket.emit('get_share')
  }

  // 화면 공유 video제거
  function removeShareVideo() {
    const shareVideo = document.querySelector('.project-meeting-video-share > video')
    shareVideo.srcObject = null
  }

  // 화면 공유 stream을 video에 넣음
  function shareOntrackHandler(stream, userName, senderSocketId) {
    const shareVideo = document.querySelector('.project-meeting-video-share > video')
    // console.log('shareVideo:', shareVideo)
    shareVideo.srcObject = stream
  }

  // 페인트보드===================================================================================
  function stopPainting() {
    if (!isPainting) return
    // console.log('그리기 종료')
    socket.emit('drawing', {
      size: drawingSize,
      color: drawingColor,
      mode: MODE,
      xys: drawingXYs,
    })

    isPainting = false
  }

  function startPainting() {
    isPainting = true
    drawingXYs = [[mx, my]]
    // console.log("색상:", drawingColor);
    // console.log('그리기 시작')
  }

  function onMouseMove(event) {
    const x = event.offsetX
    const y = event.offsetY
    if (MODE === DRAWING) {
      if (!isPainting) {
        // ctx.beginPath();
        // ctx.moveTo(x, y);
        ;[mx, my] = [x, y]
      } else {
        ctx.beginPath()
        ctx.moveTo(mx, my)
        ctx.lineTo(x, y)
        ctx.strokeStyle = drawingColor
        ctx.lineWidth = drawingSize
        ctx.stroke()
        drawingXYs.push([x, y])
        ;[mx, my] = [x, y]
      }
    } else if (MODE === ERASE) {
      if (isPainting) {
        drawingXYs.push([x, y])
        ctx.clearRect(x - ERASER_SIZE / 2, y - ERASER_SIZE / 2, ERASER_SIZE, ERASER_SIZE)
      }
    }
  }
  function handleCM(event) {
    event.preventDefault()
  }

  function clear() {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
    socket.emit('clear')
  }

  function erase() {
    MODE = ERASE
  }

  function changeColor(selectedColor) {
    console.log(selectedColor)
    MODE = DRAWING
    setColor(selectedColor)
    drawingColor = selectedColor
    ctx.strokeStyle = selectedColor
  }
  function sendMessage(message) {
    socket.emit('send_message', { userName: myName, message })
  }

  function getMessage(data) {
    chatting.current.getMessage(data)
  }

  // =============================================================================================
  function setUserVideo() {
    const videos = document.querySelectorAll('.project-meeting-video')
    // console.log('personList:', personList, 'streams:', streams)
    for (let i = 0; i < personList.length; i++) {
      const video = videos[i]
      if (personList[i] === myName) {
        if (selfStream !== undefined && selfStream !== null) {
          video.srcObject = selfStream
        } else {
          video.srcObject = null
        }
      } else {
        if (streams[personList[i]] !== undefined && streams[personList[i]] !== null) {
          video.srcObject = streams[personList[i]]
        } else {
          video.srcObject = null
        }
        // console.log(personList[i], ':', video.srcObject)
      }
    }
  }

  const [voice, setVoice] = useState(false)
  const [video, setVideo] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [color, setColor] = useState('black')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [personList, setPersonList] = useState([])
  const [streams, setStreams] = useState({})
  const [shareUserName, setShareUserName] = useState('')
  const chatting = useRef()

  const [mode, setMode] = useState(0)

  const [selectedMode, setSelectedMode] = React.useState(modeOptions[0])
  const handleMode = (selectedOption) => {
    setSelectedMode(selectedOption)
  }
  const [selectedTheme, setSelectedTheme] = React.useState(themeOptions[0])
  const handleTheme = (selectedOption) => {
    setSelectedTheme(selectedOption)
  }

  const handleToVoice = () => {
    try {
      myStream.getAudioTracks().forEach((track) => (track.enabled = !voice))
    } catch (e) {}

    setVoice((voice) => !voice)
  }

  const handleToVideo = () => {
    try {
      myStream.getVideoTracks().forEach((track) => (track.enabled = !video))
    } catch (e) {}
    setVideo((video) => !video)
  }

  useEffect(() => {
    // console.log('비디오 생성! streams :', streams)

    setUserVideo()
  }, [streams])

  useEffect(() => {
    // console.log('streams :', streams)

    setUserVideo()
  }, [mode])

  useEffect(() => {
    setPersonList((personList) => [...personList, myName])
    startPaint()
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('contextmenu', handleCM)
    // canvas.addEventListener('click', handleCanvasClick)

    codemirror = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
      mode: { name: 'javascript', json: true },
      theme: 'monokai',
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    })

    codemirror.on('change', (instance, changes) => {
      const { origin } = changes
      const content = instance.getValue()
      // console.log('변화 상태:', origin)
      // console.log('change:  ', changes)

      // input이면 입력, setValue는 받음, delete삭제, 한글은 *compose
      if (origin !== undefined && origin !== 'setValue') {
        socket.emit('change_editor', {
          roomId,
          changes,
          content,
          version: version++,
        })
      }
    })
    socket.emit('get_editor', { roomId })
  }, [])

  useEffect(() => {
    MODE = DRAWING
    drawingColor = color
    ctx.strokeStyle = color
  }, [color])

  useEffect(() => {
    codemirror.setOption('mode', selectedMode.value)
  }, [selectedMode])

  useEffect(() => {
    codemirror.setOption('theme', selectedTheme.value)
    // console.log(selectedTheme.value)
  }, [selectedTheme])

  return (
    <div className="project-meeting-container">
      <div className="project-meeting-main">
        <VideoListSection className="project-meeting-video-list" mode={mode}>
          {personList.map((item, index) => (
            <VideoBox key={index} size={personList.length}>
              <video className="project-meeting-video" alt="나" autoPlay playsInline />
              <div className="project-meeting-person-name">
                <div>{item}</div>
              </div>
            </VideoBox>
          ))}
        </VideoListSection>

        <CodeEditSection mode={mode}>
          <div className="project-meeting-code-edit-select-box">
            <Select
              options={modeOptions}
              onChange={handleMode}
              value={selectedMode}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: '300px',
                  margin: '0px 5px',
                }),
              }}
            />
            <Select
              options={themeOptions}
              onChange={handleTheme}
              value={selectedTheme}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: '300px',
                }),
              }}
            />
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <textarea id="realtimeEditor"></textarea>
          </div>
        </CodeEditSection>

        <ShareSection mode={mode}>
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <SignalBtn onClick={() => shareCheck()}>화면공유시작</SignalBtn>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <SignalBtn onClick={() => shareStop()}>화면공유중지</SignalBtn>
              </div>
            </div>
            <div className="project-meeting-video-share-palette">
              <div className="project-meeting-video-share-palette2">
                <div style={{ margin: '30px auto' }}>
                  <SelectedColor color={color} onClick={() => setPaletteOpen(!paletteOpen)}></SelectedColor>
                </div>
                <div style={{ textAlign: 'center', margin: '30px' }}>
                  <img src={Eraser} onClick={() => erase()} alt="" className="project-meeting-video-share-eraser" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                  <SignalBtn onClick={() => clear()}>모두지우기</SignalBtn>
                </div>
              </div>
            </div>
          </div>

          {paletteOpen ? (
            <div style={{ margin: '10px' }}>
              <SketchPicker color={color} onChangeComplete={(color) => changeColor(color.hex)} />
            </div>
          ) : (
            ''
          )}
          <div className="project-meeting-video-share">
            <video style={{ width: '100%', height: '100%', borderRadius: '25px' }} autoPlay playsInline>
              비디오
            </video>
          </div>
          <div className="project-meeting-video-share-paint" style={{ border: '0.5px solid' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '25px',
              }}
            >
              <canvas className="canvas"></canvas>
            </div>
          </div>
        </ShareSection>

        <ChatSection chatOpen={chatOpen}>
          <Chatting key={100000} sendMessage={sendMessage} ref={chatting}></Chatting>
        </ChatSection>
      </div>

      <div className="project-meeting-footer">
        <div className="project-meeting-time">
          <MeetingPresentTime key={10000} personNum={personList}></MeetingPresentTime>
        </div>
        <div className="project-meeting-btn">
          <div className="project-meeting-btn-meeting-container" onClick={() => setMode(0)}>
            <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
            <div className="project-meeting-btn-meeting">회의실</div>
          </div>
          <div className="project-meeting-btn-code-edit-container" onClick={() => setMode(1)}>
            <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
            <div className="project-meeting-btn-code-edit">코드 편집</div>
            {/* 고정 아니여도 됨 */}
          </div>
          <div className="project-meeting-btn-share-container" onClick={() => setMode(2)}>
            <img src={Share} alt="" className="project-meeting-btn-share-icon" />
            <div className="project-meeting-btn-share">화면 공유</div>
            {/* 고정이여야함  absolute */}
          </div>
          <div className="project-meeting-btn-close-container" onClick={() => window.close()}>
            <img src={MeetingDoor} alt="" className="project-meeting-btn-close-icon" />
            <div className="project-meeting-btn-close">종료</div>
          </div>
        </div>

        <div className="project-meeting-footer-right">
          {voice === false ? (
            <div className="project-meeting-footer-right-novoice" onClick={handleToVoice}></div>
          ) : (
            <div className="project-meeting-footer-right-voice" onClick={handleToVoice}></div>
          )}
          {video === false ? (
            <div className="project-meeting-footer-right-novideo" onClick={handleToVideo}></div>
          ) : (
            <div className="project-meeting-footer-right-video" onClick={handleToVideo}></div>
          )}
          <div className="project-meeting-footer-right-chat" onClick={() => setChatOpen(!chatOpen)}></div>
        </div>
      </div>
    </div>
  )
}
export default ProjectMeeting

const videobox = (props) => {
  return css`
    margin: 10px;
    border: 1px solid black;
    width: 455px;
    height: 320px;
    border-radius: 25px;
    position: relative;
    overflow: hidden;
  `
}

const VideoBox = styled.div`
  ${videobox};
`

const selectedColor = (props) => {
  const color = props.color
  return css`
    border-radius: 20px;
    background-color: ${color};
    width: 80px;
    height: 80px;
    margin: auto;
    cursor: pointer;
  `
}

const SelectedColor = styled.div`
  ${selectedColor}
`

const VideoListSection = styled.div`
  ${videoList}
`
const CodeEditSection = styled.div`
  ${codeEidt}
`

const ShareSection = styled.div`
  ${share}
`
const chat = (props) => {
  return css`
    display: ${props.chatOpen ? 'block' : 'none'};
  `
}
const ChatSection = styled.div`
  ${chat}
`
