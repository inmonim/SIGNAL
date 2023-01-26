import React from 'react'

import '../../assets/styles/application.css'
import styled from 'styled-components'
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    purple: {
      main: '#574b9f',
    },
  },
})

const Container = styled.section`
  padding: 100px 25em;
`

const Title = styled.h1`
  font-size: 2em;
  font-weight: bold;
`

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.purple,
}))

const Application = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="project-name-section">
          <div className="project-name-label">프로젝트 이름</div>
          <div className="project-name">
            <Title>싸피 프로젝트 모집</Title>
            <CancelButton variant="contained" startIcon={<CancelIcon />}>
              지원 취소
            </CancelButton>
          </div>
        </div>
        <div>
          <div>
            <div>이름</div>
            <div>김현진</div>
          </div>
          <div>
            <div>포지션</div>
            <div>FrontEnd</div>
          </div>
          <div>
            <div>전화번호</div>
            <div>010-0000-0000</div>
          </div>
          <div>
            <div>이메일</div>
            <div>signal@signal.com</div>
          </div>
          <div>
            <div>사용기술</div>
            <div>김현진</div>
          </div>
        </div>
        <div>
          <div>
            <div>경력</div>
            <div>경력1</div>
          </div>
          <div>
            <div>경험</div>
            <div>경험1</div>
          </div>
        </div>
        <div>
          <div>하고싶은 말</div>
          <div>나는야</div>
        </div>
        <div>
          <div>공고 작성자가 궁금한 점</div>
          <div>
            <div>Q1.</div>
            <div>answer</div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  )
}
export default Application
