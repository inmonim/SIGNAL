import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import AlertModal from 'components/AlertModal'
import 'assets/styles/profile/userpwd.css'
import SignalBtn from 'components/common/SignalBtn'
import closeBtn from 'assets/image/x.png'
import api from 'api/Api'

function UserPwdModal({ open, onClose }) {
  const [inputs, setInputs] = useState({
    password: '',
    newpwd: '',
    newpwdcheck: '',
  })
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    console.log(nextInputs)
  }

  const [alertOpen, setAlertOpen] = useState(false)

  const handleToAlert = () => {
    setAlertOpen(true)
  }

  const handleToProfile = async () => {
    // 비밀번호 유효성 검사
    await api
      .put(
        process.env.REACT_APP_API_URL + '/user/password/' + sessionStorage.getItem('userSeq'),
        JSON.stringify({
          password: inputs.password,
          newPassword: inputs.newpwd,
        })
      )
      .then((res) => {
        console.log(res.data)
      })
    setAlertOpen(false)
    onClose(true)
    window.location.reload()
  }

  const handleToClose = () => {
    setAlertOpen(false)
    onClose(true)
  }
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="close">
            <img
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '90%',
                bottom: '85%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div className="user-pwd-main">
            <div className="user-pwd-title">비밀번호 변경</div>
            <div className="user-pwd-input-container">
              <div className="user-pwd-input">
                <TextField
                  id="filled-multiline-flexible"
                  name="password"
                  label="현재 비밀번호"
                  sx={inputStyle}
                  onChange={handleInput}
                />
              </div>
              <div className="user-pwd-input">
                <TextField
                  id="filled-multiline-flexible"
                  name="newpwd"
                  label="새 비밀번호"
                  sx={inputStyle}
                  onChange={handleInput}
                />
              </div>
              <div className="user-pwd-input">
                <TextField
                  id="filled-multiline-flexible"
                  name="newpwdcheck"
                  label="새 비밀번호 확인"
                  sx={inputStyle}
                  onChange={handleInput}
                />
              </div>
            </div>
            <SignalBtn
              sigwidth="100px"
              sigheight="50px"
              sigfontsize="24px"
              sigborderradius={15}
              sigmargin="auto"
              onClick={handleToAlert}
            >
              변경하기
            </SignalBtn>
            <AlertModal
              msg="변경하시겠습니까?"
              open={alertOpen}
              onClick={handleToProfile}
              onClose={handleToClose}
            ></AlertModal>
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  width: 707,
  height: 500,
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
  justifyContent: 'center',
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '500px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

export default UserPwdModal
