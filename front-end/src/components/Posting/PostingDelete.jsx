import React, { useState } from 'react'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import CancelIcon from '@mui/icons-material/Cancel'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import cancleButton from '../../assets/image/x.png'
import '../../assets/styles/applyDetail.css'
import { useNavigate } from 'react-router-dom'
import api from 'api/Api'

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
  position: 'static',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
  },
}))

function PostingDelete({ postingSeq }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleApplyDelete = async () => {
    try {
      await api.delete(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      navigate('/posting')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CssVarsProvider>
      <CancleButton variant="contained" startIcon={<CancelIcon />} onClick={handleOpen} style={{ marginLeft: '10px' }}>
        공고 취소
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
            공고를 취소하시겠습니까?
          </DialogTitle>
          <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleClose} />
          <DialogActions className="apply-delete-button" onClick={handleApplyDelete}>
            <DeleteButton>삭제</DeleteButton>
          </DialogActions>
        </div>
      </Dialog>
    </CssVarsProvider>
  )
}

export default PostingDelete
