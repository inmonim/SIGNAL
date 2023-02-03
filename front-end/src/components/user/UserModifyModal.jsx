import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import { PatternFormat } from 'react-number-format'
import SignalBtn from 'components/common/SignalBtn'
import AlertModal from 'components/AlertModal'
import closeBtn from 'assets/image/x.png'
import ProfileImg from 'assets/image/profileimg2.jpeg'
import 'assets/styles/profile/usermodify.css'
import axios from 'axios'

function UserModifyModal({ open, onClose }) {
  const [inputs, setInputs] = useState({
    nickname: '',
    phone: '',
  })
  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState('')

  const handleToAlert = () => {
    setAlertOpen(true)
  }

  const handleToProfile = () => {
    setAlertOpen(false)
    onClose(onClose(true))
  }

  const handleToClose = () => {
    setAlertOpen(false)
    onClose(true)
  }
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
  }

  const userModifyFetch = async () => {
    try {
      await axios.get(process.env.REACT_APP_API_URL + '/user/' + sessionStorage.getItem('userSeq')).then((res) => {
        setData(res.data.body)
        console.log(res.data.body)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    userModifyFetch()
  }, [])

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
                bottom: '90%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div className="user-modify-main">
            <div className="user-modify-title">회원정보 수정</div>
            <div className="user-modify-img-container">
              <img className="user-modify-img" src={ProfileImg} alt="" />
              <div className="user-modify-img-hover">이미지 선택</div>
            </div>
            <div className="user-modify-input-container">
              <div className="user-modify-input">
                <label className="user-modify-input-label">Nickname</label>
                <TextField
                  id="filled-multiline-flexible"
                  defaultValue={data.nickname}
                  name="nickname"
                  sx={inputStyle}
                  onChange={handleInput}
                />
              </div>
              <div className="user-modify-input">
                <label className="user-modify-input-label">Phone Number</label>
                <PatternFormat
                  format="###-####-####"
                  customInput={TextField}
                  defaultValue={data.phone}
                  name="phone"
                  sx={inputStyle}
                  onChange={handleInput}
                ></PatternFormat>
              </div>
            </div>
            <SignalBtn
              sigwidth="100px"
              sigheight="50px"
              sigfontsize="24px"
              sigborderradius={15}
              sigmargin="auto"
              onClick={handleToAlert}
            >
              수정하기
            </SignalBtn>
            <AlertModal
              msg="수정하시겠습니까?"
              open={alertOpen}
              onClick={handleToProfile}
              onClose={handleToClose}
            ></AlertModal>
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  width: 807,
  height: 650,
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
  width: '449px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

export default UserModifyModal
