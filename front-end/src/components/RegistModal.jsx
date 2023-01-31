import React, { useState } from 'react'
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

import closeBtn from 'assets/image/x.png'
import { PatternFormat } from 'react-number-format'

const style = {
  width: 727,
  // height: '100%',
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
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

const listStyle = {
  textAlign: 'center',
  overflow: 'scroll',
  maxHeight: '525px',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '10px',
  scrollbarColor: '#574B9F',
}

function RegistModal({ open, onClose }) {
  const [value, setValue] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    // userBirth: '',
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    console.log(nextInputs)
  }

  function checkemail(str) {
    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return reg.test(str)
  }

  function checkpass(str) {
    const reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/
    return reg.test(str)
  }

  const [msg1, setMsg1] = useState('')
  const [msg2, setMsg2] = useState('')
  const [msg3, setMsg3] = useState('')
  // const [msg4, setMsg4] = useState('')

  const handleAlertOpen = () => {
    if (checkemail(inputs.email) === false) {
      setMsg1('이메일 형식을 확인해주세요.')
      return
    }
    if (checkpass(inputs.password) === false) {
      setMsg2('8자리 이상 영어, 숫자, 특수문자 조합')
      return
    }
    if (inputs.password !== inputs.passwordCheck) {
      setMsg3('비밀번호가 일치하지 않습니다.')
      return
    }
    setAlertOpen(true)
    fetch(process.env.REACT_APP_API_URL + '/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json()
        } else {
          alert('다시 시도')
        }
      })
      .then((data) => {
        console.log(`data: ${JSON.stringify(data)}`)
      })
  }

  const handleToLogin = () => {
    setAlertOpen(false)
    onClose(onClose(true))
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
          <div id="modal-desc" style={listStyle}>
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
              multiline
              sx={inputStyle}
              onChange={handleInput}
            />
            <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg2}</div>
            <TextField
              id="filled-multiline-flexible"
              name="passwordCheck"
              label="Password Check"
              multiline
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
            <PatternFormat
              format="### - #### - ####"
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
                inputFormat="YYYY / MM / DD"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} helperText={null} sx={inputStyle} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <SignalBtn
              sigwidth="173px"
              sigheight="90px"
              sigfontSize="40px"
              sigBorderRadius={25}
              sigMargin="30px auto"
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
