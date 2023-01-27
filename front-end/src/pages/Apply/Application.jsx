import React from 'react'

import '../../assets/styles/application.css'
import styled from 'styled-components'
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
// import { useDispatch } from 'react-redux'
// import { fetchPostingDetail } from '../../store/redux'

const Title = styled.h1`
  font-size: 2em;
  font-weight: bold;
`
// const dispatch = useDispatch()
// // const state = useSelector((state) => {
// //   return state
// // })
// useEffect(() => {
//   dispatch(fetchPostingDetail())
// }, [])

// const [posting, setPosting] = useState([])

// const setPostingDetail = () => {
//   state.posting.then((e) => {
//     setPosting(e)
//     console.log(posting)
//   })
// }

const Application = () => {
  return (
    <div className="container">
      <div className="project-name-section">
        <div className="project-name-label">프로젝트 이름</div>
        <div className="project-name">
          <Title>싸피 프로젝트 모집</Title>
        </div>
      </div>
      <div className="application-detail-section">
        <div className="name-position-section">
          <div className="name-section">
            <div className="label">이름</div>
            <div>김현진</div>
          </div>
          <div className="position-section">
            <div className="label">포지션</div>
            <div>FrontEnd</div>
          </div>
        </div>
        <div className="phone-section">
          <div className="label">전화번호</div>
          <div>010-0000-0000</div>
        </div>
        <div className="email-section">
          <div className="label">이메일</div>
          <div>signal@signal.com</div>
        </div>
        <div className="skill-section">
          <div className="label">사용기술</div>
          <div>김현진</div>
        </div>
      </div>
      <div className="career-exp-section">
        <div className="career-section">
          <div className="career-label">
            <div>경력</div>
            <hr />
          </div>
          <div>career0</div>
        </div>
        <div className="exp-section">
          <div className="exp-label">
            <div>경험</div>
            <hr />
          </div>
          <div>exp0</div>
        </div>
      </div>
      <div>
        <div>하고싶은 말</div>
        <div>잘 부탁드립니다</div>
      </div>
      <div>
        <div>공고 작성자가 궁금한 점</div>
        <div>
          <div>Q1.질문1</div>
          <div>answer</div>
          <div>Q1.질문1</div>
          <div>answer</div>
          <div>Q1.질문1</div>
          <div>answer</div>
        </div>
      </div>
      <Button variant="contained" startIcon={<CancelIcon />}>
        지원 취소
      </Button>
    </div>
  )
}
export default Application
