import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'

const detailStyle = {
  width: '748px',
  height: '602px',
}

function LetterDetail({ viewDetail }) {
  const [data, setData] = useState([])
  const letterSeq = viewDetail
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/letter/' + letterSeq, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.body)
        setData(res.body)
      })
  }, [])

  return (
    <div style={detailStyle}>
      <Divider />
      <div
        className="letter-title"
        style={{
          fontSize: '44px',
          margin: '28px',
        }}
      >
        {data.title}
      </div>
      <Divider />
      <div
        className="letter-middle"
        style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', margin: '11px', color: '#616161' }}
      >
        <div>{data.regDt}</div> <div>{data.fromNickname}</div>
      </div>
      <Divider />
      <div className="letter-content" style={{ fontSize: '24px', margin: '32px' }}>
        {data.content}
      </div>
      <Divider />
    </div>
  )
}

export default LetterDetail
