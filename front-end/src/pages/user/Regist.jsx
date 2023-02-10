import React, { useState } from 'react'
import 'assets/styles/regist.css'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { PatternFormat } from 'react-number-format'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SignalBtn from 'components/common/SignalBtn'
import AlertModal from 'components/AlertModal'
import api from 'api/Api'
import { useNavigate } from 'react-router'

function Regist() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    birth: '',
  })

  const text = `<div style="font-size:27px; text-align: center;">- 이용약관 -</div><br>
<div style="line-height:30px">1. Signal의 모든 서비스는 회원가입과 로그인이 정상적으로 이루어진 사용자에게만 제공됩니다.  <br>
2. 회원가입 시 입력된 개인정보 및 암호화된 비밀번호는 사이트가 보관합니다.<br>
3. 제공된 모든 개인정보는 서비스 제공 목적 이외의 어떠한 목적으로도 사용되지 않습니다.<br>
4. 회원탈퇴 시 결제 내역을 포함한 모든 정보는 삭제됩니다.</div>`

  const [value, setValue] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)

  const [msg1, setMsg1] = useState('')
  const [msg2, setMsg2] = useState('')
  const [msg3, setMsg3] = useState('')
  const [msg4, setMsg4] = useState('')
  const [msg5, setMsg5] = useState('')

  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
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

  const dateInput = (e) => {
    setValue(e)
    const birth = birthToString(e)
    inputs.birth = birth
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleClickShowPasswordCheck = () => setShowPasswordCheck((show) => !show)
  const handleMouseDownPasswordCheck = (event) => {
    event.preventDefault()
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

  function checkemail(str) {
    const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    return reg.test(str)
  }

  function checkpass(str) {
    const reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/
    return reg.test(str)
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

  function msgReset() {
    setMsg1('')
    setMsg2('')
    setMsg3('')
    setMsg4('')
    setMsg5('')
  }

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

    if (!check) {
      setMsg5('개인정보 이용 동의 필요!')
      return
    } else {
      setMsg5('')
    }
    regist().then((checkPass) => {
      if (checkPass) {
        setAlertOpen(true)
      }
    })
  }

  const [check, setCheck] = useState(false)
  const handleToCheck = () => {
    const nextCheck = check
    setCheck(!nextCheck)
    console.log(check)
  }

  const navigate = useNavigate()
  const handleToLogin = () => {
    setAlertOpen(false)
    navigate('/')
  }

  return (
    <div className="regist-back">
      <div className="regist-container">
        <div className="regist-main">
          <div className="regist-title">회원가입</div>
          <div className="regist-input-container">
            <div className="regist-input">
              <div className="regist-input-item">
                <div className="regist-input-label">E-mail</div>
                <RegistInput id="filled-multiline-flexible" name="email" onChange={handleInput} />
              </div>
              <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg1}</div>
              <div className="regist-input-item">
                <div className="regist-input-label">Password</div>
                <RegistInput
                  id="filled-multiline-flexible"
                  name="password"
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
                  onChange={handleInput}
                />
              </div>
              <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg2}</div>
              <div className="regist-input-item">
                <div className="regist-input-label">Password Check</div>
                <RegistInput
                  id="filled-multiline-flexible"
                  name="passwordCheck"
                  type={showPasswordCheck ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordCheck}
                          onMouseDown={handleMouseDownPasswordCheck}
                          edge="end"
                        >
                          {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleInput}
                />
              </div>
              <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg3}</div>
              <div className="regist-input-item">
                <div className="regist-input-label">Name</div>
                <RegistInput id="filled-multiline-flexible" name="name" multiline onChange={handleInput} />
              </div>
              <div className="regist-input-item">
                <div className="regist-input-label">Nickname</div>
                <RegistInput id="filled-multiline-flexible" name="nickname" multiline onChange={handleInput} />
              </div>
              <div style={{ textAlign: 'left', marginLeft: '50px', color: 'red' }}>{msg4}</div>
              <div className="regist-input-item">
                <div className="regist-input-label">Phone Number</div>
                <PatternFormat
                  format="###-####-####"
                  customInput={RegistInput}
                  name="phone"
                  onChange={handleInput}
                ></PatternFormat>
              </div>
              <div className="regist-input-item">
                <div className="regist-input-label">Birth</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="birth"
                    inputFormat="YYYY/MM/DD"
                    value={value}
                    onChange={dateInput}
                    renderInput={(params) => <RegistInput {...params} helperText={null} />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="regist-terms-container">
              <div className="regist-terms" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
            <FormControlLabel
              className="regist-terms-agree"
              onChange={handleToCheck}
              style={{ color: '#574b9f' }}
              label={<span style={{ fontSize: 20 }}>개인정보 수집/이용에 동의합니다.</span>}
              control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />}
            />
            <div className="regist-terms-agree-msg">{msg5}</div>
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
          </div>
        </div>
      </div>
    </div>
  )
}

const RegistInput = styled(TextField)({
  width: '549px',
  margin: '18px 0px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
      borderBottomColor: '#574b9f',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
      borderBottomColor: '#574b9f',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
      borderBottomColor: '#574b9f',
    },
  },
})

export default Regist
