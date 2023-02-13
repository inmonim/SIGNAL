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
  // const [open, setOpen] = useState(false)

  const [memo, setMemo] = useState('')
  console.log(typeof applySeq)

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + '/apply/memo/' + applySeq).then((res) => {
      setMemo(res.data.body.memo)
    })
    console.log('메모 get')
  }, [open])

  // const handleClose = () => {
  //   console.log('닫는다')
  //   close()
  // }

  const handleClose = async () => {
    try {
      await api.put(process.env.REACT_APP_API_URL + '/apply/memo', {
        applySeq,
        memo,
      })
      console.log('메모 변경')
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
          {/* <div>{memo}</div> */}
          <textarea
            cols="10"
            rows="15"
            onChange={(e) => setMemo(e.target.value)}
            className="before-meeting-memo-content"
            value={memo}
            style={{
              width: '100%',
              // '::-webkit-scrollbar': {
              //   width: '50px',
              // },
              // '::-webkit-scrollbar-thumb': {
              //   backgroundColor: '#9A93C5',
              //   borderRadius: '10px',
              //   backgroundClip: 'padding-box',
              //   border: '2px solid transparent',
              // },
            }}
          />
        </Box>
      </Box>
    </Modal>
  )
}

export default MeetingMemoModal
