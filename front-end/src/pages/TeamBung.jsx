import React from 'react'
import 'assets/styles/teamBung.css'
import bgPurple from 'assets/image/bg_purple.mp4'
import nayu from 'assets/image/teamBung/nayu.jpg'

function TeamBung() {
  return (
    <div className="team-bung-container">
      <div className="team-bung-body">
        <video muted autoPlay loop>
          <source src={bgPurple} type="video/webm" />
        </video>
        <div className="team-bung-item">
          <img className="team-bung-item-img" src={nayu} alt="" />
          <div className="team-bung-item-name">나유진</div>
        </div>
      </div>
    </div>
  )
}

export default TeamBung
