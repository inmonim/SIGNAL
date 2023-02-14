import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { FormControlLabel, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import 'assets/font/font.css'
import SignalBtn from './common/SignalBtn'
import FindModal from './FindEmailPwdModal'
import AlertModal from './AlertModal'

import modalLogo from 'assets/image/Mainlogo.png'
import closeBtn from 'assets/image/x.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import api from 'api/Api'
import { Link, useNavigate } from 'react-router-dom'

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
  const [findOpen, setFindOpen] = useState(false)
  const handleFindOpen = () => {
    setFindOpen(true)
  }
  const handleFindClose = () => {
    setFindOpen(false)
  }
  const [msg, setMsg] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)
  const navigate = useNavigate()

  const handleToMain = async () => {
    console.log('click login')
    console.log('Email: ', inputEmail)
    console.log('Pwd: ', inputPwd)
    await api
      .post(
        process.env.REACT_APP_API_URL + '/auth/login',
        JSON.stringify({
          email: inputEmail,
          password: inputPwd,
        })
      )
      .then((response) => {
        console.log(response.data.body)
        // 자동로그인 체크했을 때 로컬스토리지에 refresh 토큰 저장
        if (isAutoLogin) {
          localStorage.setItem('refreshToken', response.data.body.refreshToken)
        }
        sessionStorage.setItem('accessToken', response.data.body.accessToken)
        sessionStorage.setItem('refreshToken', response.data.body.refreshToken)
        sessionStorage.setItem('userEmail', response.data.body.email)
        sessionStorage.setItem('username', response.data.body.name)
        sessionStorage.setItem('nickname', response.data.body.nickname)
        sessionStorage.setItem('userSeq', response.data.body.userSeq)
        sessionStorage.setItem('admin', response.data.body.admin)
        onClose(onClose(true))
        navigate('/')
        location.reload()
      })
      .catch((e) => {
        console.log(e)
        setMsg('"이메일 인증" 또는 "계정"을 확인해주세요!')
        setAlertOpen(true)
        return e.message
      })
  }

  const handleToClose = () => {
    setAlertOpen(false)
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
                </div>
                <FindModal open={findOpen} onClose={handleFindClose}></FindModal>
              </div>
              <div className="login-under2">
                <div style={{ fontSize: '22px', display: 'inline-block' }}>
                  계정이 없으신가요?
                  <Link to="/regist">
                    <div
                      style={{
                        display: 'inline-block',
                        margin: '0px 30px',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      onClick={() => onClose(true)}
                    >
                      회원가입
                    </div>
                  </Link>
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
                <AlertModal open={alertOpen} onClick={handleToClose} onClose={handleToClose} msg={msg}></AlertModal>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LoginModal
