import React from 'react'
import 'assets/styles/projectDetail.css'
import proejctBackground1 from 'assets/image/projectBackground1.png'
import proejctBackground2 from 'assets/image/projectBackground2.png'
import settings from 'assets/image/settings.png'
import heart from 'assets/image/heart.png'
import noProfile from 'assets/image/noProfileImg.png'
import SignalBtn from 'components/common/SignalBtn'

function ProjectDetail2() {
  return (
    <div className="project-detail-container">
      <div className="project-detail-width">
        <img className="project-detail-img-proejct-background-1" src={proejctBackground1} />
        <img className="project-detail-img-settings" src={settings} alt="" />
        <div style={{ position: 'absolute' }}>
          <div className="project-detail-my-section">
            <div className="project-detail-my-warning-section">
              <div>나의 경고</div> <div>0회</div>
            </div>
            <div className="project-detail-my-heart-section">
              <div>나의 하트</div>
              <img src={heart} style={{ width: '30px' }} />
              <div>*100</div>
            </div>
          </div>
          <div className="project-detail-project-title">Signal - webRTC를 활용한 IT프로젝트 팀 빌딩, 매칭 서비스 </div>
        </div>
        <div className="project-detail-body-section">
          <div className="project-detail-content">
            사전 영상 미팅과 프로필 열람을 통해 수준과 관심, 여건에 맞는 팀원과 팀을 꾸려 팀의 해체 없이 프로젝트를
            완성해내도록 도와주는 서비스 사전 영상 미팅과 프로필 열람을 통해 수준과 관심, 여건에 맞는 팀원과 팀을 꾸려
            팀의 해체 없이 프로젝트를 완성해내도록 도와주는 서비스 사전 영상 미팅과 프로필 열람을 통해 수준과 관심,
            여건에 맞는 팀원과 팀을 꾸려 팀의 해체 없이 프로젝트를 완성해내도록 도와주는 서비스 사전 영상 미팅과 프로필
            열람을 통해 수준과 관심, 여건에 맞는 팀원과 팀을 꾸려 팀의 해체 없이 프로젝트를 완성해내도록 도와주는 서비스
            사전 영상 미팅과 프로필 열람을 통해 수준과 관심, 여건에 맞는 팀원과 팀을 꾸려 팀의 해체 없이 프로젝트를
            완사전 영상 미팅과 프로필 열람을 통해 수준과 관심, 여건에 맞는 팀원과 팀을 꾸려 팀의 해체 없이 프로젝트를
            완성해내도록 도와주는 서비스 사전 영상 미팅과 프로필 열람을 통해 수준과 관심, 여건에 맞는 팀원과 팀을 꾸려
          </div>
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
