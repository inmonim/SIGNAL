import React from 'react'
import 'assets/styles/profile/myprofile.css'
import UserInfo from 'components/user/UserInfo'
import Profile from 'components/user/Profile'
import PostingApply from 'components/user/PostingApply'

function MyProfile() {
  return (
    <div className="my-container">
      <div className="my-main">
        <UserInfo />
        <div className="my-profile">
          <div className="my-profile-container">
            <Profile />
            <PostingApply />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
