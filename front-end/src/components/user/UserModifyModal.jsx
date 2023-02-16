import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import { PatternFormat } from 'react-number-format'
import SignalBtn from 'components/common/SignalBtn'
import AlertModal from 'components/AlertModal'
import closeBtn from 'assets/image/x.png'
import 'assets/styles/profile/usermodify.css'
import api from 'api/Api'

function UserModifyModal({ open, onClose }) {
  const [inputs, setInputs] = useState([])
  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [fileImage, setFileImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const fileInput = React.useRef(null)

  const handleToAlert = () => {
    setAlertOpen(true)
  }

  const handleToProfile = async () => {
    console.log(inputs.nickname)
    console.log(inputs.phone)

    const formData = new FormData()
    formData.append('profileImageFile ', fileImage)
    formData.append('nickname ', inputs.nickname)
    formData.append('phone ', inputs.phone)
    console.log(formData)
    console.log(JSON.stringify(formData))
    console.log(fileImage)
    console.log(JSON.stringify(fileImage))
    await api
      .post(process.env.REACT_APP_API_URL + '/user/' + data.userSeq, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('.', res)
        sessionStorage.setItem('nickname', inputs.nickname)
      })

    setAlertOpen(false)
    onClose(onClose(true))
    window.location.reload()
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
  const handleButtonClick = (e) => {
    fileInput.current.click()
  }
  const handleChange = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setFileImage(e.target.files[0])
  }

  const userModifyFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/user/' + sessionStorage.getItem('userSeq')).then((res) => {
        setData(res.data.body)
        setInputs(res.data.body)
        setImageUrl(process.env.REACT_APP_API_URL + res.data.body.userImageUrl)
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
              <img className="user-modify-img" src={imageUrl} alt="" />
              <div className="user-modify-img-hover" onClick={handleButtonClick}>
                이미지 선택
              </div>
              <input type="file" ref={fileInput} accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
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
