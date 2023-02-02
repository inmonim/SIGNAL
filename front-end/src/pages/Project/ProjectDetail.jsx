import React from 'react'
// import { useState, useEffect } from 'react'
import '../../assets/styles/applyDetail.css'
import '../../assets/styles/skill.css'
// import { getPositionName } from 'data/Positiondata'
// import ApplyDelete from '../../components/Apply/ApplyDelete'
// import skillImage from '../../assets/image/Skilltest/React.png'
// import { Button } from '@mui/material'
// import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
// import ModeEditIcon from '@mui/icons-material/ModeEdit'
// import { useLocation } from 'react-router-dom'
import axios from 'axios'

function ProjectDetail() {
  // 인모쓰 여기다가 작성하심 됩니두]
  //  ex) const [data, setData] =useStaet([])
  // const res = axios.get(~~~~)
  // setData(res.data.body)  ~~~

  // 접속은 localhost/projectDetail 로 하셔서 콘솔창에서 데이터 확인하십셔

  // const location = useLocation()
  // const projectSeq = ???
  // const userSeq = sessionStorage.getItem('userSeq')

  // TEST params데이터 셋
  const userSeq = 82
  const projectSeq = 448

  const getProject = async () => {
    return await axios({
      url: process.env.REACT_APP_API_URL + '/project',
      method: 'GET',
      params: {
        projectSeq,
        // userSeq: sessionStorage.getItem('userSeq'),
        userSeq,
      },
    })
      .then((res) => {
        console.log(res, `===============`)
        return res
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const setData = async () => {
    const databody = await getProject()
    console.log(databody)
    return databody
  }

  setData()

  return (
    <>
      <div>프로젝트 상세</div>
      {/* <div> {data} </div> */}
      {/* <div> {content} </div>
      <div> {heartCnt} </div>
      <div> {warningCnt} </div> */}
    </>
  )
}

export default ProjectDetail
