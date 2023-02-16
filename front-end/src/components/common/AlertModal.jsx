import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, styled } from '@mui/material'
import cancelButton from 'assets/image/x.png'
import 'assets/styles/alertmodal.css'

const ComfirmButton = styled(Button)(() => ({
  backgroundColor: '#fff',
  color: '#574B9F',
  borderColor: '#574B9F',
  border: '1px solid',
  height: 30,
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}))

function AlertModal({ open, onClick, onClose, msg }) {
  return (
    <Dialog open={open} className="cancle-section" hideBackdrop={false} onClose={onClose}>
      <DialogTitle className="cancle-title">{msg}</DialogTitle>
      <img src={cancelButton} alt="cancelButton" className="cancle-button" onClick={onClose} />
      <DialogActions className="delete-button">
        <ComfirmButton onClick={onClick}>예</ComfirmButton>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
