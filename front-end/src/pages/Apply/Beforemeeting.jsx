import React, { useState } from 'react'
import 'assets/styles/beforemeeting.css'
import opponent from 'assets/image/profileimg.jpeg'
import user from 'assets/image/profileimg2.jpeg'
import MeetingMemoModal from 'components/Memo/MeetingMemoModal'

function Beforemeeting() {
  const [now, setNow] = useState('00:00:00')
  const dateNow = new Date()
  const year = dateNow.getFullYear()
  const month = ('0' + (dateNow.getMonth() + 1)).slice(-2)
  const day = ('0' + dateNow.getDate()).slice(-2)
  const today = year + '-' + month + '-' + day
  const currentTimer = () => {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    setNow(`${hours}:${minutes}:${seconds}`)
  }

  const startTimer = () => {
    setInterval(currentTimer, 1000)
  }
  startTimer()

  const [memoOpen, setMemoOpen] = useState(false)
  const handleMemoOpen = () => setMemoOpen(true)
  const handleMemoClose = () => setMemoOpen(false)

  const [mute, setMute] = useState(false)
  const handleToMute = () => setMute(true)
  const handleNoMute = () => setMute(false)
  const [video, setVideo] = useState(false)
  const handleToVideo = () => setVideo(true)
  const handleNoVideo = () => setVideo(false)
  return (
    <div className="before-meeting-container">
      <div className="before-meeting-main">
        <div className="before-meeting-left-person">
          <img className="before-meeting-left-img" src={opponent} alt="상대방" />
          <div className="before-meeting-left-person-name">황수빈</div>
        </div>
        <div className="before-meeting-right-person">
          <img className="before-meeting-right-img" src={user} alt="나" />
          <div className="before-meeting-right-person-name">{sessionStorage.getItem('username')}</div>
        </div>
      </div>
      <div className="before-meeting-footer">
        <div className="before-meeting-time">
          {today} {now}
        </div>
        <div className="before-meeting-btn">
          <div className="before-meeting-btn-memo-container" onClick={handleMemoOpen}>
            <MeetingMemoModal open={memoOpen} close={handleMemoClose}></MeetingMemoModal>
            <div className="before-meeting-btn-memo"></div>
            <div className="before-meeting-btn-name">메모</div>
          </div>
          <div className="before-meeting-btn-memo-container" onClick={window.close}>
            <div className="before-meeting-btn-door"></div>
            <div className="before-meeting-btn-name">종료</div>
          </div>
        </div>
        <div className="before-meeting-footer-right">
          {mute === false ? (
            <div className="before-meeting-footer-right-mute" onClick={handleToMute}></div>
          ) : (
            <div className="before-meeting-footer-right-nomute" onClick={handleNoMute}></div>
          )}
          {video === false ? (
            <div className="before-meeting-footer-right-video" onClick={handleToVideo}></div>
          ) : (
            <div className="before-meeting-footer-right-novideo" onClick={handleNoVideo}></div>
          )}
          <div className="before-meeting-footer-right-chat"></div>
        </div>
      </div>
    </div>
  )
}

export default Beforemeeting
