import React from 'react'
import 'assets/styles/projectMeeting.css'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

function Video(size) {
  return (
    <VideoBox className="project-meeting-person" size={size}>
      <video className="project-meeting-video" alt="나" />
      <div className="project-meeting-person-name">나</div>
    </VideoBox>
  )
}
export default Video

const videobox = (props) => {
  console.log()
  return css`
    margin: 15px 15px;
    border: 1px solid black;
    width: (400 / ${props.size.size}) px;
    height: 330px;
    border-radius: 25px;
  `
}

const VideoBox = styled.div`
  ${videobox};
`
