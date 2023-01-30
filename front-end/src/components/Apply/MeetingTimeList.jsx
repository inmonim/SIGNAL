import React from 'react'
import Button from '@mui/material/Button'

function MeetingTimeSelect(meetingList) {
  console.log(meetingList)

  const timeFilter = (item) => {
    console.log(item.slice(11, 13))
    return item.slice(11, 13)
  }
  const style = {
    display: 'flex',
    alignItems: 'center',
  }
  return (
    <div>
      {meetingList.timeList.map((item, index) => (
        <div style={style} key={index}>
          <div>{timeFilter(item)} 시</div>
          <Button variant="contained" value={timeFilter(item) || ''}>
            선택
          </Button>
        </div>
      ))}
    </div>
  )
}

export default MeetingTimeSelect
