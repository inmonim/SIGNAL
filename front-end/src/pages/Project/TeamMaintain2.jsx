import React from 'react'
import settings from 'assets/image/settings.png'
import 'assets/styles/teamMaintain.css'
import SignalBtn from 'components/common/SignalBtn'
import TeamProfile from 'components/Project/TeamProfile'

function ProjectMaintain2() {
  const list = [1, 2, 3, 4, 5, 6]
  return (
    <div className="project-maintain-container">
      <div className="project-maintain-width">
        <img className="project-detail-img-settings" src={settings} alt="" />
        <div className="project-maintain-header">
          <div className="project-maintain-title">프로젝트 제목</div>
          <div className="project-maintain-menu">
            <SignalBtn className="project-maintain-menu-1" sx={projectSubMenuStyle}>
              팀 관리
            </SignalBtn>
            <SignalBtn className="project-maintain-menu-2" sx={projectSubMenuStyle}>
              프로젝트 관리
            </SignalBtn>
          </div>
        </div>

        <div className="project-maintain-body">
          {list.map((item, index) => (
            <TeamProfile key={index}></TeamProfile>
          ))}
        </div>
      </div>
    </div>
  )
}

const projectSubMenuStyle = {
  backgroundColor: '#fff',
  color: '#574B9F',
  borderRadius: '50px',
  height: '40px',
  width: '130px',
  fontSize: '20px',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}

export default ProjectMaintain2
