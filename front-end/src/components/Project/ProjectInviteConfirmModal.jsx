import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import cancleButton from '../../assets/image/x.png'
import axios from 'axios'

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

function ProjectTeamSelectConfirmModal(props, onChange) {
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTeamSelect = async () => {
    const applySeq = props.props.applySeq
    console.log(applySeq)
    try {
      await axios
        .put(process.env.REACT_APP_API_URL + '/posting/member/' + applySeq + '/?isSelect=true')
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('팀원선택 put')
    } catch (error) {
      console.log(error)
    }
    handleClose()
  }

  return (
    <CssVarsProvider>
      <ComfirmButton onClick={handleOpen}>팀원 선택</ComfirmButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="cancle-section"
      >
        <div>
          <DialogTitle id="alert-dialog-title" className="cancle-title">
            선택 하시겠습니까?
          </DialogTitle>
          <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleClose} />
          <DialogActions className="delete-button">
            <ComfirmButton onClick={handleTeamSelect}>예</ComfirmButton>
          </DialogActions>
        </div>
      </Dialog>
    </CssVarsProvider>
  )
}
export default ProjectTeamSelectConfirmModal
