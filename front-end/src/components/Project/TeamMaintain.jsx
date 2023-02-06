import React from 'react'
import 'assets/styles/projectMaintain.css'
import TeamProfile from 'components/Project/TeamProfile'

function TeamMaintain({ data }) {
  // const list = [1, 2, 3, 4, 5, 6]
  return (
    <div className="team-maintain-body">
      {data && data.map((Data) => <TeamProfile Data={Data} key={Data.userSeq}></TeamProfile>)}
    </div>
  )
}

export default TeamMaintain
