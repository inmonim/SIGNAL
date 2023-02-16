import React from 'react'
import 'assets/styles/teamBung.css'
import bgPurple from 'assets/image/bg_purple.mp4'
import nayu from 'assets/image/teamBung/nayu.jpg'
import hyuk from 'assets/image/teamBung/hyuk.jpg'
import mj from 'assets/image/teamBung/mj.jpg'
import inmo from 'assets/image/teamBung/inmo.jpg'
import sub from 'assets/image/teamBung/sub.jpg'
import table from 'assets/image/teamBung/table.jpg'
import github from 'assets/image/teamBung/github.png'

function TeamBung() {
  return (
    <div className="team-bung-container">
      <div className="team-bung-body">
        <video muted autoPlay loop>
          <source src={bgPurple} type="video/webm" />
        </video>
        <div className="team-bung-title">시그널 개발팀 &quot;붕어빵&quot;</div>
        <div className="team-bung-item-container">
          <div className="team-bung-item" onClick={() => window.open('https://github.com/kwonhyeokgeun')}>
            <img className="team-bung-item-img" src={hyuk} alt="" />
            <div className="team-bung-item-name">권혁근</div>
            <div className="team-bung-item-position">Back-End</div>
            <p className="team-bung-github">
              <img src={github} alt="" className="team-bung-github-img" />
            </p>
          </div>
          <div className="team-bung-item" onClick={() => window.open('https://github.com/myonjin')}>
            <img className="team-bung-item-img" src={mj} alt="" />
            <div className="team-bung-item-name">김현진</div>
            <div className="team-bung-item-position">Front-End</div>
            <p className="team-bung-github">
              <img src={github} alt="" className="team-bung-github-img" />
            </p>
          </div>
          <div className="team-bung-item" onClick={() => window.open('https://github.com/nayu1105')}>
            <img className="team-bung-item-img" src={nayu} alt="" />
            <div className="team-bung-item-name">나유진</div>
            <div className="team-bung-item-position">Front-End</div>
            <p className="team-bung-github">
              <img src={github} alt="" className="team-bung-github-img" />
            </p>
          </div>
          <div className="team-bung-item" onClick={() => window.open('https://github.com/tableMinPark')}>
            <img className="team-bung-item-img" src={table} alt="" />
            <div className="team-bung-item-name">박상민</div>
            <div className="team-bung-item-position">Back-End</div>
            <p className="team-bung-github">
              <img src={github} alt="" className="team-bung-github-img" />
            </p>
          </div>
          <div className="team-bung-item" onClick={() => window.open('https://github.com/inmonim')}>
            <img className="team-bung-item-img" src={inmo} alt="" />
            <div className="team-bung-item-name">정인모</div>
            <div className="team-bung-item-position">Back-End</div>
            <p className="team-bung-github">
              <img src={github} alt="" className="team-bung-github-img" />
            </p>
          </div>
          <div className="team-bung-item" onClick={() => window.open('https://github.com/marybin99')}>
            <img className="team-bung-item-img" src={sub} alt="" />
            <div className="team-bung-item-name">황수빈</div>
            <div className="team-bung-item-position">Front-End</div>
            <p className="team-bung-github">
              <img src={github} alt="" className="team-bung-github-img" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamBung
