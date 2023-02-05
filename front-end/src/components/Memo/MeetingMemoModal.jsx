import React, { useEffect, useState } from 'react'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { Modal, Box, Typography } from '@mui/material'
import cancleButton from '../../assets/image/x.png'
import api from 'api/Api'

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
}

function MeetingMemoModal({ open, close }) {
  // const [open, setOpen] = useState(false)
  const [memo, setMemo] = useState('')

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + '/apply/memo/' + 1).then((res) => {
      setMemo(res.data.body.content)
    })
  }, [])

  return (
    <CssVarsProvider>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            사전 미팅 메모
          </Typography>
          <img src={cancleButton} alt="plusButton" style={cancleButtonStyle} onClick={close} />
          <Box sx={innerStlye}>
            <div>{memo}</div>
          </Box>
        </Box>
      </Modal>
    </CssVarsProvider>
  )
}

export default MeetingMemoModal
