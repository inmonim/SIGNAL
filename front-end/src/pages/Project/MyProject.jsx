import React from 'react'
import styled from 'styled-components'
import '../../assets/styles/myproject.css'

const Container = styled.section`
  padding: 110px 400px;
`

function MyProject() {
  return (
    <Container>
      <div>
        <div className="hr-sect">진행중인 프로젝트</div>
        <div>project List</div>
        <hr />
        <div className="hr-sect">진행했던 프로젝트</div>
        <div>proejct List</div>
        <hr />
      </div>
    </Container>
  )
}
export default MyProject
