import React from 'react'
// import Box from '@mui/material/Box'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'

function AlertFindEmail({ open, onClick, msg, name }) {
  return (
    <Dialog hideBackdrop open={open}>
      <DialogContent>
        <div>
          <span style={{ color: '#463C7F' }}>{name}</span> 회원님의 이메일은
        </div>
        <div>{msg}</div>
        <div>입니다.</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClick}>확인</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertFindEmail
