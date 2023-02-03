import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { FormControlLabel, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import 'assets/font/font.css'
import SignalBtn from './common/SignalBtn'
import RegistModal from './RegistModal'
import FindModal from './FindEmailPwdModal'

import modalLogo from 'assets/image/Mainlogo.png'
import closeBtn from 'assets/image/x.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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

function LoginModal({ open, onClose }) {
  const [regOpen, setRegOpen] = useState(false)
  const [findOpen, setFindOpen] = useState(false)
  const handleRegOpen = () => {
    setRegOpen(true)
  }
  const handleFindOpen = () => {
    setFindOpen(true)
  }
  const handleRegClose = () => {
    setRegOpen(false)
  }
  const handleFindClose = () => {
    setFindOpen(false)
  }
  const handleToMain = () => {
    console.log('click login')
    console.log('Email: ', inputEmail)
    console.log('Pwd: ', inputPwd)

    fetch(process.env.REACT_APP_API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: inputEmail,
        password: inputPwd,
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
        console.log('로그인 성공')
        // 자동로그인 체크했을 때 로컬스토리지에 refresh 토큰 저장
        if (isAutoLogin) {
          localStorage.setItem('refreshToken', data.body.refreshToken)
        }
        console.log(data.body.accessToken)
        sessionStorage.setItem('accessToken', data.body.accessToken)
        sessionStorage.setItem('refreshToken', data.body.refreshToken)
        sessionStorage.setItem('userEmail', data.body.email)
        sessionStorage.setItem('username', data.body.name)
        sessionStorage.setItem('nickname', data.body.nickname)
        sessionStorage.setItem('userSeq', data.body.userSeq)
        console.log(sessionStorage.getItem('accessToken'))
        onClose(onClose(true))
      })
      .catch((e) => {
        alert('다시 시도')
        return e.message
      })
  }

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      handleToMain()
    }
  }

  const [inputEmail, setInputEmail] = useState('')
  const [inputPwd, setInputPwd] = useState('')
  const [isAutoLogin, setIsAutoLogin] = useState(false)

  const handleInputEmail = (e) => {
    // cosnt nextInputEmail = {...inputEmail}
    setInputEmail(e.target.value)
  }
  const handleInputPwd = (e) => {
    setInputPwd(e.target.value)
    console.log(e.target.value)
  }
  const handleIsAutoLogin = () => {
    const nextIsAutoLogin = isAutoLogin
    setIsAutoLogin(!nextIsAutoLogin)
    console.log(nextIsAutoLogin)
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
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
              <TextField id="filled-multiline-flexible" label="E-mail" sx={inputStyle} onChange={handleInputEmail} />
              <TextField
                id="filled-multiline-flexible"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
                onChange={handleInputPwd}
                onKeyDown={(e) => activeEnter(e)}
              />
              <div className="login-under1" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <FormControlLabel
                  onChange={handleIsAutoLogin}
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
                  onClick={handleFindOpen}
                >
                  이메일 / 비밀번호 찾기 {'>>'}
                  <FindModal open={findOpen} onClose={handleFindClose}></FindModal>
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
              <div className="login-btn">
                <SignalBtn
                  sigwidth="173px"
                  sigheight="90px"
                  sigfontsize="44px"
                  sigborderradius={25}
                  sigmargin="30px auto"
                  variant="contained"
                  onClick={handleToMain}
                >
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
