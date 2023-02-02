import React from 'react'
import settings from 'assets/image/settings.png'
import 'assets/styles/projectMaintain.css'
import noProfile from 'assets/image/noProfileImg.png'
import SignalBtn from 'components/common/SignalBtn'
function ProjectMaintain2() {
  return (
    <div className="project-maintain-container">
      <div className="project-maintain-width">
        <img className="project-detail-img-settings" src={settings} alt="" />
        <div className="project-maintain-header">
          <div className="project-maintain-title">프로젝트 제목</div>
          <div className="project-maintain-menu">
            <SignalBtn className="project-maintain-menu-1">팀 관리</SignalBtn>
            <SignalBtn className="project-maintain-menu-2">프로젝트 관리</SignalBtn>
          </div>
        </div>

        <div>
          <div className="project-maintain-body">
            <div className="project-maintain-profile">
              <div>
                <div className="project-maintain-profile-image">
                  <img src={noProfile} alt="" />
                </div>
                <div className="project-maintain-profile-nickname">이름</div>
                <div className="project-maintain-profile-position">포지션</div>
              </div>
              <div className="project-maintain-warning-section">
                <div className="project-maintain-warning">경고 3회</div>
                <div>
                  <button className="project-maintain-ban">퇴출</button>
                </div>
              </div>
            </div>
            <div className="project-maintain-profile">
              <div>
                <div className="project-maintain-profile-image">
                  <img src={noProfile} alt="" />
                </div>
                <div className="project-maintain-profile-nickname">이름</div>
                <div className="project-maintain-profile-position">포지션</div>
              </div>
              <div className="project-maintain-warning-section">
                <div className="project-maintain-warning">경고 3회</div>
                <div>
                  <button className="project-maintain-ban">퇴출</button>
                </div>
              </div>
            </div>
            <div className="project-maintain-profile">
              <div>
                <div className="project-maintain-profile-image">
                  <img src={noProfile} alt="" />
                </div>
                <div className="project-maintain-profile-nickname">이름</div>
                <div className="project-maintain-profile-position">포지션</div>
              </div>
              <div className="project-maintain-warning-section">
                <div className="project-maintain-warning">경고 3회</div>
                <div>
                  <button className="project-maintain-ban">퇴출</button>
                </div>
              </div>
            </div>
            <div className="project-maintain-profile">
              <div>
                <div className="project-maintain-profile-image">
                  <img src={noProfile} alt="" />
                </div>
                <div className="project-maintain-profile-nickname">이름</div>
                <div className="project-maintain-profile-position">포지션</div>
              </div>
              <div className="project-maintain-warning-section">
                <div className="project-maintain-warning">경고 3회</div>
                <div>
                  <button className="project-maintain-ban">퇴출</button>
                </div>
              </div>
            </div>
            <div className="project-maintain-profile">
              <div>
                <div className="project-maintain-profile-image">
                  <img src={noProfile} alt="" />
                </div>
                <div className="project-maintain-profile-nickname">이름</div>
                <div className="project-maintain-profile-position">포지션</div>
              </div>
              <div className="project-maintain-warning-section">
                <div className="project-maintain-warning">경고 3회</div>
                <div>
                  <button className="project-maintain-ban">퇴출</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectMaintain2
