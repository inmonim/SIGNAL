import React from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'

function AlertModal({ open, onClick }) {
  return (
    <Dialog hideBackdrop open={open}>
      <DialogContent>인증메일이 전송되었습니다.</DialogContent>
      <DialogActions>
        <Button onClick={onClick}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
