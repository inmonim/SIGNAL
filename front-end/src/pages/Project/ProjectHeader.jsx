import React, { useEffect, useState } from 'react'
import api from 'api/Api.js'
import 'assets/styles/projectDetail.css'
import ProjectMaintainPage from './ProjectMaintainPage'
import ProjectProgress from './ProjectProgress'

import settings from 'assets/image/settings.png'
import proejctBackground1 from 'assets/image/projectBackground1.png'
import proejctBackground2 from 'assets/image/projectBackground2.png'
import heart from 'assets/image/heart.png'
import noProfile from 'assets/image/noProfileImg.png'

function ProjectHeader() {
  const [mode, setMode] = useState(0)
  const userSeq = 2
  const projectSeq = 721

  const [project, setProject] = useState([])

  const getProject = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + '/project',
      method: 'GET',
      params: {
        userSeq,
        projectSeq,
        // userSeq: sessionStorage.getItem('userSeq'),
      },
    })
      .then((res) => {
        setProject(res.data.body)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getProject()
  }, [])

  const handleToSetting = () => setMode(1)
  const handleToProgress = () => setMode(2)

  return (
    <div className="project-header-container">
      <div className="project-header-width">
        <div className="project-header-settings">
          <img className="project-header-img-settings" src={settings} alt="" onClick={handleToSetting} />
        </div>
        {mode === 0 ? (
          <div className="project-detail-container">
            <div>
              <img className="project-detail-img-proejct-background-1" src={proejctBackground1} />
              <img className="project-detail-img-proejct-background-2" src={proejctBackground2} alt="" />
            </div>
            <div className="project-detail-content-container">
              <div className="project-detail-content-header">
                <div className="project-detail-my-section">
                  <div className="project-detail-my-warning-section">
                    <div>나의 경고 :</div> &nbsp; <div>{project.warningCnt}회</div>
                  </div>
                  <div className="project-detail-my-heart-section">
                    <div>나의 하트 : </div>
                    <img src={heart} style={{ width: '30px' }} />
                    <div>{project.heartCnt}</div>
                  </div>
                </div>
                <div className="project-detail-project-title">{project.subject}</div>
              </div>
              <div className="project-detail-body-section">
                <div className="project-detail-content">{project.content}</div>
                <div className="project-detail-enter-progress">
                  <div className="project-detail-enter-progress-btn" onClick={handleToProgress}>
                    입장하기 &gt;&gt;
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '500px',
                  position: 'relative',
                  top: '-450px',
                }}
              >
                <div className="project-detail-team-detail-list">
                  {project.projectUserList &&
                    project.projectUserList.map((item, index) => (
                      <div className="project-detail-team" key={index}>
                        <img src={noProfile} alt="" />
                        <div>{item.nickname}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : mode === 1 ? (
          <ProjectMaintainPage></ProjectMaintainPage>
        ) : (
          <ProjectProgress></ProjectProgress>
        )}
      </div>
    </div>
  )
}

export default ProjectHeader
