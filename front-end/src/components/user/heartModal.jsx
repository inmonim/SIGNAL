import React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import closeBtn from 'assets/image/x.png'
import heart from 'assets/image/heart.png'
import 'assets/styles/profile/heart.css'
import SignalBtn from 'components/common/SignalBtn'
import { TextField } from '@mui/material'

function heartModal({ open, onClose, cnt }) {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="close">
            <img
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '90%',
                bottom: '80%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div className="user-heart-modal-container">
            <div className="my-user-heart-modal-top">
              <div className="my-user-heart-modal">
                <img className="my-user-heart-modal-img" src={heart} alt="" />
                <div className="my-user-heart-modal-cnt">{cnt}</div>
              </div>
              <div className="my-user-heart-modal-charge">
                <TextField id="filled-multiline-flexible" name="nickname" sx={inputStyle} />
                <SignalBtn
                  sigwidth="80px"
                  sigheight="40px"
                  sigmargin="10px"
                  sigfontsize="27px"
                  sigborderradius={15}
                  sx={heartChargeStyle}
                >
                  충전
                </SignalBtn>
              </div>
            </div>
            <div className="my-user-heart-modal-bottom-container">
              <div className="my-user-heart-modal-bottom-title">사용내역</div>
              <div className="my-user-heart-modal-bottom">
                <div className="my-user-heart-modal-bottom-content">
                  <div className="my-user-heart-modal-content-left">프로젝트 시작</div>
                  <div className="my-user-heart-modal-content-right">-100</div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  width: 707,
  height: 550,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '100px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

const heartChargeStyle = {
  backgroundColor: '#fff',
  color: '#574B9F',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}

export default heartModal
