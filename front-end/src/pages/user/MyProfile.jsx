import React from 'react'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/myprofile.css'
import ProfileImg from 'assets/image/profileimg2.jpeg'
import heart from 'assets/image/heart.png'

function MyProfile() {
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
            >
              회원정보 수정
            </SignalBtn>
            <SignalBtn
              className="my-user-btn-pwd"
              sigwidth="100px"
              sigheight="28px"
              sigfontsize="15px"
              sigborderradius={24}
              sx={userModifyStyle}
            >
              비밀번호 변경
            </SignalBtn>
            <SignalBtn
              className="my-user-btn-delete"
              sigwidth="100px"
              sigheight="28px"
              sigfontsize="15px"
              sigborderradius={24}
              sx={userDeleteStyle}
            >
              회원 탈퇴
            </SignalBtn>
          </div>
        </div>
        <div className="my-profile-container">
          <div className="my-profile">
            <div>ㅇㄹㅇ</div>
          </div>
        </div>
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
