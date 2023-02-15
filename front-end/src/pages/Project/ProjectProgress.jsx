import React, { useState, useEffect } from 'react'
import 'assets/styles/projectProgress.css'
import SignalBtn from 'components/common/SignalBtn'
import TodoList from 'components/Project/TodoList'
import ProjectDocs from 'components/Project/ProjectDocs'
import AlertModal from 'components/AlertModal'
import TeamEval from 'components/Project/TeamEval'
import api from 'api/Api.js'

function ProjectProgress({ projectSeq, setProjectMode }) {
  const userSeq = sessionStorage.getItem('userSeq')
  const [project, setProject] = useState([])

  const getProject = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + '/project',
      method: 'GET',
      params: {
        userSeq,
        projectSeq,
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

  const [mode, setMode] = useState(0)

  const [meetingOpen, setMeetingOpen] = useState(false)

  const handleMeetingEnter = () => {
    setMeetingOpen(false)
    window.open(`/projectmeeting?nickname=${sessionStorage.getItem('nickname')}&projectSeq=${projectSeq}`, '_blank')
  }

  return (
    <div className="team-progress-header">
      <div className="team-progress-title" onClick={() => setProjectMode('main')}>
        {project.subject}
      </div>
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
            setMeetingOpen(true)
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
      {mode === 0 ? (
        <TodoList projectSeq={projectSeq} />
      ) : mode === 1 ? (
        <ProjectDocs projectSeq={projectSeq} />
      ) : mode === 2 ? (
        <AlertModal
          open={meetingOpen}
          onClick={handleMeetingEnter}
          msg={'화상회의에 입장하시겠습니까?'}
          onClose={() => setMeetingOpen(false)}
        />
      ) : mode === 3 ? (
        <TeamEval projectSeq={projectSeq} setMode={setMode} />
      ) : (
        <></>
      )}
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
