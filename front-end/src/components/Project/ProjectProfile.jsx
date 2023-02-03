import React from 'react'
import noProfile from 'assets/image/noProfileImg.png'

function ProjectProfile() {
  return (
    <div className="project-maintain-profile">
      <div className="project-maintain-profile-section">
        <div className="project-maintain-profile-image">
          <img src={noProfile} alt="" />
        </div>
        <div className="project-maintain-profile-nickname">이름</div>
        <div className="project-maintain-profile-position">포지션</div>
      </div>
      <div className="project-maintain-warning-section">
        <div className="project-maintain-warning">경고 3회</div>
        <div>
          <button className="project-maintain-ban">퇴출</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectProfile
