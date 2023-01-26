import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { FormControlLabel, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import 'assets/font/font.css'
import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import RegistModal from './RegistModal'

import modalLogo from 'assets/image/Mainlogo.png'
import closeBtn from 'assets/image/x.png'

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
  width: '549px',
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

const SignalBtn = styled(Btn)(({ theme }) => ({
  fontFamily: 'dohyeon',
  fontColor: theme.palette.getContrastText('#574B9F'),
  backgroundColor: '#574B9F',
  width: '173px',
  height: '90px',
  fontSize: '44px',
  border: '1px solid #574B9F',
  borderRadius: 25,
  boxShadow: '0px 4px 7px rgba(0,0,0,0.25)',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '1px solid #574B9F',
    color: '#574B9F',
  },
}))

function LoginModal({ open, onClose }) {
  const [regOpen, setRegOpen] = useState(false)
  const handleRegOpen = () => {
    setRegOpen(true)
  }
  const handleRegClose = () => {
    setRegOpen(false)
  }
  const handleToMain = () => {
    console.log('click login')
    console.log('Email: ', inputEmail)
    console.log('Pwd: ', inputPwd)
    if (inputEmail === 'gurrms@naver.com' && inputPwd === 'gurrms123.') {
      console.log('로그인 성공')
      sessionStorage.setItem('userEmail', inputEmail)
      sessionStorage.setItem('username', '혁근')
      sessionStorage.setItem('userSeq', 1)
      onClose(onClose(true))
      return
    }
    console.log('로그인 실패')
  }

  const [inputEmail, setInputEmail] = useState('gurrms@naver.com')
  const [inputPwd, setInputPwd] = useState('gurrms123.')

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }
  const handleInputPwd = (e) => {
    setInputPwd(e.target.value)
  }
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="close">
            <img
              className="closeimg"
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '90%',
                bottom: '90%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="login-logo" style={{ display: 'inline-block' }}>
              <img style={{ width: '409px', height: '205px', margin: '30px 0px' }} src={modalLogo} alt="modalLogo" />
            </div>
            <div className="login-input" style={{ display: 'inline-block' }}>
              <TextField
                id="filled-multiline-flexible"
                label="E-mail"
                multiline
                sx={inputStyle}
                onChange={handleInputEmail}
              />
              <TextField
                id="filled-multiline-flexible"
                label="Password"
                multiline
                sx={inputStyle}
                onChange={handleInputPwd}
              />
              <div className="login-under1" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <FormControlLabel
                  style={{ color: '#574b9f' }}
                  label={<span style={{ fontSize: 20 }}>자동로그인</span>}
                  control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: '#574b9f',
                    fontSize: '20px',
                  }}
                >
                  이메일 / 비밀번호 찾기 {'>>'}
                </div>
              </div>
              <div className="login-under2">
                <div style={{ fontSize: '22px', display: 'inline-block' }}>
                  계정이 없으신가요?
                  <div
                    style={{
                      display: 'inline-block',
                      margin: '0px 30px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={handleRegOpen}
                  >
                    회원가입
                  </div>
                  <RegistModal open={regOpen} onClose={handleRegClose}></RegistModal>
                </div>
              </div>
              <div className="login-btn" style={{ margin: '30px 0px' }}>
                <SignalBtn variant="contained" onClick={handleToMain}>
                  로그인
                </SignalBtn>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LoginModal
