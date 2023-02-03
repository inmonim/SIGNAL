import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProjectUserItem from 'components/Project/ProjectUserItem'

function TeamMaintain() {
  // Test
  const projectSeq = 448

  const [userDataList, setUserDataList] = useState([])

  const DataLoad = async () => {
    const loadData = await axios({
      url: process.env.REACT_APP_API_URL + `/project/member/${projectSeq}`,
      method: 'GET',
    })
    // console.log(loadData.data.body.projectUserList)
    setUserDataList(loadData.data.body.projectUserList)
    console.log(userDataList)
  }

  useEffect(() => {
    DataLoad()
  }, [])

  return (
    <>
      <div> Team maintain page</div>
      <ProjectUserItem>
        {userDataList && userDataList.map((userData) => <ProjectUserItem Data={userData} key={userData.userSeq} />)}
      </ProjectUserItem>
    </>
  )
}

export default TeamMaintain
