import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import '../../assets/styles/myproject.css'
import Paging from 'components/Paging'

const Container = styled.section`
  padding: 85px 124px;
`

function MyProject() {
  const [endData, setEndData] = useState([])
  const [ingData, setIngData] = useState([])
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/project/${sessionStorage.getItem('userSeq')}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setEndData(res.body.endProjectList)
        console.log(res.body.endProjectList)
        setIngData(res.body.ingProjectList)
        console.log(res.body.ingProjectList)
      })
  }, [])
  console.log(endData[0])
  const endListRendering = () => {
    const endList = []
    for (let i = 0; i < endData.length; i++) {
      endList.push(
        <span className="project-list-end" key={i}>
          {endData[i].subject}
        </span>
      )
    }
    return endList
  }
  const ingListRendering = () => {
    const ingList = []
    for (let i = 0; i < ingData.length; i++) {
      ingList.push(
        <span className="project-list-ing" key={i}>
          {ingData[i].subject}
        </span>
      )
    }
    return ingList
  }
  const [size] = useState(4)
  const [page, setPage] = useState(1)
  const handlePageChange = (page) => {
    setPage(page)
  }
  return (
    <Container>
      <div>
        <div className="hr-sect">진행중인 프로젝트</div>
        <div className="project-list-container">{ingListRendering()}</div>
        <Paging></Paging>
        <hr />
        <div className="hr-sect">진행했던 프로젝트</div>
        <div className="project-list-container">{endListRendering()}</div>
        <Paging page={page} count={endData.length} setPage={handlePageChange} size={size}></Paging>
        <hr />
      </div>
    </Container>
  )
}
export default MyProject
