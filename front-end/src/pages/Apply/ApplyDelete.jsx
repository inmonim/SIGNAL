import React, { useState } from 'react'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import cancleButton from '../../assets/image/x.png'
import '../../assets/styles/applyDetail.css'
// import axios from 'axios'

const CancleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF4242',
  color: theme.vars.palette.common.white,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#FF4242',
  },
}))

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.common.white,
  color: '#574B9F',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
  },
}))

export default function ApplyDelete() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleApplyDelete = async () => {
    console.log('지원서 삭제')
    // 지원서 삭제 axios //
    // try {
    //   await axios.delete('http://www.ssafysignal.site:8080/apply/1')
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <CssVarsProvider>
      <CancleButton variant="contained" startIcon={<CancelIcon />} onClick={handleOpen}>
        지원 취소
      </CancleButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="cancle-section"
      >
        <div>
          <DialogTitle id="alert-dialog-title" className="cancle-title">
            지원을 취소하시겠습니까?
          </DialogTitle>
          <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleClose} />
          <DialogActions className="delete-button">
            <DeleteButton onClick={handleApplyDelete}>삭제</DeleteButton>
          </DialogActions>
        </div>
      </Dialog>
    </CssVarsProvider>
  )
}
