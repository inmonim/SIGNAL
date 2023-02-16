import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import trashcan from 'assets/image/TrashLetter.png'
import AlertModal from 'components/AlertModal'
import api from 'api/Api'

const detailStyle = {
  width: '800px',
  height: '602px',
  borderTop: '2px solid #796FB2',
  borderBottom: '2px solid #796FB2',
}

function LetterDetail({ handleChangeView, view, fromto, handleMenuListItemClick }) {
  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const letterSeq = view
  const fromtoCheck = fromto
  console.log(fromtoCheck)
  console.log('view_Detail: ', view)
  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + '/letter/' + letterSeq).then((res) => {
      console.log(res.data.body)
      console.log(res.data.body.regDt)
      setData(res.data.body)
    })
  }, [])

  const handleToTrash = () => {
    api.delete(process.env.REACT_APP_API_URL + '/letter/' + letterSeq).then((res) => {
      console.log(res.data.body)
      setAlertOpen(true)
    })
  }

  const handleAlert = (e) => {
    setAlertOpen(false)
    handleChangeView(0)
    handleMenuListItemClick(2)
  }

  const letterContent = data.content

  return (
    <div style={detailStyle}>
      <div className="letter-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          className="letter-title"
          style={{
            fontSize: '44px',
            margin: '28px',
          }}
        >
          {data.title}
        </div>
        {fromtoCheck === 'from' ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ cursor: 'pointer' }} src={trashcan} alt="trashcan" onClick={handleToTrash} />
            <AlertModal open={alertOpen} onClick={handleAlert} msg="삭제하시겠습니까?"></AlertModal>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Divider />
      <div
        className="letter-middle"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '24px',
          padding: '11px 30px',
          color: '#616161',
        }}
      >
        <div>{data.regDt}</div>
        {fromtoCheck === 'from' ? <div>{data.fromNickname}</div> : <div>{data.toNickname}</div>}
      </div>
      <Divider />
      <div
        dangerouslySetInnerHTML={{ __html: letterContent }}
        className="letter-content"
        style={{ fontSize: '24px', margin: '32px', whiteSpace: 'pre-wrap' }}
      ></div>
    </div>
  )
}

export default LetterDetail
