import React, { useState } from 'react'
import { TextField } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
import { useNavigate } from 'react-router-dom'
import AlertModal from 'components/AlertModal'
import 'assets/styles/signal.css'
// import api from 'api/Api'

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

function Signalregister() {
  const [inputs, setInputs] = useState({
    projectSeq: '',
    subject: '',
    pptfile: '',
    uccUrl: '',
    deployUrl: '',
    README: '',
    userSeq: sessionStorage.getItem('userSeq'),
  })
  const [alertOpen, setAlertOpen] = useState(false)
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    console.log(nextInputs)
  }
  // const handlesignalRegist = () => {
  //   api.post(process.env.REACT_APP_API_URL + '/board/qna', JSON.stringify(inputs)).then((res) => setAlertOpen(true)
  // }
  const handlesignalRegist = () => {
    setAlertOpen(true)
  }
  const navigate = useNavigate()
  const handleAlert = (e) => {
    setAlertOpen(false)
    navigate(`/signal`)
  }
  return (
    <div className="signal-page-container">
      <div className="signal-regist-container">
        <div className="signal-regist-header">시그널위크 프로젝트 등록</div>
        <div className="signal-regist-main">
          <div className="signal-regist-title">
            <label>프로젝트</label>
            <TextField
              id="filled-multiline-flexible"
              name="projectSeq"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
          </div>
          <div className="signal-regist-title">
            <label>프로젝트 이름</label>
            <TextField id="filled-multiline-flexible" name="subject" multiline sx={inputStyle} onChange={handleInput} />
          </div>
          <div className="signal-regist-title">
            <label>PPT파일</label>
            <TextField id="filled-multiline-flexible" name="pptfile" multiline sx={inputStyle} onChange={handleInput} />
          </div>
          <div className="signal-regist-title">
            <label>UCC(YouTube 주소)</label>
            <TextField id="filled-multiline-flexible" name="uccUrl" multiline sx={inputStyle} onChange={handleInput} />
          </div>
          <div className="signal-regist-title">
            <label>배포 주소</label>
            <TextField
              id="filled-multiline-flexible"
              name="deployUrl"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
          </div>
          <div className="signal-regist-content">
            <label>README</label>
            <TextField
              id="filled-multiline-flexible"
              rows={10}
              multiline
              sx={inputStyle}
              name="README"
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
              onClick={handlesignalRegist}
            >
              완료
            </SignalBtn>
            <AlertModal open={alertOpen} onClick={handleAlert} msg="등록되었습니다."></AlertModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signalregister
