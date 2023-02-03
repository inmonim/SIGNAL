import React, { useEffect, useState } from 'react'
import noProfile from 'assets/image/noProfileImg.png'
import SignalBtn from 'components/common/SignalBtn'

function ProjectProfile({ Data }) {
  const position = Data.position.name
  const warningCnt = Data.warningCnt
  const nickname = Data.nickname
  // const imageUrl = Data.profileImageUrl

  const [imageUrl, setimageUrl] = useState(Data.profileImageUrl)
  const [kickAble, setkickAble] = useState(false)

  const checkUser = () => {
    if (warningCnt >= 3) {
      setkickAble(true)
    }
    if (imageUrl === '/noImage.png') {
      setimageUrl(noProfile)
    }
  }

  useEffect(() => {
    checkUser()
  }, [kickAble])

  return (
    <div className="project-maintain-profile">
      <div className="project-maintain-profile-section">
        <div className="project-maintain-profile-image">
          <img src={noProfile} alt="" />
        </div>
        <div className="project-maintain-profile-text">
          <div className="project-maintain-profile-nickname"> {nickname}</div>
          <div className="project-maintain-profile-position"> {position}</div>
        </div>
      </div>
      <div className="project-maintain-warning-section">
        <div className="project-maintain-warning">경고 3회</div>
        <div></div>
        <div className="project-maintain-warning">경고 : {warningCnt}</div>
        {kickAble === true && (
          <SignalBtn className="project-maintain-ban" sigborderradius="50px">
            퇴출
          </SignalBtn>
        )}
      </div>
    </div>
  )
}

export default ProjectProfile
