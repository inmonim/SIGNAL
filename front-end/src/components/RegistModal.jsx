import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import 'assets/font/font.css'
import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'
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

const listStyle = {
  textAlign: 'center',
  overflow: 'scroll',
  maxHeight: '525px',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '10px',
  scrollbarColor: '#574B9F',
}

const SignalBtn = styled(Btn)(({ theme }) => ({
  backgroundColor: '#574B9F',
  width: '173px',
  height: '90px',
  fontSize: '40px',
  border: '1px solid #574B9F',
  borderRadius: 25,
  boxShadow: '0px 4px 7px rgba(0,0,0,0.25)',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '1px solid #574B9F',
    color: '#574B9F',
  },
}))

function RegistModal({ open, onClose }) {
  const [value, setValue] = useState(null)
  const [alertOpen, setAlertOpen] = useState(false)

  const handleAlertOpen = () => {
    setAlertOpen(true)
  }
  const handleToLogin = () => {
    setAlertOpen(false)
    onClose(onClose(true))
  }

  return (
    <>
      <Modal hideBackdrop open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
        <Box sx={style}>
          <form id="formElem" onSubmit={handleAlertOpen}>
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
              <TextField id="filled-multiline-flexible" label="E-mail" name="email" multiline sx={inputStyle} />
              <TextField id="filled-multiline-flexible" label="Password" name="password" multiline sx={inputStyle} />
              <TextField id="filled-multiline-flexible" label="Password Check" multiline sx={inputStyle} />
              <TextField id="filled-multiline-flexible" label="Name" name="name" multiline sx={inputStyle} />
              <TextField id="filled-multiline-flexible" label="Nickname" name="nickname" multiline sx={inputStyle} />
              <PatternFormat
                format="### - #### - ####"
                customInput={TextField}
                label="Phone Number"
                name="phone"
                sx={inputStyle}
              ></PatternFormat>
              {/* <TextField id="filled-multiline-flexible" label="PhoneNumber ( 010-0000-0000 )" multiline sx={inputStyle} /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth"
                  name="birth"
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
              <SignalBtn variant="contained" onClick={handleAlertOpen}>
                회원가입
              </SignalBtn>
              <AlertModal open={alertOpen} onClick={handleToLogin}></AlertModal>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default RegistModal
