import React, { useEffect, useState } from 'react'
import 'assets/styles/projectMaintain.css'
import SignalBtn from 'components/common/SignalBtn'
import TeamMaintain from '../../components/Project/TeamMaintain'
import ProjectMaintain from '../../components/Project/ProjectMaintain'
// import api from 'api/Api.js'

// import TeamProfile from 'components/Project/TeamProfile'

function ProjectMaintainPage() {
  // const list = [1, 2, 3, 4, 5, 6]
  // const projectSeq = 458

  const [memberList, setMemberList] = useState([])
  const [projectData, setProjectData] = useState([])

  const projecDataLoad = async () => {
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
    console.log('Dd')
    setMemberList([
      {
        userSeq: 1,
        position: {
          name: 'frontend',
        },
        warningCnt: 1,
        nickname: '나유',
        profileImageUrl: '/noImage.png',
      },
    ])

    setProjectData({
      subject: 'subject',
      content: 'content',
      gitUrl: 'gitUrl',
      projectImageUrl: 'projectImageUrl.png',
      field: {
        name: 'web',
      },
      local: {
        name: '서울특별시',
      },
      contact: true,
      position: [
        {
          position: {
            name: 'frontend',
          },
          positionCnt: 3,
        },
        {
          position: {
            name: 'backend',
          },
          positionCnt: 3,
        },
      ],
      term: 10,
    })
  }

  const [mode, setMode] = useState(0)

  useEffect(() => {
    projecDataLoad()
  }, [])

  return (
    <div className="team-maintain-header">
      <div className="team-maintain-title">프로젝트 제목</div>
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
        <ProjectMaintain data={projectData}></ProjectMaintain>
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
