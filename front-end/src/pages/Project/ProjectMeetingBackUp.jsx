/*

import React, { useState, useEffect } from 'react'
import 'assets/styles/projectMeeting.css'
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
// import AceEditor from 'react-ace'

// import { Ace, Range } from 'ace-builds'

let ace
let Range

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
const ERASER_SIZE = 20

let drawingXYs
let drawingColor
let drawingSize

let mx, my, isPainting

// ==================================================

let filename // 서버에 저장되는 파일이름

let fileExt

let version // 수정 버전
let content // 코드 내용
let loaded

let cursors
let editor

const initMeeting = () => {
  // socket = io('https://meeting.ssafysignal.site', { secure: true, cors: { origin: '*' } })
  socket = io('https://localhost:443', { secure: true, cors: { origin: '*' } })
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
  roomId = 'project1234'
  myName = sessionStorage.getItem('username')

  if (myName === null) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    myName = '익명' + result
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

function initPainting() {
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

function initEditor() {
  filename = roomId + '.txt'

  if (typeof window !== 'undefined') {
    ace = require('brace')
  }
  Range = ace.acequire('ace/range').Range
  require(`brace/mode/text`)
  require(`brace/theme/idle_fingers`)
  editor = ace.edit('ace-editor')
  editor.getSession().setMode(`ace/mode/text`)
  editor.setTheme(`ace/theme/idle_fingers`)
  editor.setFontSize(40)
  // editor.getSession().setTabSize(4)
  editor.setShowInvisibles(false)
  editor.renderer.setShowPrintMargin(true)

  loaded = false
  cursors = {}
  filename = roomId + '.txt'

  function successCb(data) {
    if (!data.success) {
      console.error('Operation dropped')
    } else {
      version = data.version
    }
  }

  function translatePosition(pos) {
    let p = 0
    for (let i = 0; i < pos.row; i++) p += editor.getSession().getLine(i).length + 1
    p += pos.column
    return p
  }

  editor.getSession().on('change', function (e) {
    console.log(e.data.action)
    let l = 0
    let t = ''
    switch (e.data.action) {
      case 'insertText':
        console.log(e.data.text)
        socket.emit(
          'post',
          { version: version++, position: translatePosition(e.data.range.start), insert: e.data.text },
          successCb
        )
        break

      case 'removeText':
        socket.emit(
          'post',
          { version: version++, position: translatePosition(e.data.range.start), remove: e.data.text.length },
          successCb
        )
        break

      case 'insertLines':
        for (let i = 0; i < e.data.lines.length; i++) t += e.data.lines[i] + '\n'
        socket.emit(
          'post',
          { version: version++, position: translatePosition(e.data.range.start), insert: t },
          successCb
        )
        break

      case 'removeLines':
        for (let i = 0; i < e.data.lines.length; i++) l += e.data.lines[i].length + 1
        socket.emit(
          'post',
          { version: version++, position: translatePosition(e.data.range.start), remove: l },
          successCb
        )
        break
    }
  })

  socket.emit('open', {
    filename,
    roomId,
    userName: myName,
  })
  socket.emit('cursor', editor.selection.getCursor())
  editor.getSession().addMarker(new Range(0, 0, 0, 0), 'ace_highlight', 'fullLine')
  editor.getSession().selection.on('changeCursor', function (e) {
    // console.log('changeCursor', editor.selection.getCursor()) // {row:0, column:0}
    if (!loaded || typeof filename === 'undefined') return
    socket.emit('cursor', editor.selection.getCursor())
  })
}

function ProjectMeeting() {
  if (socket == null) {
    initMeeting()

    // 기존 방의 유저수와 방장이름 얻어옴
    socket.on('room_info', (data) => {
      numOfUsers = data.numOfUsers + 1
      console.log(numOfUsers, '명이 접속해있음')

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

    // ============================================================================================
    socket.on('open', function (data) {
      loaded = false
      version = data.version
      content = data.content
      console.log('기존 내용 받아와서 세팅함')
      editor.getSession().setValue(content, 2)

      const ext = fileExt
      if (typeof ext !== 'undefined' && typeof ext !== 'undefined') {
        editor.getSession().setMode('ace/mode/' + ext)
      } else {
        editor.getSession().setMode('ace/mode/text')
      }
      console.log('Editor started for file ' + filename + ' with document version ' + version)
      loaded = true
    })

    // 다른 유저의 커서가 변경시
    socket.on('cursor', function (data) {
      // console.log("cursor on", data.user)
      if (typeof cursors[data.user] !== 'undefined') {
        editor.getSession().removeMarker(cursors[data.user])
      }

      cursors[data.user] = editor
        .getSession()
        .addMarker(
          new Range(data.cursor.row, data.cursor.column, data.cursor.row, data.cursor.column + 1),
          'ace_cursor',
          data.user
        )
    })

    // 상대가 나가면 커서지움
    socket.on('cursorremove', function (user) {
      if (typeof cursors[user] === 'undefined') return
      editor.getSession().removeMarker(cursors[user])
      delete cursors[user]
    })

    // 이 코드는 안씀
    socket.on('disconnect', function () {
      for (const otheruser in cursors) {
        // if (!cursors.hasOwnProperty(otheruser)) continue
        editor.getSession().removeMarker(cursors[otheruser])
        delete cursors[otheruser]
      }
    })

    // 다른 유저가 코드편집
    socket.on('operation', function (operation) {
      applyOperation(operation)
    })

    // 코드에 문제생기면 롤백
    socket.on('rollback', function (data) {
      console.log('페이지 롤백함!')
      loaded = false
      version = data.version
      content = data.content
      editor.getSession().setValue(content, 1) // 코드 롤백
      editor.moveCursorTo(data.cursor.row, data.cursor.column) // 커서 롤백
      loaded = true
      console.log('커서', data.cursor.row, data.cursor.column, '로 롤백함')
    })
  }

  // =============================================================================================

  function meetingStart() {
    console.log('meetingStart 실행')
    setPersonList((personList) => [...personList, myName])
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
        console.error(error)
        if (!alert('카메라(또는 마이크)가 없거나 권한이 없습니다')) {
          // window.location = '..'
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
      delete streams2[userName]
      return streams2
    })
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

      console.log('나간사람 이름:', userName)
    } catch (e) {
      console.error(e)
    }
  }
  // ============================================================================

  function shareCheck() {
    console.log('shareCheck실행됨!!')
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
    // ##################수정해서 쓰삼#######################
    const shareVideo = document.querySelector('.project-meeting-video-share > video')
    console.log('shareVideo:', shareVideo)
    shareVideo.srcObject = stream
  }

  // ===================== 페인트 보드 ========================================================
  function stopPainting() {
    if (!isPainting) return
    console.log('그리기 종료')
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
    console.log('그리기 시작')
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
    MODE = DRAWING
    setColor(selectedColor)
    drawingColor = selectedColor
    ctx.strokeStyle = selectedColor
  }
  // ======================================== 에디터 ===========================================================

  function translatePositionBack(pos) {
    const p = { row: 0, column: 0 }
    for (let i = 0; editor.getSession().getLine(i).length < pos; i++) {
      p.row++
      pos -= editor.getSession().getLine(i).length + 1
    }
    p.column = pos
    return p
  }

  // 다른사람의 편집
  function applyOperation(operation) {
    loaded = false
    console.log('operation:', operation)
    if (typeof operation.insert !== 'undefined') {
      editor.getSession().insert(translatePositionBack(operation.position), operation.insert)
    } else if (typeof operation.remove !== 'undefined') {
      const start = translatePositionBack(operation.position)
      const end = translatePositionBack(operation.position + operation.remove)
      editor.getSession().remove(new Range(start.row, start.column, end.row, end.column))
    }
    version = operation.version + 1
    loaded = true
  }

  // =============================================================================================
  function setUserVideo() {
    const videos = document.querySelectorAll('.project-meeting-video')
    // console.log('personList:', personList, 'streams:', streams)
    for (let i = 0; i < personList.length; i++) {
      const video = videos[i]
      if (personList[i] === myName) {
        if (selfStream !== undefined && selfStream !== null) video.srcObject = selfStream
      } else {
        if (streams[personList[i]] !== undefined && streams[personList[i]] !== null)
          video.srcObject = streams[personList[i]]
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

  const [mode, setMode] = useState(0)

  const handleToVoice = () => {
    myStream.getAudioTracks().forEach((track) => (track.enabled = !voice))
    setVoice((voice) => !voice)
  }

  const handleToVideo = () => {
    myStream.getVideoTracks().forEach((track) => (track.enabled = !video))
    setVideo((video) => !video)
  }

  useEffect(() => {
    setUserVideo()
  }, [streams])

  useEffect(() => {
    initPainting()
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('contextmenu', handleCM)
    // canvas.addEventListener('click', handleCanvasClick)

    initEditor()
  }, [])

  useEffect(() => {
    MODE = DRAWING
    drawingColor = color
    ctx.strokeStyle = color
  }, [color])
  // const Ace = require('react-ace').default
  // require('brace/mode/javascript')

  return (
    <div className="project-meeting-container">
      <div className="project-meeting-main">
        <VideoListSection className="project-meeting-video-list" mode={mode}>
          {personList.map((item, index) => (
            <VideoBox key={index} className="project-meeting-person" size={personList.length}>
              <video
                className="project-meeting-video"
                alt="나"
                style={{ width: '100%', height: '100%' }}
                autoPlay
                playsInline
              />
              <div className="project-meeting-person-name">{item}</div>
            </VideoBox>
          ))}
        </VideoListSection>

        <CodeEditSection className="project-meeting-video-code-edit" mode={mode}>
          <div id="ace-editor" style={{ width: '1400px', height: '1400px' }}>
            {}
            </div>
            </CodeEditSection>
    
            <ShareSection className="project-meeting-video-share-section" mode={mode}>
              <div className="project-meeting-video-share-palette">
                <div className="project-meeting-video-share-palette2">
                  <div style={{ margin: '30px auto' }}>
                    <SelectedColor color={color} onClick={() => setPaletteOpen(!paletteOpen)}></SelectedColor>
                  </div>
                  <div style={{ textAlign: 'center', margin: '30px' }}>
                    <img src={Eraser} onClick={() => erase()} alt="" className="project-meeting-video-share-eraser" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SignalBtn onClick={() => clear()}>모두지우기</SignalBtn>
                  </div>
                  <SignalBtn onClick={() => shareCheck()}>화면공유시작</SignalBtn>
                  <SignalBtn onClick={() => shareStop()}>화면공유중지</SignalBtn>
                </div>
              </div>
              {paletteOpen ? (
                <div className="project-meeting-video-share-color-palette">
                  <Color onClick={() => changeColor('black')} color={'black'}></Color>
                  <Color onClick={() => changeColor('white')} color={'white'}></Color>
                  <Color onClick={() => changeColor('red')} color={'red'}></Color>
                  <Color onClick={() => changeColor('blue')} color={'blue'}></Color>
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
    
            {chatOpen ? <Chatting key={100000}></Chatting> : ''}
          </div>
    
          <div className="project-meeting-footer">
            <div className="project-meeting-time">
              <MeetingPresentTime key={10000} personNum={personList.length}></MeetingPresentTime>
            </div>
            <div className="project-meeting-btn">
              <div className="project-meeting-btn-meeting-container" onClick={() => setMode(0)}>
                <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
                <div className="project-meeting-btn-meeting">회의실</div>
              </div>
              <div className="project-meeting-btn-code-edit-container" onClick={() => setMode(1)}>
                <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
                <div className="project-meeting-btn-code-edit">코드 편집</div>
                {}
              </div>
              <div className="project-meeting-btn-share-container" onClick={() => setMode(2)}>
                <img src={Share} alt="" className="project-meeting-btn-share-icon" />
                <div className="project-meeting-btn-share">화면 공유</div>
                {}
              </div>
              <div className="project-meeting-btn-close-container" onClick={() => alert('close')}>
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
      if (props.size === 1) {
        return css`
          margin: 15px 15px;
          border: 1px solid black;
          width: 1200px;
          height: 650px;
          border-radius: 25px;
        `
      } else if (props.size === 2) {
        return css`
          margin: auto;
          border: 1px solid black;
          width: 700px;
          height: 650px;
          border-radius: 25px;
        `
      } else if (props.size === 3) {
        return css`
          margin: 100px 50px 50px 50px;
          border: 1px solid black;
          width: 550px;
          height: 500px;
          border-radius: 25px;
        `
      } else {
        return css`
          margin: 15px 15px;
          border: 1px solid black;
          width: 500px;
          height: 330px;
          border-radius: 25px;
        `
      }
    }
    
    const VideoBox = styled.div`
      ${videobox};
    `
    
    const colorBox = (props) => {
      const color = props.color
      return css`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: ${color === 'white' ? '1px solid black' : ''};
        margin: 15px 0px;
        background-color: ${color === 'black'
          ? '#000'
          : color === 'white'
          ? '#fff'
          : color === 'red'
          ? '#FF3333'
          : '#0075FF'};
        :hover {
          cursor: pointer;
        }
      `
    }
    const Color = styled.div`
      ${colorBox}
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
    
*/
