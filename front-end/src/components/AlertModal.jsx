import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions, styled } from '@mui/material'
import cancleButton from 'assets/image/x.png'

const ComfirmButton = styled(Button)(({ theme }) => ({
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

function AlertModal({ open, onClick, onClose, msg }) {
  return (
    <Dialog open={open} className="cancle-section" hideBackdrop sx={{ style }}>
      <DialogTitle className="cancle-title">{msg}</DialogTitle>
      <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={onClose} />
      <DialogActions className="delete-button">
        <ComfirmButton onClick={onClick}>예</ComfirmButton>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
