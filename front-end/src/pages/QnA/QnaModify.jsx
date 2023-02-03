import React, { useState } from 'react'
import { TextField } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/qna.css'
import { useLocation, useNavigate } from 'react-router-dom'
import AlertModal from 'components/AlertModal'
import api from 'api/Api'

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '1000px',
  marginBottom: '28px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

function QnaModify() {
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    console.log(nextInputs)
  }
  const location = useLocation()
  const seq = parseInt(location.state.qnaSeq)
  const modifyTitle = location.state.title
  const modifyContent = location.state.content
  const [alertOpen, setAlertOpen] = useState(false)

  const [inputs, setInputs] = useState({
    content: modifyContent,
    title: modifyTitle,
    userSeq: '',
  })
  const handleQnaModify = () => {
    api.put(process.env.REACT_APP_API_URL + '/board/qna/' + seq, JSON.stringify(inputs)).then((res) => {
      setAlertOpen(true)
    })
  }
  const navigate = useNavigate()
  const handleAlert = (e) => {
    setAlertOpen(false)
    navigate(`/qna`)
  }
  return (
    <div className="qna-page-container">
      <div className="qna-regist-container">
        <div className="qna-regist-header">Q & A 수정</div>
        <div className="qna-regist-main">
          <div className="qna-regist-title">
            <label>제목</label>
            <TextField
              id="filled-multiline-flexible"
              name="title"
              defaultValue={modifyTitle}
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
          </div>
          <div className="qna-regist-content">
            <label>내용</label>
            <TextField
              id="filled-multiline-flexible"
              rows={10}
              defaultValue={modifyContent}
              multiline
              sx={inputStyle}
              name="content"
              onChange={handleInput}
            />
          </div>
          <div>
            <SignalBtn
              sigwidth="84px"
              sigheight="45px"
              sigfontsize="24px"
              sigborderradius={14}
              sigmargin="12.5px auto"
              variant="contained"
              onClick={handleQnaModify}
            >
              완료
            </SignalBtn>
            <AlertModal open={alertOpen} onClick={handleAlert} msg="수정되었습니다."></AlertModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QnaModify
