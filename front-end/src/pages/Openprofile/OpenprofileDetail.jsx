import React from 'react'
import 'assets/styles/profile/myprofile.css'
import UserInfo2 from './UserInfo2'
import Profile2 from './Profile2'
import { useLocation } from 'react-router'
function OpenprofileDetail() {
  const { state } = useLocation()
  return (
    <div className="my-container">
      <div className="my-main">
        <UserInfo2 state={state} />
        <div className="my-profile">
          <div className="my-profile-container">
            <Profile2 state={state} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenprofileDetail
