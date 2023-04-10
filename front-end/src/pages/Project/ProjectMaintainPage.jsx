import React, { useEffect, useState } from 'react'
import 'assets/styles/projectMaintain.css'
import SignalBtn from 'components/common/SignalBtn'
import TeamMaintain from '../../components/Project/TeamMaintain'
import ProjectMaintain from '../../components/Project/ProjectMaintain'
import api from 'api/Api.js'

function ProjectMaintainPage({ projectSeq, setProjectMode }) {
  const [memberList, setMemberList] = useState([])
  const [projectData, setProjectData] = useState([])

  const projecDataLoad = async () => {
    try {
      const loadData = await api({
        url: process.env.REACT_APP_API_URL + `/project/member/${projectSeq}`,
        method: 'GET',
      })
      setMemberList(loadData.data.body.projectUserList)

      const res = await api({
        url: process.env.REACT_APP_API_URL + `/project/setting/${projectSeq}`,
        method: 'GET',
      })
      setProjectData(res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const [mode, setMode] = useState(0)

  useEffect(() => {
    projecDataLoad()
  }, [])

  return (
    <div className="team-maintain-header">
      <div className="team-maintain-title" onClick={() => setProjectMode('main')}>
        {projectData.subject}
      </div>
      <div className="team-maintain-menu">
        <SignalBtn
          className={`team-maintain-menu-item ${mode === 0 ? 'active' : ''}`}
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(0)
          }}
        >
          팀 관리
        </SignalBtn>
        <SignalBtn
          className={`team-maintain-menu-item ${mode === 1 ? 'active' : ''}`}
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(1)
          }}
        >
          프로젝트 관리
        </SignalBtn>
      </div>
      {mode === 0 ? (
        <TeamMaintain data={memberList}></TeamMaintain>
      ) : (
        <ProjectMaintain data={projectData} projectSeq={projectSeq}></ProjectMaintain>
      )}
      <div></div>
    </div>
  )
}

const projectSubMenuStyle = {
  backgroundColor: '#fff',
  color: '#9A93C5',
  borderRadius: '50px',
  height: '40px',
  width: '150px',
  margin: '0px 20px',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#9A93C5',
    color: '#fff',
  },
  '&.active': {
    backgroundColor: '#9A93C5',
    color: '#fff',
  },
}

export default ProjectMaintainPage
