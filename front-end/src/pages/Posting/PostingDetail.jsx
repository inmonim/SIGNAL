import React, { useState, useEffect } from 'react'
import '../../assets/styles/applyDetail.css'
import '../../assets/styles/skill.css'
import ApplyDelete from '../../components/Apply/ApplyDelete'
import { Fielddata } from 'data/Fielddata'
import { Button } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Localdata from 'data/Localdata'
// import { useLocation } from 'react-router'

const ApplyModify = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
  },
}))

function PostingDetail() {
  const { id } = useParams()
  // console.log(id)
  // const location = useLocation()
  // const userSeq = location.state.userSeq
  // const applySeq = location.state.applySeq

  const applySeq = 60
  const postingSeq = id

  const [posting, setPosting] = useState()

  const postingGetFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      setPosting(res.data.body)
      console.log(res.data.body)
      // console.log('applyFetch', res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    postingGetFetch()
  }, [])

  return (
    <CssVarsProvider>
      <div className="apply-detail-container">
        <div className="apply-detail-width-section">
          <div className="apply-detail-project-name-section">
            <div>
              <div className="apply-detail-project-name-label">
                마감기한 : {posting ? posting.postingEndDt.slice(0, 10) : null}
              </div>
              <div className="apply-detail-project-title">{posting ? posting.subject : null}</div>
            </div>
            <div className="apply-detail-cancle-section">
              <Link to={'/applymodify'} state={{ applySeq }}>
                <ApplyModify variant="contained" startIcon={<ModeEditIcon />}>
                  지원 수정
                </ApplyModify>
              </Link>
              <ApplyDelete open={open} applySeq={applySeq}></ApplyDelete>
              <button
                onClick={() => {
                  console.log(posting)
                }}
              ></button>
            </div>
          </div>
          <hr className="apply-detail-hr" />
          <div className="apply-detail-application-section">
            <div className="apply-detail-name-position-section2">
              <div className="apply-detail-name-section">
                <div style={{ display: 'flex' }}>
                  <div className="apply-detail-label">프로젝트 기간</div>
                  <div className="apply-detail-text-value">{posting ? posting.term + ' 주' : null}</div>
                </div>
              </div>
              <div className="apply-detail-position-section">
                <div style={{ display: 'flex' }}>
                  <div className="apply-detail-label">분야</div>
                  <div className="apply-detail-text-value">{posting ? Fielddata[posting.fieldCode].name : null}</div>
                </div>
              </div>
            </div>
            <div className="apply-detail-name-position-section2">
              <div className="apply-detail-name-section">
                <div style={{ display: 'flex' }}>
                  <div className="apply-detail-label">진행 유형</div>
                  <div className="apply-detail-text-value">
                    {posting ? (posting.isContact ? '대면' : '비대면') : null}
                  </div>
                </div>
              </div>
              <div className="apply-detail-position-section">
                <div style={{ display: 'flex' }}>
                  <div className="apply-detail-label">진행 지역</div>
                  <div className="apply-detail-text-value">{posting ? Localdata[posting.localCode].name : null}</div>
                </div>
              </div>
            </div>
            <div className="apply-detail-name-position-section2">
              <div className="apply-detail-name-section">
                <div style={{ display: 'flex' }}>
                  <div className="apply-detail-label">난이도</div>
                  <div className="apply-detail-text-value">Level : {posting ? posting.level : null}</div>
                </div>
              </div>
              <div className="apply-detail-position-section">
                <div style={{ display: 'flex' }}>
                  <div className="apply-detail-label">포지션 인원</div>
                  <div className="apply-detail-text-value"></div>
                </div>
              </div>
            </div>

            <div className="apply-detail-skill-section">
              <div style={{ minWidth: '12.5%', alignItems: 'center' }}>
                <span className="apply-detail-skill-label">사용기술</span>
              </div>
              <div className="apply-detail-skillList-section">
                {posting && posting.postingSkillList.map((ele, i) => <p key={i}>{ele.skillCode}</p>)}
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
                    <div style={{ width: '90%' }}></div>
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
                    <div style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="apply-detail-content-section">
              <div className="apply-detail-label">하고싶은 말</div>
              <div className="apply-detail-content"></div>
            </div>
            <div className="apply-detail-question-answer-section">
              <div className="apply-detail-label">공고 작성자가 궁금한 점</div>
              <div style={{ margin: '10px 0px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </CssVarsProvider>
  )
}
export default PostingDetail
