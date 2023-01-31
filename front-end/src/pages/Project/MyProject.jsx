import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import 'assets/styles/myproject.css'
import Paging from 'components/Paging'

const Container = styled.section`
  padding: 80px 220px;
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
        setIngData(res.body.ingProjectList)
      })
  }, [])

  const [size] = useState(4)
  const [endPage, setEndPage] = useState(1)
  const handleEndPageChange = (page) => {
    setEndPage(page)
  }
  const [ingPage, setIngPage] = useState(1)
  const handleIngPageChange = (page) => {
    setIngPage(page)
  }

  return (
    <Container>
      <div>
        <div className="hr-sect">진행중인 프로젝트</div>
        <div className="project-list-container">
          {ingData.slice(size * (ingPage - 1), size * (ingPage - 1) + size).map((v, i) => {
            return (
              <div className="project-list-end" key={i}>
                {v.projectImageUrl}
                {v.subject}
              </div>
            )
          })}
        </div>
        <Paging page={ingPage} count={ingData.length} setPage={handleIngPageChange} size={size}></Paging>
        <hr />
        <div className="hr-sect">진행했던 프로젝트</div>
        <div className="project-list-container">
          {endData.slice(size * (endPage - 1), size * (endPage - 1) + size).map((v, i) => {
            return (
              <div className="project-list-end" key={i}>
                <div>
                  <img src={require(`assets/image/${v.projectImageUrl}`)} alt="signal" />
                  console.log()
                </div>
                {v.subject}
              </div>
            )
          })}
          {console.log(endData[0].projectImageUrl)}
        </div>
        <Paging page={endPage} count={endData.length} setPage={handleEndPageChange} size={size}></Paging>
        <hr />
      </div>
    </Container>
  )
}
export default MyProject
