import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import cancleButton from '../../assets/image/x.png'

const MeetingButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF4242',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#FF4242',
  },
}))

const ComfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.common.white,
  color: '#574B9F',
  borderColor: '#574B9F',
  border: '1px solid',
  height: 30,
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
    borderColor: theme.vars.palette.common.white,
  },
}))

function MeetingConfirmModal() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    console.log('meeting')
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    console.log('meeting')
    console.log(open)
  }
  return (
    <CssVarsProvider>
      <MeetingButton onClick={handleOpen}>사전미팅참가</MeetingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="cancle-section"
      >
        <div>
          <DialogTitle id="alert-dialog-title" className="cancle-title">
            입장 하시겠습니까?
          </DialogTitle>
          <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleClose} />
          <DialogActions className="delete-button">
            <ComfirmButton>예</ComfirmButton>
          </DialogActions>
        </div>
      </Dialog>
    </CssVarsProvider>
  )
}
export default MeetingConfirmModal
