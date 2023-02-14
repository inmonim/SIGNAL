import React, { useEffect, useState } from 'react'
import api from 'api/Api.js'
import 'assets/styles/projectDetail.css'
import { useLocation } from 'react-router-dom'
import proejctBackground1 from 'assets/image/projectBackground1.png'
import noProfile from 'assets/image/noProfileImg.png'
import ProjectDocs from 'components/Project/ProjectDocs'

function EndProject() {
  const location = useLocation()
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

  return (
    <div className="project-header-container">
      <div className="project-header-width">
        <div className="project-detail-container">
          <div>
            <img className="project-detail-img-proejct-background-1" src={proejctBackground1} />
          </div>
          <div className="project-detail-content-container">
            <div className="project-detail-content-header">
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
            </div>
            <div className="project-end-docs-list">
              <ProjectDocs projectSeq={projectSeq} mode="end" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndProject
