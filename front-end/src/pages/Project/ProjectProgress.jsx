import React, { useState } from 'react'
import 'assets/styles/projectProgress.css'
import SignalBtn from 'components/common/SignalBtn'
import TodoList from 'components/Project/TodoList'
import ProjectDocs from 'components/Project/ProjectDocs'
import AlertModal from 'components/AlertModal'
import TeamEval from 'components/Project/TeamEval'
// import api from 'api/Api.js'

// import TeamProfile from 'components/Project/TeamProfile'

function ProjectProgress() {
  // const list = [1, 2, 3, 4, 5, 6]
  // const projectSeq = 458

  // const [memberList, setMemberList] = useState([])
  // const [projectData, setProjectData] = useState([])

  // const projecDataLoad = async () => {
  // try {
  //   const loadData = await api({
  //     url: process.env.REACT_APP_API_URL + `/project/member/${projectSeq}`,
  //     method: 'GET',
  //   })
  //   setMemberList(loadData.data.body.projectUserList)

  //   const res = await api.get('https://www.ssafysignal.site:8443/project/setting/448')
  //   console.log(res)
  //   setProjectData(res.data.body)
  // } catch (error) {
  //   console.log(error)
  // }

  const [mode, setMode] = useState(0)

  return (
    <div className="team-progress-header">
      <div className="team-progress-title">프로젝트 제목</div>
      <div className="team-progress-menu">
        <SignalBtn
          className={`team-progress-menu-item ${mode === 0 ? 'active' : ''}`}
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(0)
          }}
        >
          ToDoList
        </SignalBtn>
        <SignalBtn
          className={`team-progress-menu-item ${mode === 1 ? 'active' : ''}`}
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(1)
          }}
        >
          프로젝트 문서
        </SignalBtn>
        <SignalBtn
          className={`team-progress-menu-item ${mode === 2 ? 'active' : ''}`}
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(2)
          }}
        >
          화상회의 열기
        </SignalBtn>
        <SignalBtn
          className={`team-progress-menu-item ${mode === 3 ? 'active' : ''}`}
          s
          sx={projectSubMenuStyle}
          onClick={() => {
            setMode(3)
          }}
        >
          동료 평가
        </SignalBtn>
      </div>
      {mode === 0 ? <TodoList /> : mode === 1 ? <ProjectDocs /> : mode === 2 ? <AlertModal /> : <TeamEval />}
      <div></div>
    </div>
  )
}
export default ProjectProgress

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
