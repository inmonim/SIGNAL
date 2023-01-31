import React, { useState, useEffect } from 'react'

import '../../assets/styles/applyDetail.css'
import '../../assets/styles/skill.css'
import axios from 'axios'

import { getPositionName } from 'data/Positiondata'

import ApplyDelete from '../../components/Apply/ApplyDelete'
import skillImage from '../../assets/image/Skilltest/React.png'
// import { useLocation } from 'react-router'

function ApplyDetail() {
  // const location = useLocation()
  // const userSeq = location.state.userSeq
  // const applySeq = location.state.applySeq

  const userSeq = 1
  const applySeq = 22
  const postingSeq = 458
  const [posting, setPosting] = useState('458')

  console.log(applySeq)
  console.log(userSeq)
  const [apply, setApply] = useState([])
  const [user, setUser] = useState([])
  const [position, setPosition] = useState([])

  const applyFetch = async () => {
    console.log(applySeq)
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
      setApply(res.data.body)
      setPosition(getPositionName(res.data.body.position.code))
      postingFetch(res.data.body.postingSeq)
      console.log('Apply', res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const userFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/user/' + userSeq)
      setUser(res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const postingFetch = async () => {
    console.log('postingSeq', postingSeq)
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      setPosting(res.data.body)
      console.log(res.data.body)
      console.log('posting', posting)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    applyFetch()
    userFetch()
  }, [])

  return (
    <div className="apply-detail-container">
      <div className="apply-detail-width-section">
        <div className="apply-detail-project-name-section">
          <div>
            <div className="apply-detail-project-name-label">프로젝트 이름</div>
            <div className="apply-detail-project-title">싸피 프로젝트 모집</div>
          </div>
          <div className="apply-detail-submit-section">
            <ApplyDelete open={open} applySeq={applySeq}></ApplyDelete>
          </div>
        </div>
        <hr className="apply-detail-hr" />
        <div className="apply-detail-application-section">
          <div className="apply-detail-name-position-section">
            <div className="apply-detail-name-section">
              <div style={{ display: 'flex' }}>
                <div className="apply-detail-label">이름</div>
                <div className="apply-detail-text-value">{user.nickname}</div>
              </div>
            </div>
            <div className="apply-detail-position-section">
              <div style={{ display: 'flex' }}>
                <div className="apply-detail-label">포지션</div>
                <div className="apply-detail-text-value">{position}</div>
              </div>
            </div>
          </div>
          <div className="apply-detail-phone-section">
            <div style={{ display: 'flex' }}>
              <div className="apply-detail-label">전화번호</div>
              <div className="apply-detail-text-value">{user.phone}</div>
            </div>
          </div>
          <div className="apply-detail-email-section">
            <div style={{ display: 'flex' }}>
              <div className="apply-detail-label">이메일</div>
              <div className="apply-detail-text-value">{user.email}</div>
            </div>
          </div>
          <div className="apply-detail-skill-section" style={{ display: 'flex' }}>
            <div style={{ minWidth: '12.5%', alignItems: 'center' }}>
              <span className="apply-detail-label">사용기술</span>
            </div>
            <div className="apply-detail-skillList-section">
              {apply.skillList &&
                apply.skillList.map((skill, index) => (
                  <div key={index} style={{ display: 'inline-block', marginRight: '7px' }}>
                    <div className="apply-detail-skill" key={index}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <img src={skillImage} alt="skillImage" className="apply-detail-skill-image" />
                        <span>{skill.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="apply-detail-career-exp-section">
            <div style={{ width: '50%' }}>
              <div className="apply-detail-career-section">
                <div className="apply-detail-career-label">
                  <div className="apply-detail-career-label">경력</div>
                  <hr className="apply-detail-hr-small" />
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '90%' }}>
                    {apply.careerList &&
                      apply.careerList.map((career, index) => (
                        <div className="apply-detail-career" key={index}>
                          {career}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: '50%' }}>
              <div className="apply-detail-exp-section">
                <div className="apply-detail-exp-label">
                  <div className="apply-detail-exp-label">경험</div>
                  <hr className="apply-detail-hr-small" />
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '90%' }}>
                    {apply.expList &&
                      apply.expList.map((exp, index) => (
                        <div className="apply-detail-exp" key={index}>
                          {exp}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="apply-detail-content-section">
            <div className="apply-detail-label">하고싶은 말</div>
            <div className="apply-detail-content">{apply.content}</div>
          </div>
          <div className="apply-detail-question-answer-section">
            <div className="apply-detail-label">공고 작성자가 궁금한 점</div>
            <div style={{ margin: '10px 0px' }}>
              {posting.postingQuestionList &&
                posting.postingQuestionList.map((question, index) => (
                  <div key={index} style={{ margin: '10px 0px' }}>
                    <div className="apply-question-content">{question.content}</div>
                    <div className="apply-answer-content">{apply.answerList[index].content}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ApplyDetail
