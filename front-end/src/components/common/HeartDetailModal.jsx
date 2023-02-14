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
import axios from 'axios'

function HeartDetailModal({ open, onClose, mode, projectSeq }) {
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
      setUserHeartLog(res.data.body.heartLogList)
    })
  }

  const [projectCnt, setProjectCnt] = useState(0)
  const getProjectHeartCnt = async () => {
    await api
      .get(process.env.REACT_APP_API_URL + `/project/heartCnt/${userSeq}?projectSeq=${projectSeq}`)
      .then((res) => {
        setProjectCnt(res.data.body)
      })
  }

  const [projectHeartLog, setProjectHeartLog] = useState([])
  const getProjectHeartLog = async () => {
    await api.get(process.env.REACT_APP_API_URL + `/project/heart/${userSeq}?projectSeq=${projectSeq}`).then((res) => {
      setProjectHeartLog(res.data.body.projectUserHeartLogList)
    })
  }

  mode === 'user'
    ? useEffect(() => {
        getUserHeartCnt()
        getUserHeartLog()
      }, [])
    : useEffect(() => {
        getProjectHeartCnt()
        getProjectHeartLog()
      }, [])

  // 하트 충전
  const [inputHeart, setInputHeart] = useState(1)
  const [alertOpen, setAlertOpen] = useState(false)
  const [minusAlert, setMinusAlert] = useState(false)

  const handleAlertOpen = () => setAlertOpen(true)
  const handleToClose = () => {
    setAlertOpen(false)
    setMinusAlert(false)
  }
  const handleInputHeart = (e) => {
    if (e.target.value <= 0) {
      setMinusAlert(true)
    } else {
      setInputHeart(e.target.value)
    }
  }
  const chargeHeart = async () => {
    payReady(inputHeart)
    setAlertOpen(false)
  }

  const [payState, setPayState] = useState({
    // 응답에서 가져올 값들
    next_redirect_pc_url: '',
    tid: '',
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: userSeq,
      partner_user_id: userSeq,
      item_name: '시그널하트',
      quantity: 1,
      total_amount: 100,
      tax_free_amount: 0,
      approval_url: `https://www.ssafysignal.site/myprofile/kakaoPay/success?userSeq=${userSeq}`,
      fail_url: `https://www.ssafysignal.site/myprofile/kakaoPay/fail`,
      cancel_url: `https://www.ssafysignal.site/myprofile/kakaoPay/cancle`,
    },
  })

  const payReady = (heartCnt) => {
    const { params } = payState
    params.total_amount *= heartCnt
    axios({
      url: 'https://kapi.kakao.com/v1/payment/ready',
      method: 'POST',
      headers: {
        Authorization: 'KakaoAK ef29e9bc7f62d89ff3128aa5ce609d77',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    }).then((response) => {
      const nextRedirectPcUrl = response.data.next_redirect_pc_url
      const tid = response.data.tid

      localStorage.setItem('tid', tid)
      setPayState({ nextRedirectPcUrl, tid })
      window.open(nextRedirectPcUrl, '', 'width=500, height=700, scrollbars=yes, resizable=no')
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
                {mode === 'user' ? (
                  <div className="my-user-heart-modal-cnt">{userCnt}</div>
                ) : (
                  <div className="my-user-heart-modal-cnt">{projectCnt}</div>
                )}
              </div>
              {mode === 'user' ? (
                <div className="my-user-heart-modal-charge">
                  <TextField
                    id="filled-multiline-flexible"
                    value={inputHeart}
                    type="number"
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
                  <AlertModal
                    open={minusAlert}
                    onClick={handleToClose}
                    onClose={handleToClose}
                    msg="1개 이상의 하트만 충전 가능합니다."
                  ></AlertModal>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="my-user-heart-modal-bottom-container">
              <div className="my-user-heart-modal-bottom-title">사용내역</div>
              <div className="my-user-heart-modal-bottom">
                {mode === 'user'
                  ? userHeartLog &&
                    userHeartLog.map((item, index) => (
                      <div key={index} className="my-user-heart-modal-bottom-content">
                        <div className="my-user-heart-modal-content-left">{item.content}</div>
                        <div className="my-user-heart-modal-content-right">{item.heartCnt}</div>
                      </div>
                    ))
                  : projectHeartLog &&
                    projectHeartLog.map((item, index) => (
                      <div key={index} className="my-user-heart-modal-bottom-content">
                        <div className="my-user-heart-modal-content-left">{item.content}</div>
                        <div className="my-user-heart-modal-content-right">{item.heartCnt}</div>
                      </div>
                    ))}
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

export default HeartDetailModal
