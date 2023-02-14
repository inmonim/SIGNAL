import React, { useEffect, useState } from 'react'

// import { useNavigate } from 'react-router-dom'
import api from 'api/Api'

function UserInfo2({ state }) {
  const [userInfo, setUserInfo] = useState([])
  const userSeq = state.userSeq

  // console.log(JSON.stringify(state.nickname), '이건 스테이트')
  // console.log(JSON.stringify(state), '이건 스테이트')
  // console.log(JSON.stringify(state), '이건 스테이트')
  // console.log(JSON.stringify(state), '이건 스테이트')

  const userFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/user/' + userSeq).then((res) => {
        setUserInfo(res.data.body)
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    userFetch()
  }, [])

  return (
    <div className="my-user">
      <img className="my-user-img" src={process.env.REACT_APP_API_URL + userInfo.userImageUrl} alt="" />
      <div className="my-user-info"></div>
      <div className="my-user-nickname">{userInfo.nickname}</div>
      <div className="my-user-email">{userInfo.email}</div>
      <div className="my-user-btn"></div>
    </div>
  )
}

export default UserInfo2
