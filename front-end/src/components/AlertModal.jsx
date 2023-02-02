import React from 'react'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'

function AlertModal({ open, onClick, msg, name }) {
  return (
    <Dialog hideBackdrop open={open}>
      <DialogContent>{msg}</DialogContent>
      {/* <DialogContent>
        <div>{name} 회원님의 이메일은</div>
        <div>{msg}</div>
        <div>입니다.</div>
      </DialogContent> */}
      <DialogActions>
        <Button onClick={onClick}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal
