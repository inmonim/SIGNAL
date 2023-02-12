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
  const [inputHeart, setInputHeart] = useState(0)
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleToClose = () => setAlertOpen(false)
  const handleInputHeart = (e) => {
    setInputHeart(e.target.value)
  }
  const chargeHeart = async () => {
    kakaoPay(inputHeart)
    setAlertOpen(false)
    // await api
    //   .post(process.env.REACT_APP_API_URL + '/profile/heart/' + userSeq, {
    //     heartCnt: parseInt(inputHeart),
    //   })
    //   .then(() => {
    //     getUserHeartCnt()
    //     getUserHeartLog()
    //   })
    //   .catch((e) => {
    //     return e.message
    //   })
  }

  const [payState, setPayState] = useState({
    // 응답에서 가져올 값들
    next_redirect_pc_url: '',
    tid: '',
    // 요청에 넘겨줄 매개변수들
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: '1',
      partner_user_id: '1',
      item_name: '시그널하트',
      quantity: 1,
      total_amount: 100,
      tax_free_amount: 0,
      approval_url: 'https://www.ssafysignal.site/kakaoPay',
      fail_url: 'https://www.ssafysignal.site/kakaoPay',
      cancel_url: 'https://www.ssafysignal.site/kakaoPay',
    },
  })

  const kakaoPay = (heartCnt) => {
    const { params } = payState

    params.total_amount *= heartCnt

    console.log(params)

    axios({
      url: '/v1/payment/ready',
      // 결제 준비 API는 POST 메소드라고 한다.
      method: 'POST',
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        Authorization: 'KakaoAK ef29e9bc7f62d89ff3128aa5ce609d77',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      // 설정한 매개변수들
      params,
    }).then((response) => {
      // 응답에서 필요한 data만 뽑는다.
      const nextRedirectPcUrl = response.data.next_redirect_pc_url
      const tid = response.data.tid

      console.log(nextRedirectPcUrl)
      console.log(tid)

      setPayState({ nextRedirectPcUrl, tid })
      window.oepn(nextRedirectPcUrl, '_blank')
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
                {mode === 'user'
                  ? userHeartLog.map((item, index) => (
                      <div key={index} className="my-user-heart-modal-bottom-content">
                        <div className="my-user-heart-modal-content-left">{item.content}</div>
                        <div className="my-user-heart-modal-content-right">{item.heartCnt}</div>
                      </div>
                    ))
                  : projectHeartLog.map((item, index) => (
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

export default heartModal
