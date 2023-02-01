import React from 'react'
import 'assets/styles/myprofile.css'
import ProfileBackground from 'assets/image/myprofile-back.png'

function MyProfile() {
  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <img className="user-profile-background" src={ProfileBackground} alt="" />
        <div className="user-profile-user">dfasd</div>
      </div>
    </div>
  )
}

export default MyProfile
