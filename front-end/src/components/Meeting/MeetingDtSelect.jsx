import React, { useState } from 'react'
import MeetingDtCalendar from './MeetingDtCalendar'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import cancleButton from '../../assets/image/x.png'
import '../../assets/styles/Calendar.css'
import moment from 'moment'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import 'moment/locale/ko'
import SignalBtn from 'components/common/SignalBtn'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
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
        <SignalBtn onClick={handleOpen} style={{ width: '300px' }}>
          시간선택
        </SignalBtn>
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
        <div style={selectedTimeStyle}>
          {props.meetingList && props.meetingSeq
            ? props.meetingList.filter((item) => {
                return item.postingMeetingSeq + '' === props.meetingSeq
              })[0]
              ? `${moment(
                  props.meetingList.filter((item) => {
                    return item.postingMeetingSeq + '' === props.meetingSeq
                  })[0].meetingDt
                ).format('YYYY-MM-DD HH')}시`
              : ''
            : ''}
        </div>
      </div>
    </CssVarsProvider>
  )
}
export default meetingDtSelet
