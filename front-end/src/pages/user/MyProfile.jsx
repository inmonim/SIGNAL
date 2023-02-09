import React, { useEffect, useState } from 'react'
import 'assets/styles/profile/myprofile.css'
import UserInfo from 'components/user/UserInfo'
import Profile from 'components/user/Profile'
import PostingApply from 'components/user/PostingApply'
import api from 'api/Api'

function MyProfile() {
  const userSeq = sessionStorage.getItem('userSeq')

  const [profile, setProfile] = useState([])

  const dataFetch = async () => {
    try {
      // profile get
      await api.get(process.env.REACT_APP_API_URL + '/profile/' + userSeq).then((res) => {
        setProfile(res.data.body)
        console.log('myprofile', res.data.body)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dataFetch()
  }, [])

  return (
    <div className="my-container">
      <div className="my-main">
        <UserInfo />
        <div className="my-profile">
          <div className="my-profile-container">
            <Profile profile={profile} />
            <PostingApply />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
