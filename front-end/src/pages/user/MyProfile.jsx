import React, { useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/profile/myprofile.css'
import ProfileImg from 'assets/image/profileimg2.jpeg'
import plusbtn from 'assets/image/plusButton.png'
import heart from 'assets/image/heart.png'
import UserModifyModal from 'components/user/UserModifyModal'
import UserPwdModal from 'components/user/UserPwdModal'
import AlertModal from 'components/AlertModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Chip from '@mui/material/Chip'

function MyProfile() {
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
  const handlePwdClose = () => {
    setUserPwdOpen(false)
  }

  const [alertOpen, setAlertOpen] = useState('')
  const navigate = useNavigate()

  const handleToOut = () => {
    setAlertOpen(true)
  }

  const handleToClose = () => {
    setAlertOpen(close)
  }

  const handleToMain = () => {
    const userSeq = sessionStorage.getItem('userSeq')
    setAlertOpen(false)
    try {
      axios
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
  return (
    <div className="my-container">
      <div className="my-main">
        <div className="my-user">
          <img className="my-user-img" src={ProfileImg} alt="" />
          <div className="my-user-info">
            <div className="my-user-nickname">{sessionStorage.getItem('username')}</div>
            <div className="my-user-email">{sessionStorage.getItem('userEmail')}</div>
          </div>
          <div className="my-user-heart">
            <img className="my-user-heart-img" src={heart} alt="" />
            <div className="my-user-heart-cnt">100</div>
          </div>
          <div className="my-user-btn">
            <SignalBtn
              className="my-user-btn-modify"
              sigwidth="100px"
              sigheight="28px"
              sigfontsize="15px"
              sigborderradius={24}
              onClick={handleToModify}
            >
              회원정보 수정
            </SignalBtn>
            <UserModifyModal open={userModifyOpen} onClose={handleModifyClose}></UserModifyModal>
            <SignalBtn
              className="my-user-btn-pwd"
              sigwidth="100px"
              sigheight="28px"
              sigfontsize="15px"
              sigborderradius={24}
              sx={userModifyStyle}
              onClick={handleToPwd}
            >
              비밀번호 변경
            </SignalBtn>
            <UserPwdModal open={userPwdOpen} onClose={handlePwdClose}></UserPwdModal>
            <SignalBtn
              className="my-user-btn-delete"
              sigwidth="100px"
              sigheight="28px"
              sigfontsize="15px"
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
        <div className="my-profile">
          <div className="my-profile-container">
            <div className="my-profile-four">
              <div className="my-profile-top">
                <div className="my-profile-top-position">
                  <div className="my-profile-plus-btn">
                    <img className="my-profile-plus-btn-img" src={plusbtn} alt="" />
                  </div>
                  <div className="my-profile-top-position-title">포지션</div>
                  <div>
                    <Chip label="FrontEnd" variant="outlined" sx={{ fontSize: '20px' }} />
                  </div>
                </div>
                <div className="my-profile-top-skill">
                  <div className="my-profile-plus-btn">
                    <img className="my-profile-plus-btn-img" src={plusbtn} alt="" />
                  </div>
                  <div className="my-profile-top-skill-title">스킬</div>
                </div>
              </div>
              <div className="my-profile-bottom">
                <div className="my-profile-bottom-exp">
                  <div className="my-profile-plus-btn">
                    <img className="my-profile-plus-btn-img" src={plusbtn} alt="" />
                  </div>
                  <div className="my-profile-bottom-exp-title">경험</div>
                </div>
                <div className="my-profile-bottom-career">
                  <div className="my-profile-plus-btn">
                    <img className="my-profile-plus-btn-img" src={plusbtn} alt="" />
                  </div>
                  <div className="my-profile-bottom-career-title">경력</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-posting-list"></div>
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

export default MyProfile
