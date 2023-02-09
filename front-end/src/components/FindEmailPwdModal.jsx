import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import SignalBtn from './common/SignalBtn'
import { PatternFormat } from 'react-number-format'
import AlertFindEmail from './AlertFindEmail'

import closeBtn from 'assets/image/x.png'
import 'assets/font/font.css'
import 'assets/styles/findmodal.css'
import AlertModal from './AlertModal'

const style = {
  width: 727,
  height: 800,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '-webkit-fill-available',
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

function FindEmailPwdModal({ open, onClose }) {
  const [msgEmail, setEmailMsg] = useState('')
  const [msg, setMsg] = useState('')
  const [emailAlertOpen, setEmailAlertOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const handleFindEmail = () => {
    console.log('click Find')
    console.log('Name: ', inputName)
    console.log('PhoneNumber: ', inputPhone)
    fetch(process.env.REACT_APP_API_URL + '/auth/email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: inputName,
        phone: inputPhone,
      }),
    })
      .then((res) => {
        if (res.ok === true) {
          return res.json()
        } else {
          throw new Error('다시 시도')
        }
      })
      .then((data) => {
        setEmailMsg(data.body.email)
        setEmailAlertOpen(true)
        console.log(data.body.email)
      })
      .catch((e) => {
        setAlertOpen(true)
        setMsg('회원정보가 존재하지 않습니다.')
        return e.message
      })
  }
  const handleAlertToMain = () => {
    setEmailAlertOpen(false)
    setAlertOpen(false)
    onClose(true)
  }
  const handleToClose = () => {
    setEmailAlertOpen(false)
    setAlertOpen(false)
    onClose(true)
  }
  const handleFindPwd = () => {
    console.log('click Find Pwd')
    console.log('Email: ', inputEmail)
    setAlertOpen(true)
    fetch(process.env.REACT_APP_API_URL + '/auth/password', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: inputEmail,
      }),
    })
      .then((res) => {
        if (res.ok === true) {
          return res.json()
        } else {
          throw new Error('다시 시도')
        }
      })
      .then((data) => {
        setMsg('이메일 전송완료')
      })
      .catch((e) => {
        setMsg('회원정보가 존재하지 않습니다.')
        return e.message
      })
  }

  const [inputName, setInputName] = useState('')
  const [inputPhone, setInputPhone] = useState('')
  const [inputEmail, setInputEmail] = useState('')

  const handleInputName = (e) => {
    setInputName(e.target.value)
  }
  const handleInputPhone = (e) => {
    setInputPhone(e.target.value)
  }
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }

  return (
    <>
      <Modal hideBackdrop open={open} onClose={onClose}>
        <Box sx={style}>
          <img className="find-closeimg" src={closeBtn} alt="closeBtn" onClick={onClose} />
          <div className="find-container">
            <div className="find-header">이메일 / 비밀번호 찾기</div>
            <div className="find-email">
              <div className="find-email-header">이메일 찾기</div>
              <div className="find-email-input">
                <TextField id="filled-multiline-flexible" label="Name" sx={inputStyle} onChange={handleInputName} />
                <PatternFormat
                  format="###-####-####"
                  customInput={TextField}
                  name="phone"
                  label="Phone Number"
                  sx={inputStyle}
                  onChange={handleInputPhone}
                ></PatternFormat>
              </div>
              <div className="find-email-btn">
                <SignalBtn
                  sigwidth="102px"
                  sigheight="55px"
                  sigfontsize="29px"
                  sigborderradius={14}
                  onClick={handleFindEmail}
                >
                  찾기
                </SignalBtn>
                <AlertFindEmail
                  name={inputName}
                  msg={msgEmail}
                  open={emailAlertOpen}
                  onClick={handleAlertToMain}
                ></AlertFindEmail>
                <AlertModal msg={msg} open={alertOpen} onClick={handleAlertToMain} onClose={handleToClose}></AlertModal>
              </div>
            </div>
            <div className="find-pwd">
              <div className="find-pwd-header">비밀번호 찾기</div>
              <div className="find-pwd-input">
                <TextField id="filled-multiline-flexible" label="E-mail" sx={inputStyle} onChange={handleInputEmail} />
              </div>
              <div className="find-pwd-btn">
                <SignalBtn
                  sigwidth="214px"
                  sigheight="55px"
                  sigfontsize="29px"
                  sigborderradius={14}
                  onClick={handleFindPwd}
                >
                  인증 메일 전송
                </SignalBtn>
                <AlertModal msg={msg} open={alertOpen} onClick={handleAlertToMain} onClose={handleToClose}></AlertModal>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default FindEmailPwdModal
