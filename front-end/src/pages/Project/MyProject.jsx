import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'assets/styles/myproject.css'
import Paging from 'components/Paging'
import api from 'api/Api'
import { Link } from 'react-router-dom'

const Container = styled.section`
  padding: 80px 220px;
`

function MyProject() {
  const [endData, setEndData] = useState([])
  const [ingData, setIngData] = useState([])
  // const [img, setImg] = useState('')
  useEffect(() => {
    console.log(sessionStorage.getItem('useSeq'))
    api.get(process.env.REACT_APP_API_URL + `/project/${sessionStorage.getItem('userSeq')}`).then((res) => {
      setEndData(res.data.body.endProjectList)
      setIngData(res.data.body.ingProjectList)
      // setImg(res.body.endProjectList.projectImageUrl)
    })
  }, [])
  // console.log(img)
  console.log(endData)
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
      <div className="my-project-container">
        <div className="hr-sect">진행중인 프로젝트</div>
        <div className="project-list-container">
          {ingData &&
            ingData.slice(size * (ingPage - 1), size * (ingPage - 1) + size).map((v, index) => {
              return (
                <div key={index}>
                  <Link to="/project" state={{ projectSeq: v.projectSeq }}>
                    <div className="project-list-ing" key={index}>
                      <div className="project-list-img">
                        <img
                          className="project-list-img-item"
                          src={process.env.REACT_APP_API_URL + v.projectImageUrl}
                          alt="signal"
                        />
                      </div>
                      <div className="project-list-subject">{v.subject}</div>
                    </div>
                  </Link>
                </div>
              )
            })}
        </div>
        <Paging page={ingPage} count={ingData.length} setPage={handleIngPageChange} size={size}></Paging>
        <hr />
        <div className="hr-sect">진행했던 프로젝트</div>
        <div className="project-list-container">
          {endData &&
            endData.slice(size * (endPage - 1), size * (endPage - 1) + size).map((v, index) => {
              return (
                <div key={index}>
                  <Link to="/endproject" state={{ projectSeq: v.projectSeq }}>
                    <div className="project-list-end">
                      <div className="project-list-img">
                        <img
                          className="project-list-img-item"
                          src={process.env.REACT_APP_API_URL + v.projectImageUrl}
                          alt="signal"
                        />
                      </div>
                      <div className="project-list-subject">{v.subject}</div>
                    </div>
                  </Link>
                </div>
              )
            })}
        </div>
        <Paging page={endPage} count={endData.length} setPage={handleEndPageChange} size={size}></Paging>
        <hr />
      </div>
    </Container>
  )
}
export default MyProject
