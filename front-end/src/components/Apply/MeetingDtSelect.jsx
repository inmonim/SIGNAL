import React, { useState } from 'react'
import MeetingDtCalendar from './MeetingDtCalendar'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cancleButton from '../../assets/image/x.png'
import '../../assets/styles/Calendar.css'
import moment from 'moment'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import 'moment/locale/ko'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
}

const cancleButtonStyle = {
  width: ' 40px',
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
}

const CommonButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  borderRadius: '8px',
  border: '1px solid white',
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
    border: '1px solid #574b9f',
    cursor: 'pointer',
  },
  width: '100%',
}))

const selectedTimeStyle = {
  textAlign: 'center',
  margin: '5px',
}

function meetingDtSelet(props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <CssVarsProvider>
      <div>
        <CommonButton onClick={handleOpen}>시간선택</CommonButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
              미팅 시간 선택
            </Typography>
            <img src={cancleButton} alt="plusButton" style={cancleButtonStyle} onClick={handleClose} />

            <MeetingDtCalendar
              close={handleClose}
              meetingList={props.meetingList}
              onChange={props.onChange}
            ></MeetingDtCalendar>
          </Box>
        </Modal>
        <div style={selectedTimeStyle}>{props.meeting === '' ? '' : ` ${moment(props.meeting).format('LLL')}시`}</div>
      </div>
    </CssVarsProvider>
  )
}
export default meetingDtSelet
