import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from 'api/Api.js'
import AlertModal from 'components/AlertModal'
import 'assets/styles/notice.css'
import EditIcon from '@mui/icons-material/Edit'
import trashcan from 'assets/image/TrashLetter.png'
import view from 'assets/image/view.png'

function NoticeDetail() {
  const isAdmin = sessionStorage.getItem('admin')
  const location = useLocation()
  const noticeSeq = parseInt(location.state.id)
  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlert = (e) => {
    setAlertOpen(false)
    navigate(`/notice`)
  }

  const navigate = useNavigate()

  const handleToModify = () => {
    navigate(`/noticeModify`, { state: { noticeSeq: data.noticeSeq, title: data.title, content: data.content } })
  }

  const handleToTrash = () => {
    api.delete(process.env.REACT_APP_API_URL + `/admin/notice/` + noticeSeq).then((res) => {
      setAlertOpen(true)
    })
  }

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/board/notice/` + noticeSeq).then((res) => {
      setData(res.data.body)
    })
  }, [])
  return (
    <div className="notice-page-container">
      <div className="notice-detail-container">
        <div className="notice-detail-header">
          <div className="notice-detail-title">{data.title}</div>
          {isAdmin === 'true' ? (
            <div className="notice-detail-header-right">
              <EditIcon className="notice-detail-modify" onClick={handleToModify}></EditIcon>
              <img className="notice-detail-delete" src={trashcan} alt="trashcan" onClick={handleToTrash} />
              <AlertModal open={alertOpen} onClick={handleAlert} msg="삭제하시겠습니까?"></AlertModal>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="notice-detail-middle">
          <div className="notice-detail-middle-regDt">{data.regDt}</div>
          <div className="notice-detail-middle-view">
            <span>
              <img src={view} alt="view" />
            </span>
            <span>{data.view}</span>
          </div>
        </div>
        <div className="notice-detail-content">
          {data.content &&
            data.content.split('\n').map((line, index) => {
              return (
                <span key={index}>
                  {line}
                  <br />
                </span>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default NoticeDetail
