import React, { useEffect, useState } from 'react'
import api from 'api/Api.js'
import 'assets/styles/projectDetail.css'
import ProjectMaintainPage from './ProjectMaintainPage'
import ProjectProgress from './ProjectProgress'

import HeartDetailModal from 'components/common/HeartDetailModal'
import { useLocation } from 'react-router-dom'
import settings from 'assets/image/settings.png'
import proejctBackground1 from 'assets/image/projectBackground1.png'
import proejctBackground2 from 'assets/image/projectBackground2.png'
import heart from 'assets/image/heart.png'
import noProfile from 'assets/image/noProfileImg.png'

function ProjectHeader() {
  const location = useLocation()
  const [mode, setMode] = useState(0)
  const userSeq = sessionStorage.getItem('userSeq')
  const projectSeq = parseInt(location.state.projectSeq)

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
        console.log('project:', project)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const [member, setMember] = useState([])
  const getProjectMember = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + '/project/member/' + projectSeq,
      method: 'GET',
    })
      .then((res) => {
        setMember(res.data.body.projectUserList)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const memberList = []
  Array.from(member).forEach((item) => {
    memberList.push({
      userSeq: item.userSeq,
      nickname: item.nickname,
      profileImageUrl: item.profileImageUrl,
    })
  })
  console.log(memberList)

  useEffect(() => {
    getProject()
    getProjectMember()
  }, [])

  const handleToSetting = () => setMode(1)
  const handleToProgress = () => setMode(2)

  const [heartOpen, setHeartOpen] = useState(false)
  const handleHeartOpen = () => setHeartOpen(true)
  const handleHeartClose = () => setHeartOpen(false)

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
                  <div className="project-detail-my-heart-section" onClick={handleHeartOpen}>
                    <div>나의 하트 : </div>
                    <img src={heart} style={{ width: '30px' }} />
                    <div>{project.heartCnt}</div>
                  </div>
                  <HeartDetailModal
                    open={heartOpen}
                    onClose={handleHeartClose}
                    mode="project"
                    projectSeq={projectSeq}
                  ></HeartDetailModal>
                </div>
                <div className="project-detail-project-title">{project.subject}</div>
              </div>
              <div>
                <div className="project-detail-team-detail-list">
                  {memberList.map((item, index) => (
                    <div className="project-detail-team" key={index}>
                      <img src={process.env.REACT_APP_API_URL + item.profileImageUrl} alt={noProfile} />
                      <div>{item.nickname}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="project-detail-body-section">
                <div className="project-detail-content">{project.content}</div>
                <div className="project-detail-enter-progress">
                  <div className="project-detail-enter-progress-btn" onClick={handleToProgress}>
                    입장하기 &gt;&gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : mode === 1 ? (
          <ProjectMaintainPage projectSeq={projectSeq}></ProjectMaintainPage>
        ) : (
          <ProjectProgress projectSeq={projectSeq}></ProjectProgress>
        )}
      </div>
    </div>
  )
}

export default ProjectHeader
