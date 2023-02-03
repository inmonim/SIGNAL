import React, { useEffect, useState } from 'react'
import 'assets/styles/projectDetail.css'
import proejctBackground1 from 'assets/image/projectBackground1.png'
import proejctBackground2 from 'assets/image/projectBackground2.png'
import settings from 'assets/image/settings.png'
import heart from 'assets/image/heart.png'
import noProfile from 'assets/image/noProfileImg.png'
import SignalBtn from 'components/common/SignalBtn'
import api from 'api/Api.js'

function ProjectDetail2() {
  // const location = useLocation()
  // const projectSeq = ???
  // const userSeq = sessionStorage.getItem('userSeq')

  // TEST params데이터 셋
  const userSeq = 82
  const projectSeq = 448

  const [pjtData, setPjtData] = useState([])

  const getProject = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + '/project',
      method: 'GET',
      params: {
        projectSeq,
        // userSeq: sessionStorage.getItem('userSeq'),
        userSeq,
      },
    })
      .then((res) => {
        console.log(res.data.body)
        setPjtData(res.data.body)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getProject()
  }, [])
  return (
    <div className="project-detail-container">
      <div className="project-detail-width">
        <img className="project-detail-img-proejct-background-1" src={proejctBackground1} />
        <img className="project-detail-img-settings" src={settings} alt="" />
        <div style={{ position: 'absolute' }}>
          <div className="project-detail-my-section">
            <div className="project-detail-my-warning-section">
              <div>나의 경고</div> <div>{pjtData.warningCnt}회</div>
            </div>
            <div className="project-detail-my-heart-section">
              <div>나의 하트</div>
              <img src={heart} style={{ width: '30px' }} />
              <div>{pjtData.heartCnt}</div>
            </div>
          </div>
          <div className="project-detail-project-title"> {pjtData.subject} </div>
        </div>
        <div className="project-detail-body-section">
          <div className="project-detail-content">{pjtData.content}</div>
          <div className="project-detail-side-bar">
            <div>
              <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                To Do List
              </SignalBtn>
            </div>
            <div>
              <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                프로젝트 문서
              </SignalBtn>
            </div>
            <div>
              <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                회의 열기
              </SignalBtn>
            </div>
            <div>
              <SignalBtn sigwidth="260px" sigfontsize="30px" sigborderradius="25px">
                동료 평가
              </SignalBtn>
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
            <div className="project-detail-team">
              <img src={noProfile} alt="" />
              <div>사람1</div>
            </div>
            <div className="project-detail-team">
              <img src={noProfile} alt="" />
              <div>사람1</div>
            </div>
            <div className="project-detail-team">
              <img src={noProfile} alt="" />
              <div>사람1</div>
            </div>
            <div className="project-detail-team">
              <img src={noProfile} alt="" />
              <div>사람1</div>
            </div>
            <div className="project-detail-team">
              <img src={noProfile} alt="" />
              <div>사람1</div>
            </div>
            <div className="project-detail-team">
              <img src={noProfile} alt="" />
              <div>사람1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail2
