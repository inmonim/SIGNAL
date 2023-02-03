import React, { useState } from 'react'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import { Button, Modal, Box, Typography } from '@mui/material'
import cancleButton from '../../assets/image/x.png'
import ArticleIcon from '@mui/icons-material/Article'
import api from 'api/Api.js'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  backgroundColor: '#DDDBEC',
  borderRadius: 8,
  p: 4,
}

const cancleButtonStyle = {
  width: ' 40px',
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
}

const innerStlye = {
  height: 300,
  backgroundColor: '#ffffff',
  mt: 2,
  borderRadius: 2,
  px: 3,
  py: 3,
  fontSize: '20px',
}

const ImageButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
  },
}))

function MemoModal(props) {
  const [open, setOpen] = useState(false)
  const [memo, setMemo] = useState('')
  const memoFetch = async () => {
    try {
      const res = await api.get(process.env.REACT_APP_API_URL + '/apply/memo/' + props.applySeq)
      setMemo(res.data.body.memo)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = () => {
    setOpen(true)
    memoFetch()
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <CssVarsProvider>
      <ImageButton onClick={handleOpen} startIcon={<ArticleIcon />}>
        메모
      </ImageButton>
      <Modal open={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            사전 미팅 메모
          </Typography>
          <img src={cancleButton} alt="plusButton" onClick={handleClose} style={cancleButtonStyle} />
          <Box sx={innerStlye}>
            <div>{memo}</div>
          </Box>
        </Box>
      </Modal>
    </CssVarsProvider>
  )
}

export default MemoModal
