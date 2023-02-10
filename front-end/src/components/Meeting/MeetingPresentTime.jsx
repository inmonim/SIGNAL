import React, { useState } from 'react'
import 'assets/font/font.css'
import moment from 'moment'

function MeetingPresentTime(props) {
  const [time, setTime] = useState(new Date())
  // console.log(props, props.personNum.length)
  const setNewDate = () => {
    setTime(new Date())
  }
  setTimeout(setNewDate, 5000)
  return (
    <div className="project-meeting-video-code-edit">
      {moment(time).format('YYYY-MM-DD LT')} 접속 인원 : {props.personNum.length}명
    </div>
  )
}
export default MeetingPresentTime
