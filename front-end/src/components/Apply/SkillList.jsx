import React from 'react'
import Skill from './Skill'
import '../../assets/styles/skill.css'

function SkillList({ skillList }) {
  return (
    <div className="skillList-section">
      {skillList && skillList.map((item, index) => <Skill skill={item} id={index} key={item}></Skill>)}
    </div>
  )
}

export default SkillList
