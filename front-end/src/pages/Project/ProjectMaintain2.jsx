import React, { useState, useEffect } from 'react'
import settings from 'assets/image/settings.png'
import 'assets/styles/projectMaintain.css'
import SignalBtn from 'components/common/SignalBtn'
import ProjectProfile from 'components/Project/ProjectProfile'
import axios from 'axios'

function ProjectMaintain2() {
  // const list = [1, 2, 3, 4, 5, 6]
  const projectSeq = 448

  const [userDataList, setUserDataList] = useState([])

  const projectDataLoad = async () => {
    const loadData = await axios({
      url: process.env.REACT_APP_API_URL + `/project/member/${projectSeq}`,
      method: 'GET',
    })
    setUserDataList(loadData.data.body.projectUserList)
  }

  useEffect(() => {
    projectDataLoad()
  }, [])

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

        <div style={{ width: '1000px', margin: 'auto' }}>
          <div className="project-maintain-body">
            {userDataList.map((Data) => (
              <ProjectProfile Data={Data} key={Data.userSeq}></ProjectProfile>
            ))}
          </div>
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
  width: '100px',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}

export default ProjectMaintain2
