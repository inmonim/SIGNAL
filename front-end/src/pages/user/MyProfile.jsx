import React from 'react'
// import { Avatar } from '@mui/material'
import 'assets/styles/myprofile.css'
import ProfileImg from 'assets/image/profileimg2.jpeg'
import ProfileBackground from 'assets/image/myprofile-back.png'

function MyProfile() {
  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <img className="user-profile-background" src={ProfileBackground} alt="" />
        <div className="user-profile-user">
          {/* <Avatar
            alt="Remy Sharp" */}
          <img
            src={ProfileImg}
            className="user-profile-img"
            // sx={{ width: '195px', height: '195px' }}
          />
          <div className="user-profile-info">박세아</div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
