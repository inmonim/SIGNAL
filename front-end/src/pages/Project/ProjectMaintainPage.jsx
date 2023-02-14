import React, { useEffect, useState } from 'react'
import 'assets/styles/projectMaintain.css'
import SignalBtn from 'components/common/SignalBtn'
import TeamMaintain from '../../components/Project/TeamMaintain'
import ProjectMaintain from '../../components/Project/ProjectMaintain'
import api from 'api/Api.js'

// import TeamProfile from 'components/Project/TeamProfile'

function ProjectMaintainPage({ projectSeq, setProjectMode }) {
  // const list = [1, 2, 3, 4, 5, 6]
  // const projectSeq = 458

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
      console.log(res)
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
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(0)
          }}
        >
          팀 관리
        </SignalBtn>
        <SignalBtn
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
  color: '#574B9F',
  borderRadius: '50px',
  height: '40px',
  width: '100px',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}

export default ProjectMaintainPage
