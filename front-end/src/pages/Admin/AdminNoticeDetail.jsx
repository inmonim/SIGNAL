import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import 'assets/styles/notice.css'
import view from 'assets/image/view.png'
import api from 'api/Api.js'

function AdminNoticeDetail() {
  const location = useLocation()
  const noticeSeq = parseInt(location.state.id)
  const [data, setData] = useState([])

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/board/notice/` + noticeSeq).then((res) => {
      setData(res.data.body)
    })
  }, [])
  return (
    <div className="notice-page-container">
      <div className="notice-detail-container">
        <div className="notice-detail-title">{data.title}</div>
        <div className="notice-detail-middle">
          <div className="notice-detail-middle-regDt">{data.regDt}</div>
          <div className="notice-detail-middle-view">
            <span>
              <img src={view} alt="view" />
            </span>
            <span>{data.view}</span>
          </div>
        </div>
        <div className="notice-detail-content">{data.content}</div>
      </div>
    </div>
  )
}

export default AdminNoticeDetail
