import React, { useState, useEffect } from 'react'

import '../../assets/styles/applyDetail.css'
import '../../assets/styles/skill.css'
import axios from 'axios'

import { getPositionName } from 'data/Positiondata'

import ApplyDelete from './ApplyDelete'
import skillImage from '../../assets/image/Skilltest/React.png'

function ApplyDetail() {
  const useSeq = 1
  const applySeq = 1

  const [apply, setApply] = useState([])
  const [user, setUser] = useState([])
  const [position, setPosition] = useState([])

  const applyFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
      setApply(res.data.body)
      setPosition(getPositionName(res.data.body.position.code))
      console.log(res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const userFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/user/' + useSeq)
      setUser(res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    applyFetch()
    userFetch()
  }, [])

  return (
    <div className="container">
      <div className="project-container">
        <div className="project-section">
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
                  <div>{user.nickname}</div>
                </div>
                <div className="position-section">
                  <div className="label">포지션</div>
                  <div>{position}</div>
                </div>
              </div>
              <div className="phone-section">
                <div className="label">전화번호</div>
                <div>{user.phone}</div>
              </div>
              <div className="email-section">
                <div className="label">이메일</div>
                <div>{user.email}</div>
              </div>
              <div className="skill-section">
                <div className="label">사용기술</div>
                <div className="skillList-section">
                  {apply.skillList &&
                    apply.skillList.map((skill, index) => (
                      <div className="skill" key={index}>
                        <img src={skillImage} alt="skillImage" className="skill-image" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="career-exp-section">
              <div className="career-section">
                <div className="career-label">
                  <div className="label">경력</div>
                  <hr />
                </div>
                <div>
                  {apply.careerList &&
                    apply.careerList.map((career, index) => (
                      <div className="career" key={index}>
                        {career}
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
                  {apply.expList &&
                    apply.expList.map((exp, index) => (
                      <div className="exp" key={index}>
                        {exp}
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
              <div></div>
            </div>
          </div>
          <div className="submit-section">
            <ApplyDelete open={open} applySeq={applySeq}></ApplyDelete>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ApplyDetail
