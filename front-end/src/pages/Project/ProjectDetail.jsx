import React, { useState, useEffect } from 'react'
import '../../assets/styles/applyDetail.css'
import '../../assets/styles/skill.css'
// import { Button } from '@mui/material'
// import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
// import ModeEditIcon from '@mui/icons-material/ModeEdit'
// import { useLocation } from 'react-router-dom'
import axios from 'axios'

function ProjectDetail() {
  // const location = useLocation()
  // const projectSeq = ???
  // const userSeq = sessionStorage.getItem('userSeq')

  // TEST params데이터 셋
  const userSeq = 82
  const projectSeq = 448

  const [pjtData, setPjtData] = useState([])

  const getProject = async () => {
    await axios({
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
    <>
      <div>프로젝트 상세</div>
      <div> subject : {pjtData.sueject} </div>
      <div> content : {pjtData.content} </div>
      <div> heartCnt : {pjtData.heartCnt} </div>
      <div> weekCnt : {pjtData.weekCnt} </div>
      <div> warningCnt : {pjtData.warningCnt} </div>

      <div> projectUserList : {pjtData.projectUserList} </div>
    </>
  )
}

export default ProjectDetail
