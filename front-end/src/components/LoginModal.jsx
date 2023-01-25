import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { FormControlLabel, TextField } from '@mui/material'
// import FormGroup from '@mui/material/FormGroup'
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '549px',
  marginBottom: '38px',
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
    onClose(onClose(true))
  }
  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
        <Box sx={style}>
          <img
            style={{ cursor: 'pointer', position: 'relative', float: 'right' }}
            src={closeBtn}
            alt="closeBtn"
            onClick={onClose}
          />
          <Typography id="modal-title" sx={{ textAlign: 'center', margin: '50px 0px' }}>
            <img style={{ width: '409px', height: '205px' }} src={modalLogo} alt="modalLogo" />
          </Typography>
          <div id="modal-desc" style={{ textAlign: 'center' }}>
            <TextField id="filled-multiline-flexible" label="E-mail" multiline sx={inputStyle} />
            <TextField id="filled-multiline-flexible" label="Password" multiline sx={inputStyle} />
            <FormControlLabel
              style={{ color: '#574b9f' }}
              label="자동로그인"
              control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />}
            />
            <Link>이메일 / 비밀번호 찾기 </Link>
            <div style={{ fontSize: '20px' }}>
              계정이 없으신가요?
              <span
                style={{ margin: '0px 30px', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={handleRegOpen}
              >
                회원가입
              </span>
              <RegistModal open={regOpen} onClose={handleRegClose}></RegistModal>
            </div>
            <div style={{ margin: '30px 0px' }}>
              <SignalBtn variant="contained" onClick={handleToMain}>
                로그인
              </SignalBtn>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LoginModal
