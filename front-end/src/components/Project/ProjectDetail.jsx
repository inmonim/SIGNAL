import React, { useEffect, useState } from 'react'
import 'assets/styles/projectDetail.css'
import proejctBackground1 from 'assets/image/projectBackground1.png'
import proejctBackground2 from 'assets/image/projectBackground2.png'
import heart from 'assets/image/heart.png'
import noProfile from 'assets/image/noProfileImg.png'
import SignalBtn from 'components/common/SignalBtn'

import api from 'api/Api.js'
import { Link } from 'react-router-dom'

function ProjectDetail() {
  // const navigate = useNavigate()

  // const location = useLocation()
  // const projectSeq = location.state.applySeq
  // const userSeq = sessionStorage.getItem('userSeq')

  // const [mode, setMode] = useState(0)

  // TEST params데이터 셋
  const userSeq = 82
  const projectSeq = 458

  const [project, setProject] = useState([])

  const getProject = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + '/project',
      method: 'GET',
      params: {
        projectSeq,
        userSeq,
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

  return (
    <div>
      <img className="project-detail-img-proejct-background-1" src={proejctBackground1} />
      <div>
        <div style={{ position: 'absolute' }}>
          <div className="project-detail-my-section">
            <div className="project-detail-my-warning-section">
              <div>나의 경고</div> <div>{project.warningCnt}회</div>
            </div>
            <div className="project-detail-my-heart-section">
              <div>나의 하트</div>
              <img src={heart} style={{ width: '30px' }} />
              <div>{project.heartCnt}</div>
            </div>
          </div>
          <div className="project-detail-project-title"> {project.subject} </div>
        </div>
        <div className="project-detail-body-section">
          <div className="project-detail-content">{project.content}</div>
          <div className="project-detail-side-bar">
            <div>
              <Link to="/toDoList">
                <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                  To Do List
                </SignalBtn>
              </Link>
            </div>
            <div>
              <Link to="/projectDocs">
                <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                  프로젝트 문서
                </SignalBtn>
              </Link>
            </div>
            <div>
              <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                회의 열기
              </SignalBtn>
            </div>
            <div>
              <Link to="/projectEvaluation">
                <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                  동료 평가
                </SignalBtn>
              </Link>
            </div>
          </div>
        </div>
        <img className="project-detail-img-proejct-background-2" src={proejctBackground2} alt="" />
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
  )
}

export default ProjectDetail
