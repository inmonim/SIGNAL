import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function NoticeDetail() {
  const location = useLocation()
  const noticeSeq = parseInt(location.state.id)
  const [data, setData] = useState([])
  console.log(noticeSeq)

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/board/notice/` + noticeSeq, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.body)
        console.log(res.body)
      })
  }, [])
  return (
    <div>
      <div className="notice-detail-title">{data.title}</div>
      <div className="notice-detail-middle">
        {data.regDt} {data.view}
      </div>
      <div className="notice-detail-content">{data.content}</div>
    </div>
  )
}

export default NoticeDetail
