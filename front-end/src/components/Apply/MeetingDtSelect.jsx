import React, { useState } from 'react'
import MeetingDtCalendar from './MeetingDtCalendar'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cancleButton from '../../assets/image/x.png'
import '../../assets/styles/Calendar.css'

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

function meetingDtSelet(meetingList) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    console.log(true)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button className="apply-button" onClick={handleOpen}>
        시간선택
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            미팅 시간 선택
          </Typography>
          <img src={cancleButton} alt="plusButton" style={cancleButtonStyle} onClick={handleClose} />

          <MeetingDtCalendar open={open} meetingList={meetingList.meetingList}></MeetingDtCalendar>
        </Box>
      </Modal>
    </div>
  )
}
export default meetingDtSelet
