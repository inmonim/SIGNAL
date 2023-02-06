import React, { useState } from 'react'
import 'assets/styles/projectMeeting.css'
import CodeEditIcon from 'assets/image/code-edit.png'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import MeetingPresentTime from 'components/Meeting/MeetingPresentTime'

function ProjectMeeting() {
  const [voice, setVoice] = useState(false)
  const [video, setVideo] = useState(false)
  const personList = [0, 0, 0, 0]
  console.log(personList.length)

  const [mode, setMode] = useState(0)

  const handleToVoice = () => {
    setVoice(!voice)
  }

  const handleToVideo = () => {
    setVideo(!video)
  }

  return (
    <div className="project-meeting-container">
      <div className="project-meeting-main">
        {mode === 0 ? (
          <div className="project-meeting-video-list">
            {personList.map((item, index) => (
              <VideoBox key={index} className="project-meeting-person" size={personList.length}>
                <video className="project-meeting-video" alt="나" />
                <div className="project-meeting-person-name">나</div>
              </VideoBox>
            ))}
          </div>
        ) : mode === 1 ? (
          <div className="project-meeting-video-code-edit">
            <div> 코드편집</div>
          </div>
        ) : (
          <div className="project-meeting-video-share">
            <div> 화면공유</div>
          </div>
        )}
      </div>
      <div className="project-meeting-footer">
        <div className="project-meeting-time">
          <MeetingPresentTime key={10000} personNum={personList.length}></MeetingPresentTime>
        </div>
        <div className="project-meeting-btn">
          <div className="project-meeting-btn-code-edit-container" onClick={() => setMode(0)}>
            <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
            <div className="project-meeting-btn-code-edit">회의실</div>
          </div>
          <div className="project-meeting-btn-code-edit-container" onClick={() => setMode(1)}>
            <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
            <div className="project-meeting-btn-code-edit">코드 편집</div>
            {/* 고정 아니여도 됨 */}
          </div>
          <div className="project-meeting-btn-code-edit-container" onClick={() => setMode(2)}>
            <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
            <div className="project-meeting-btn-code-edit">화면 공유</div>
            {/* 고정이여야함  absolute */}
          </div>
          <div className="project-meeting-btn-code-edit-container" onClick={() => alert('close')}>
            <img src={CodeEditIcon} alt="" className="project-meeting-btn-code-edit-icon" />
            <div className="project-meeting-btn-code-edit">종료</div>
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
          <div className="project-meeting-footer-right-chat"></div>
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
