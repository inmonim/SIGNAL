import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import 'assets/font/font.css'
import SignalBtn from './common/SignalBtn'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AlertModal from 'components/AlertModal'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import closeBtn from 'assets/image/x.png'
import { PatternFormat } from 'react-number-format'
import api from 'api/Api'
import 'assets/styles/regist.css'

const style = {
  width: 727,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // overflow: 'hidden',
  maxHeight: 900,
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '549px',
  margin: '18px 0px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

function RegistModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y:scroll;
    width:100%`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])
  const [value, setValue] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    birth: '',
  })

  const dateInput = (e) => {
    // dateSelect 폼에서 현재 위치를 저장하기 위해 setValue는 이벤트를 그대로 저장
    setValue(e)
    // inputs.userBirth로 들어가는 날짜는 String으로 변환
    const birth = birthToString(e)
    inputs.birth = birth
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    // console.log(nextInputs)
  }

  function checkemail(str) {
    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return reg.test(str)
  }

  function checkpass(str) {
    const reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/
    return reg.test(str)
  }

  function birthToString(value) {
    if (value !== null) {
      const year = String(value.$y)
      let month = ''
      let day = ''
      if (value.$M + 1 >= 10) {
        month = String(value.$M + 1)
      } else {
        month = '0' + String(value.$M + 1)
      }
      if (value.$D >= 10) {
        day = String(value.$D)
      } else {
        day = '0' + String(value.$D)
      }
      const birthString = `${year}-${month}-${day}`
      return birthString
    }
  }

  async function emailDupCheck() {
    const email = inputs.email
    return await api.get(process.env.REACT_APP_API_URL + `/auth/email/${email}`).then((response) => {
      console.log(response)
      if (response.data.body === true) {
        return true
      } else {
        return false
      }
    })
  }
  async function nicknameDupCheck() {
    const nickname = inputs.nickname
    return await api.get(process.env.REACT_APP_API_URL + `/auth/nickname/${nickname}`).then((response) => {
      console.log(response)
      if (response.data.body === true) {
        return true
      } else {
        return false
      }
    })
  }
  function registUser() {
    api.post(process.env.REACT_APP_API_URL + '/user', JSON.stringify(inputs)).then((response) => {
      console.log(`data: ${JSON.stringify(response.data)}`)
    })
  }

  async function regist() {
    const emailDup = await emailDupCheck()
    console.log('이메일 검사 중')
    if (emailDup) {
      console.log('이메일 검사 걸림')
      setMsg1('중복된 이메일입니다.')
      return false
    }
    const nicknameDup = await nicknameDupCheck()
    console.log('닉네임 검사중')
    if (nicknameDup) {
      console.log('닉네임 검사에서 함 걸림')
      setMsg4('중복된 닉네임입니다.')
      return false
    }
    const registSuccess = registUser()
    console.log('등록중')
    if (registSuccess === false) {
      console.log('등록 실패')
      return false
    }
    console.log('등록에 성공하셨습니다')
    return true
  }

  // 해당 input에서 유효성, 중복검사 통과하면 경고문 없애기 위한 리셋 함수
  function msgReset() {
    setMsg1('')
    setMsg2('')
    setMsg3('')
    setMsg4('')
  }

  const [msg1, setMsg1] = useState('')
  const [msg2, setMsg2] = useState('')
  const [msg3, setMsg3] = useState('')
  const [msg4, setMsg4] = useState('')

  const handleAlertOpen = () => {
    msgReset()
    if (checkemail(inputs.email) === false) {
      setMsg1('이메일 형식을 확인해주세요.')
      return
    } else {
      setMsg1('')
    }
    if (checkpass(inputs.password) === false) {
      setMsg2('8자리 이상 영어, 숫자, 특수문자 조합')
      return
    } else {
      setMsg2('')
    }
    if (inputs.password !== inputs.passwordCheck) {
      setMsg3('비밀번호가 일치하지 않습니다.')
      return
    } else {
      setMsg3('')
    }
    regist().then((checkPass) => {
      if (checkPass) {
        setAlertOpen(true)
      }
    })
  }

  const handleToLogin = () => {
    setAlertOpen(false)
    onClose(onClose(true))
  }

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Modal hideBackdrop open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
        <Box sx={style}>
          {/* <form id="signupForm" onSubmit={handleAlertOpen}> */}
          <img
            style={{ cursor: 'pointer', position: 'relative', float: 'right' }}
            src={closeBtn}
            alt="closeBtn"
            onClick={onClose}
          />
          <Typography
            id="modal-title"
            sx={{ textAlign: 'center', fontSize: '47px', fontWeight: 'bold', marginTop: '50px' }}
          >
            회원가입
          </Typography>
          <div className="modal-desc">
            <TextField
              id="filled-multiline-flexible"
              name="email"
              label="E-mail"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
            <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg1}</div>
            <TextField
              id="filled-multiline-flexible"
              name="password"
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
              onChange={handleInput}
            />
            <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg2}</div>
            <TextField
              id="filled-multiline-flexible"
              name="passwordCheck"
              label="Password Check"
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
              onChange={handleInput}
            />
            <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg3}</div>
            <TextField
              id="filled-multiline-flexible"
              name="name"
              label="Name"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
            <TextField
              id="filled-multiline-flexible"
              name="nickname"
              label="Nickname"
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
            <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg4}</div>
            <PatternFormat
              format="###-####-####"
              customInput={TextField}
              name="phone"
              label="Phone Number"
              sx={inputStyle}
              onChange={handleInput}
            ></PatternFormat>
            {/* <TextField id="filled-multiline-flexible" label="PhoneNumber ( 010-0000-0000 )" multiline sx={inputStyle} /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="birth"
                label="Birth"
                inputFormat="YYYY/MM/DD"
                value={value}
                onChange={dateInput}
                renderInput={(params) => <TextField {...params} helperText={null} sx={inputStyle} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <SignalBtn
              sigwidth="173px"
              sigheight="90px"
              sigfontsize="40px"
              sigborderradius={25}
              sigmargin="30px auto"
              variant="contained"
              onClick={handleAlertOpen}
            >
              회원가입
            </SignalBtn>
            <AlertModal msg="인증 메일이 전송되었습니다." open={alertOpen} onClick={handleToLogin}></AlertModal>
          </div>
          {/* </form> */}
        </Box>
      </Modal>
    </>
  )
}

export default RegistModal
