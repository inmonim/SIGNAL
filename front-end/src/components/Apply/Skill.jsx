import React from 'react'
import skillImage from '../../assets/image/Skilltest/React.png'
import deleteButton from '../../assets/image/x.png'
import '../../assets/styles/skill.css'

function Skill({ skill, onRemove, id }) {
  return (
    <div className="skill">
      <img src={skillImage} alt="skillImage" className="skill-image" />
      <span>{skill}</span>
      <img
        src={deleteButton}
        alt="deleteButton"
        className="delete-button"
        onClick={() => {
          onRemove(skill)
        }}
      />
    </div>
  )
}

export default Skill
