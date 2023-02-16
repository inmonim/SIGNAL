import React, { useEffect, useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import heart from 'assets/image/heart.png'
import HeartDetailModal from '../common/HeartDetailModal'
import UserModifyModal from 'components/user/UserModifyModal'
import UserPwdModal from 'components/user/UserPwdModal'
import AlertModal from 'components/AlertModal'
import { useNavigate } from 'react-router-dom'
import api from 'api/Api'

function UserInfo() {
  const [userInfo, setUserInfo] = useState([])
  const [userModifyOpen, setUserModifyOpen] = useState(false)
  const handleToModify = () => {
    setUserModifyOpen(true)
  }
  const handleModifyClose = () => {
    setUserModifyOpen(false)
  }
  const [userPwdOpen, setUserPwdOpen] = useState(false)
  const handleToPwd = () => {
    setUserPwdOpen(true)
  }

  const [alertOpen, setAlertOpen] = useState(false)
  const navigate = useNavigate()

  const handleToOut = () => {
    setAlertOpen(true)
  }

  const handleToClose = () => {
    setAlertOpen(false)
    setUserPwdOpen(false)
    setHeartOpen(false)
    getHeartCnt()
  }

  const [heartOpen, setHeartOpen] = useState(false)
  const handleToHeart = () => {
    setHeartOpen(true)
  }

  const handleToMain = async () => {
    const userSeq = sessionStorage.getItem('userSeq')
    setAlertOpen(false)
    try {
      await api
        .delete(process.env.REACT_APP_API_URL + '/user/' + userSeq)
        .then((res) => {
          sessionStorage.removeItem('accessToken')
          sessionStorage.removeItem('refreshToken')
          sessionStorage.removeItem('userEmail')
          sessionStorage.removeItem('username')
          sessionStorage.removeItem('userSeq')
          console.log(res)
          navigate('/')
          window.location.reload()
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const userFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/user/' + sessionStorage.getItem('userSeq')).then((res) => {
        setUserInfo(res.data.body)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const [heartCnt, setHeartCnt] = useState(0)
  const getHeartCnt = async () => {
    await api
      .get(process.env.REACT_APP_API_URL + '/profile/heartCnt/' + sessionStorage.getItem('userSeq'))
      .then((res) => {
        setHeartCnt(res.data.body)
      })
  }

  useEffect(() => {
    userFetch()
    getHeartCnt()
  }, [])

  return (
    <div className="my-user">
      <img className="my-user-img" src={process.env.REACT_APP_API_URL + userInfo.userImageUrl} alt="" />
      <div className="my-user-info">
        <div className="my-user-nickname">{userInfo.nickname}</div>
        <div className="my-user-email">{userInfo.email}</div>
      </div>
      <div className="my-user-heart" onClick={handleToHeart}>
        <img className="my-user-heart-img" src={heart} alt="" />
        <div className="my-user-heart-cnt">{heartCnt}</div>
      </div>
      <HeartDetailModal open={heartOpen} onClose={handleToClose} mode="user"></HeartDetailModal>
      <div className="my-user-btn">
        <SignalBtn
          className="my-user-btn-modify"
          sigwidth="120px"
          sigheight="38px"
          sigfontsize="19px"
          sigborderradius={24}
          onClick={handleToModify}
        >
          회원정보 수정
        </SignalBtn>
        <UserModifyModal open={userModifyOpen} onClose={handleModifyClose}></UserModifyModal>
        <SignalBtn
          className="my-user-btn-pwd"
          sigwidth="120px"
          sigheight="38px"
          sigfontsize="19px"
          sigborderradius={24}
          sx={userModifyStyle}
          onClick={handleToPwd}
        >
          비밀번호 변경
        </SignalBtn>
        <UserPwdModal open={userPwdOpen} onClose={handleToClose}></UserPwdModal>
        <SignalBtn
          className="my-user-btn-delete"
          sigwidth="120px"
          sigheight="38px"
          sigfontsize="19px"
          sigborderradius={24}
          sx={userDeleteStyle}
          onClick={handleToOut}
        >
          회원 탈퇴
        </SignalBtn>
        <AlertModal
          msg="탈퇴하시겠습니까?"
          open={alertOpen}
          onClick={handleToMain}
          onClose={handleToClose}
        ></AlertModal>
      </div>
    </div>
  )
}

const userModifyStyle = {
  backgroundColor: '#fff',
  color: '#574B9F',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}

const userDeleteStyle = {
  backgroundColor: '#ff0000',
  color: '#fff',
  border: '1px solid #ff0000',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#ff0000',
  },
}

export default UserInfo
