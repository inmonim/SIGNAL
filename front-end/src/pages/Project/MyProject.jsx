import React, { useEffect, useState } from 'react'
import noImage from 'assets/image/noImage.png'
import styled from 'styled-components'
import 'assets/styles/myproject.css'
import Paging from 'components/Paging'
import api from 'api/Api'

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
      <div>
        <div className="hr-sect">진행중인 프로젝트</div>
        <div className="project-list-container">
          {ingData.slice(size * (ingPage - 1), size * (ingPage - 1) + size).map((v, i) => {
            return (
              <div className="project-list-ing" key={i}>
                <div className="project-list-img">
                  <img src={noImage} alt="signal" />
                </div>
                <div className="project-list-subject">{v.subject}</div>
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
                <div className="project-list-img">
                  <img src={noImage} alt="signal" />
                </div>
                <div className="project-list-subject">{v.subject}</div>
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
