import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import 'assets/styles/notice.css'
import view from 'assets/image/view.png'

function QnaDetail() {
  const location = useLocation()
  const qnaSeq = parseInt(location.state.id)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/board/qna/` + qnaSeq, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.body)
      })
  }, [])
  return (
    <div className="qna-page-container">
      <div className="qna-detail-container">
        <div className="qna-detail-title">{data.title}</div>
        <div className="qna-detail-middle">
          <div className="qna-detail-middle-regDt">{data.regDt}</div>
          <div className="qna-detail-middle-view">
            <span>
              <img src={view} alt="view" />
            </span>
            <span>{data.view}</span>
          </div>
        </div>
        <div className="qna-detail-content">{data.content}</div>
      </div>
    </div>
  )
}

export default QnaDetail
