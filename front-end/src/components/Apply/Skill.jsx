import React from 'react'
import skillImage from '../../assets/image/Skilltest/React.png'
import '../../assets/styles/skill.css'

function Skill({ skill }) {
  return (
    <div className="skill">
      <img src={skillImage} alt="skillImage" className="skill-image" />
      <span>{skill}</span>
    </div>
  )
}

export default Skill
