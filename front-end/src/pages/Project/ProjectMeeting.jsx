import React, { useState } from 'react'
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

function ProjectMeeting() {
  const [voice, setVoice] = useState(false)
  const [video, setVideo] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [color, setColor] = useState('black')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const personList = [0, 0, 0, 0]

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
                <video className="project-meeting-video" alt="나" style={{ width: '100%', height: '100%' }} />
                <div className="project-meeting-person-name">나</div>
              </VideoBox>
            ))}
          </div>
        ) : mode === 1 ? (
          <div className="project-meeting-video-code-edit">
            <video style={{ width: '100%', height: '100%' }}> 코드편집</video>
          </div>
        ) : (
          <div className="project-meeting-video-share-section">
            <div className="project-meeting-video-share-palette">
              <div className="project-meeting-video-share-palette2">
                <div style={{ margin: '30px auto' }}>
                  <SelectedColor color={color} onClick={() => setPaletteOpen(!paletteOpen)}></SelectedColor>
                </div>
                <div style={{ textAlign: 'center', margin: '30px' }}>
                  <img src={Eraser} alt="" className="project-meeting-video-share-eraser" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <SignalBtn>모두지우기</SignalBtn>
                </div>
              </div>
            </div>
            {paletteOpen ? (
              <div className="project-meeting-video-share-color-palette">
                <Color onClick={() => setColor('black')} color={'black'}></Color>
                <Color onClick={() => setColor('white')} color={'white'}></Color>
                <Color onClick={() => setColor('red')} color={'red'}></Color>
                <Color onClick={() => setColor('blue')} color={'blue'}></Color>
              </div>
            ) : (
              ''
            )}
            <div className="project-meeting-video-share">
              <video style={{ width: '100%', height: '100%', borderRadius: '25px' }}> 비디오</video>
            </div>
            <div className="project-meeting-video-sare-painht" style={{ border: '1px solid' }}>
              <div
                style={{
                  backgroundColor: 'rgba(87, 75, 159, 0.3)',
                  width: '100%',
                  height: '100%',
                  borderRadius: '25px',
                }}
              >
                그림판
              </div>
            </div>
          </div>
        )}
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
            {/* 고정 아니여도 됨 */}
          </div>
          <div className="project-meeting-btn-share-container" onClick={() => setMode(2)}>
            <img src={Share} alt="" className="project-meeting-btn-share-icon" />
            <div className="project-meeting-btn-share">화면 공유</div>
            {/* 고정이여야함  absolute */}
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
