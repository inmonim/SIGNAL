import React from 'react'
import '../../assets/styles/Calendar.css'
import MeetingTime from './MeetingTime'

function MeetingTimeList(props) {
  return (
    <div className="time-list-section">
      {props.timeList.map((item) => (
        <MeetingTime
          close={props.close}
          item={item.time}
          key={item.id}
          id={item.id}
          onChange={props.onChange}
        ></MeetingTime>
      ))}
    </div>
  )
}

export default MeetingTimeList
