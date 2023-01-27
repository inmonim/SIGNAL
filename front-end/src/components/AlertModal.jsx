import React from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'

function AlertModal({ open, onClick, msg }) {
  return (
    <Dialog hideBackdrop open={open}>
      <DialogContent>{msg}</DialogContent>
      <DialogActions>
        <Button onClick={onClick}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
