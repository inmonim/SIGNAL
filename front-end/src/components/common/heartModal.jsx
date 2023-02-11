import React, { useEffect, useState } from 'react'
import api from 'api/Api.js'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import closeBtn from 'assets/image/x.png'
import heart from 'assets/image/heart.png'
import 'assets/styles/profile/heart.css'
import SignalBtn from 'components/common/SignalBtn'
import { TextField } from '@mui/material'
import AlertModal from 'components/AlertModal'

function heartModal({ open, onClose, mode, projectSeq }) {
  const userSeq = sessionStorage.getItem('userSeq')

  const [userCnt, setUserCnt] = useState(0)
  const getUserHeartCnt = async () => {
    await api.get(process.env.REACT_APP_API_URL + '/profile/heartCnt/' + userSeq).then((res) => {
      setUserCnt(res.data.body)
    })
  }

  const [userHeartLog, setUserHeartLog] = useState([])
  const getUserHeartLog = async () => {
    await api.get(process.env.REACT_APP_API_URL + '/profile/heart/' + userSeq).then((res) => {
      console.log(res.data.body)
      setUserHeartLog(res.data.body.heartLogList)
    })
  }

  // const [projectCnt, setProjectCnt] = useState(0)
  // const getProjectHeartCnt = async () => {
  //   await api.get(process.env.REACT_APP_API_URL + '/project/heartCnt/' + userSeq, projectSeq).then((res) => {
  //     setProjectCnt(res.data.body)
  //   })
  // }

  // const [projectHeartLog, setProjectHeartLog] = useState([])
  // const getProjectHeartLog = async () => {
  //   await api.get(process.env.REACT_APP_API_URL + '/project/heart/' + userSeq, projectSeq).then((res) => {
  //     console.log(res.data.body)
  //     setProjectHeartLog(res.data.body.heartLogList)
  //   })
  // }

  // mode === 'user'
  //   ?
  useEffect(() => {
    getUserHeartCnt()
    getUserHeartLog()
  }, [])
  // : useEffect(() => {
  //     getProjectHeartCnt()
  //     getProjectHeartLog()
  //   }, [])

  // 하트 충전
  const [inputHeart, setInputHeart] = useState(0)
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleToClose = () => setAlertOpen(false)
  const handleInputHeart = (e) => {
    setInputHeart(e.target.value)
  }
  const chargeHeart = async () => {
    setAlertOpen(false)
    await api
      .post(process.env.REACT_APP_API_URL + '/profile/heart/' + userSeq, {
        heartCnt: parseInt(inputHeart),
      })
      .then(() => {
        getUserHeartCnt()
        getUserHeartLog()
      })
      .catch((e) => {
        return e.message
      })
  }

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
                {/* {mode === 'user' ? ( */}
                <div className="my-user-heart-modal-cnt">{userCnt}</div>
                {/* ) : (
                  <div className="my-user-heart-modal-cnt">{projectCnt}</div>
                )} */}
              </div>
              {mode === 'user' ? (
                <div className="my-user-heart-modal-charge">
                  <TextField
                    id="filled-multiline-flexible"
                    name="nickname"
                    onChange={handleInputHeart}
                    sx={inputStyle}
                  />
                  <SignalBtn
                    sigwidth="80px"
                    sigheight="40px"
                    sigmargin="10px"
                    sigfontsize="27px"
                    sigborderradius={15}
                    sx={heartChargeStyle}
                    onClick={handleAlertOpen}
                  >
                    충전
                  </SignalBtn>
                  <AlertModal
                    open={alertOpen}
                    onClick={chargeHeart}
                    onClose={handleToClose}
                    msg="충전하시겠습니까?"
                  ></AlertModal>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="my-user-heart-modal-bottom-container">
              <div className="my-user-heart-modal-bottom-title">사용내역</div>
              <div className="my-user-heart-modal-bottom">
                {/* {mode === 'user'
                  ?  */}
                {userHeartLog.map((item, index) => (
                  <div key={index} className="my-user-heart-modal-bottom-content">
                    <div className="my-user-heart-modal-content-left">{item.content}</div>
                    <div className="my-user-heart-modal-content-right">{item.heartCnt}</div>
                  </div>
                ))}
                {/* : projectHeartLog.map((item, index) => (
                      <div key={index} className="my-user-heart-modal-bottom-content">
                        <div className="my-user-heart-modal-content-left">{item.content}</div>
                        <div className="my-user-heart-modal-content-right">{item.heartCnt}</div>
                      </div>
                    ))} */}
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
