import React, { useState, useEffect } from 'react'

import '../../assets/styles/application.css'
// import styled from 'styled-components'/
import { Button } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import axios from 'axios'

import { getPositionName } from 'data/Positiondata'

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
  },
}))

const Application = () => {
  const [apply, setApply] = useState([])
  const [nickname, setNickname] = useState([])
  const [phone, setPhone] = useState([])
  const [email, setEmail] = useState([])
  const [position, setPosition] = useState([])

  const applyFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/apply/1')
      setApply(res.data.body)
      console.log(res.data.body)
      setPosition(getPositionName(res.data.body.positionCode))
    } catch (error) {
      console.log(error)
    }
  }

  const userFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/user/1')
      setNickname(res.data.body.nickname)
      setPhone(res.data.body.phone)
      setEmail(res.data.body.email)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApplyRemove = () => {}
  useEffect(() => {
    applyFetch()
    userFetch()
  }, [])

  return (
    <CssVarsProvider>
      <div className="container">
        <div className="project-name-section">
          <div className="project-name-label">프로젝트 이름</div>
          <div className="project-title">
            <div className="title">싸피 프로젝트 모집</div>
          </div>
          <hr />
        </div>
        <div className="apply-section">
          <div className="application-detail-section">
            <div className="name-position-section">
              <div className="name-section">
                <div className="label">이름</div>
                <div>{nickname}</div>
              </div>
              <div className="position-section">
                <div className="label">포지션</div>
                <div>{position}</div>
              </div>
            </div>
            <div className="phone-section">
              <div className="label">전화번호</div>
              <div>{phone}</div>
            </div>
            <div className="email-section">
              <div className="label">이메일</div>
              <div>{email}</div>
            </div>
            <div className="skill-section">
              <div className="label">사용기술</div>
              <div>기술1</div>
            </div>
          </div>
          <div className="career-exp-section">
            <div className="career-section">
              <div className="career-label">
                <div className="label">경력</div>
                <hr />
              </div>
              <div>
                {apply.applyCareerList &&
                  apply.applyCareerList.map((career, index) => (
                    <div className="career" key={career.applySeq + index}>
                      {career.content}
                    </div>
                  ))}
              </div>
            </div>
            <div className="exp-section">
              <div className="exp-label">
                <div className="label">경험</div>
                <hr />
              </div>
              <div>
                {apply.applyExpList &&
                  apply.applyExpList.map((exp, index) => (
                    <div className="exp" key={exp.applySeq + index}>
                      {exp.content}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="content-section">
            <div className="label">하고싶은 말</div>
            <div className="content">{apply.content}</div>
          </div>
          <div className="question-answer-section">
            <div className="label">공고 작성자가 궁금한 점</div>
            <div>
              <div>Q1.질문1</div>
              <div>answer</div>
              <div>Q1.질문1</div>
              <div>answer</div>
              <div>Q1.질문1</div>
              <div>answer</div>
            </div>
          </div>
        </div>
        <div className="submit-section">
          <CustomButton variant="contained" startIcon={<CancelIcon />} onClick={handleApplyRemove}>
            지원 취소
          </CustomButton>
        </div>
      </div>
    </CssVarsProvider>
  )
}
export default Application
