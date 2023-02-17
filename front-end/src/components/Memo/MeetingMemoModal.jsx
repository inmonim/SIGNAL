import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import cancleButton from '../../assets/image/x.png'
import api from 'api/Api'

const style = {
  position: 'absolute',
  top: '67%',
  left: '83.5%',
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

function MeetingMemoModal({ open, onClose, applySeq }) {
  const [memo, setMemo] = useState('')

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + '/apply/memo/' + applySeq).then((res) => {
      setMemo(res.data.body.memo)
    })
  }, [open])

  const handleClose = async () => {
    try {
      await api.put(process.env.REACT_APP_API_URL + '/apply/memo', {
        applySeq,
        memo,
      })
    } catch (error) {
      console.log(error)
    }
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} hideBackdrop={true}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
          사전 미팅 메모
        </Typography>
        <img src={cancleButton} alt="plusButton" style={cancleButtonStyle} onClick={handleClose} />
        <Box sx={innerStlye}>
          <textarea
            cols="10"
            rows="15"
            onChange={(e) => setMemo(e.target.value)}
            className="before-meeting-memo-content"
            value={memo}
            style={{
              width: '100%',
            }}
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default MeetingMemoModal
