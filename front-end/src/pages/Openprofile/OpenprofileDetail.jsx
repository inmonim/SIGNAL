import React from 'react'
import 'assets/styles/profile/myprofile.css'
import UserInfo2 from './UserInfo2'

function OpenprofileDetail() {
  return (
    <div className="my-container">
      <div className="my-main">
        <UserInfo2 />
        <div className="my-profile">
          <div className="my-profile-container">
            {/* <Profile profile={profile} />
            <PostingApply /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenprofileDetail
