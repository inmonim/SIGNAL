import React, { useState } from 'react'
import moment from 'moment'

function MeetingPresentTime(personNum) {
  const [time, setTime] = useState(new Date())

  const setNewDate = () => {
    setTime(new Date())
  }
  setTimeout(setNewDate, 5000)
  return (
    <div>
      {moment(time).format('YYYY-MM-DD LT')} 접속 인원 : {personNum.size}명
    </div>
  )
}
export default MeetingPresentTime
