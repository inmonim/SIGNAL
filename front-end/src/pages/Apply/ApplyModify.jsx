import React, { useState, useEffect } from 'react'
import { TextField, MenuItem, InputLabel, FormControl, Select, Chip } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
import '../../assets/styles/applyRegister.css'
import { Skilldata } from 'data/Skilldata'
import { getPositionName, getPositionCode } from 'data/Positiondata'
import MeetingDtSelect from 'components/Meeting/MeetingDtSelect'
import { useNavigate, useLocation } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'
import moment from 'moment/moment'
import QnaList from 'components/Apply/QnaList'
import ReactSelect from 'react-select'
import { changeSelectForm } from 'utils/changeForm'

import api from 'api/Api.js'
import Swal from 'sweetalert2'

const inputStyle = {
  backgroundColor: '#f3f5f7',
  position: 'static',
  width: '300px',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
  margin: '10px 0px',
}

function ApplyModify() {
  const location = useLocation()

  const userSeq = sessionStorage.getItem('userSeq')
  const applySeq = location.state.applySeq

  const navigate = useNavigate()

  // start >> useState

  const [user, setUser] = useState([])
  const [posting, setPosting] = useState([{}])
  const [position, setPosition] = useState('')
  const [careerList, setCareerList] = useState([])
  const [expList, setExpList] = useState([])
  const [content, setContent] = useState([])
  const [qnaList, setQnaList] = useState()
  const [careerSeq, setCareerSeq] = useState(0)
  const [expSeq, setExpSeq] = useState(0)
  const [meetingList, setMeetingList] = useState([])
  const [meetingSeq, setMeetingSeq] = useState('')
  const [meetingDafault, setMeetingDefault] = useState('')
  const [meetingValid, setMeetingValid] = useState(true)
  const [numberOfTags, setNumberOfTags] = useState(0)
  const [arrayOfTags, addTag] = useState([])
  // end >> useState

  // start >> Fetch
  const dataFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/user/' + userSeq).then((res) => {
        setUser(res.data.body)
      })

      const applyRes = await api.get(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
      const postingRes = await api.get(process.env.REACT_APP_API_URL + '/posting/' + applyRes.data.body.postingSeq)

      careerFetchFilter(applyRes.data.body.careerList)
      expFetchFilter(applyRes.data.body.expList)
      setPosition(applyRes.data.body.position.name)
      setContent(applyRes.data.body.content)
      qnaListDataFiltert(applyRes.data.body, postingRes.data.body)
      meetingFetchFilter(postingRes.data.body.postingMeetingList)
      setMeetingDefault(applyRes.data.body.postingMeeting.meetingDt)
      setMeetingSeq(applyRes.data.body.postingMeeting.postingMeetingSeq)
      setPosting(postingRes.data.body)
      addTag(changeSelectForm(applyRes.data.body.skillList))
      setNumberOfTags(changeSelectForm(applyRes.data.body.skillList).length)
    } catch (error) {
      console.log(error)
    }
  }

  // end >> Fetch

  // start >> Data filter

  const careerFetchFilter = (list) => {
    const careerArr = []
    list.map((item, index) =>
      careerArr.push({
        seq: item.applyCareerSeq,
        content: item.content,
      })
    )
    setCareerSeq(list.length)
    setCareerList(careerArr)
  }

  const expFetchFilter = (list) => {
    const expArr = []
    list.map((item, index) =>
      expArr.push({
        seq: item.applyExpSeq,
        content: item.content,
      })
    )
    setExpSeq(list.length)
    setExpList(expArr)
  }

  const meetingFetchFilter = (list) => {
    const meetingDtArr = []
    list.forEach((item) => {
      if (item.postingMeetingCode === 'PM102' || item.postingMeetingSeq === meetingSeq) {
        meetingDtArr.push({
          postingMeetingSeq: item.postingMeetingSeq,
          meetingDt: item.meetingDt,
        })
      }
    })

    setMeetingList(meetingDtArr)
  }

  const careerPostFilter = (list) => {
    const careerArr = []
    list.map((item) => careerArr.push(item.content))
    return careerArr
  }

  const expPostFilter = (list) => {
    const expArr = []
    list.map((item) => expArr.push(item.content))
    return expArr
  }

  const skillPostFilter = (list) => {
    const skillArr = []
    list.map((item) => skillArr.push(item.value))
    return skillArr
  }

  const answerPostFilter = (list) => {
    const answerArr = []
    list.map((item) =>
      answerArr.push({
        applyAnswerSeq: item.applyAnswerSeq,
        content: item.defaultValue,
      })
    )
    return answerArr
  }

  const qnaListDataFiltert = (apply, posting) => {
    const qnaArr = []
    posting.postingQuestionList.map((item, index) =>
      qnaArr.push({
        postingQuestionSeq: item.postingQuestionSeq,
        content: item.content,
        defaultValue: apply.answerList[index].content,
        applyAnswerSeq: apply.answerList[index].applyAnswerSeq,
      })
    )
    setQnaList(qnaArr)
  }

  // start >> handle position

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }
  // end >> handle position

  // start >> handle skill

  const handleSkillInput = (e) => {
    if (e === null) return
    newTag({
      label: e.label,
      value: e.value,
    })
  }

  const newTag = (tag) => {
    const set = arrayOfTags.concat(tag)
    const uniqueTags = set.filter((arr, index, callback) => index === callback.findIndex((t) => t.label === arr.label))
    setNumberOfTags(uniqueTags.length)
    addTag(uniqueTags)
  }

  const tags = arrayOfTags.map((h, index) => (
    <Chip
      label={h.label}
      value={h.value}
      variant="outlined"
      sx={{ fontSize: '20px', margin: '5px' }}
      key={index}
      onDelete={() => handleDelete(h)}
    />
  ))

  const handleDelete = (h) => {
    addTag((arrayOfTags) => arrayOfTags.filter((tag) => tag.label !== h.label))
  }
  // end >> handle skill

  // start >> handle career

  const handleCareerAdd = () => {
    const careerArr = [...careerList]
    const career = {
      seq: careerSeq + 1,
      content: '',
    }
    setCareerSeq(careerSeq + 1)
    careerArr.push(career)
    setCareerList(careerArr)
  }

  const handleCareerChange = (value, key) => {
    const careerArr = [...careerList]
    const newCareerArr = [...careerList]

    for (let index = 0; index < careerArr.length; index++) {
      if (careerArr[index].seq === key) {
        newCareerArr.splice(index, 1, { seq: key, content: value })
      }
    }

    setCareerList(newCareerArr)
  }

  const handleCareerRemove = (key) => {
    setCareerList(careerList.filter((career) => career.seq !== key))
  }

  // end >> handle career

  // start >> handle exp

  const handleExpAdd = () => {
    const expArr = [...expList]
    const exp = {
      seq: expSeq + 1,
      content: '',
    }
    setExpSeq(expSeq + 1)
    expArr.push(exp)
    setExpList(expArr)
  }

  const handleExpChange = (value, key) => {
    const expArr = [...expList]
    const newExpArr = [...expList]

    for (let index = 0; index < expArr.length; index++) {
      if (expArr[index].seq === key) {
        newExpArr.splice(index, 1, { seq: key, content: value })
      }
    }
    setExpList(newExpArr)
  }

  const handleExpRemove = (key) => {
    setExpList(expList.filter((exp) => exp.seq !== key))
  }

  // end >> handle exp

  // start >> handle content

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  // end >> handle content

  // start >> handle qna

  const handleQnAChange = (value, key) => {
    const qnaArr = [...qnaList]
    qnaArr.forEach((item, index) => {
      if (item.postingQuestionSeq === key) {
        qnaArr.splice(index, 1, {
          postingQuestionSeq: key,
          content: item.content,
          applyAnswerSeq: item.applyAnswerSeq,
          defaultValue: value,
        })
      }
    })

    setQnaList(qnaArr)
  }

  // end >> handle qna

  // start >> handle meetingDt
  const handleMeetingDtChange = (key) => {
    setMeetingSeq(key)
    setMeetingValid(false)
  }

  // end >> handle meetingDt

  // start >> handle put

  const handleApplyModify = async () => {
    try {
      const req = {
        applyAnswerList: answerPostFilter(qnaList),
        applyCareerList: careerPostFilter(careerList),
        applyExpList: expPostFilter(expList),
        applySkillList: skillPostFilter(arrayOfTags),
        content,
        postingMeetingSeq: parseInt(meetingSeq),
        positionCode: getPositionCode(position),
        userSeq,
      }

      // 포지션 선택 X
      if (req.positionCode === 'error') {
        Swal.fire('지원서가 완성되지 않았습니다', '포지션을 골라주세요', 'error')
        throw new Error('포지션 선택안함')
      }

      // 미팅 시간 선택X
      if (isNaN(req.postingMeetingSeq)) {
        Swal.fire('지원서가 완성되지 않았습니다', '사전미팅시간을 골라주세요', 'error')
        throw new Error('미팅시간 선택안함')
      }

      await api
        .put(process.env.REACT_APP_API_URL + '/apply/' + applySeq, req)
        .then((res) => {
          navigate(-1)
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.header.code === '402' || error.response.data.header.code === '403') {
              Swal.fire(error.response.data.header.message, '관리자에게 문의해주세요', 'warning')
            } else if (error.response.data.header.code === '405') {
              Swal.fire(error.response.data.header.message, '블랙리스트에 등록된 유저입니다', 'error')
            } else if (error.response.data.header.code === '406') {
              Swal.fire(error.response.data.header.message, '마이페이지를 확인해주세요', 'warning')
            } else if (error.response.data.header.code === '407') {
              Swal.fire(error.response.data.header.message, '하트 충전 후 이용해주세요', 'warning')
            }
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  // end >> handle put

  useEffect(() => {
    dataFetch()
  }, [])

  useEffect(() => {}, [arrayOfTags])

  return (
    <div className="apply-modify-container">
      <div className="apply-modify-width-section">
        <div>
          <div className="apply-modify-title">{user.nickname} 님의지원서</div>
        </div>
        <hr className="apply-modify-hr" />
        <div className="apply-modify-application-section">
          <div className="apply-modify-user-detail-section">
            <div className="apply-modify-phone-section">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="apply-modify-label">전화번호</div>
                <TextField disabled value={user.phone || ''} sx={inputStyle} />
              </div>
            </div>
            <div className="apply-modify-email-section">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="apply-modify-label">이메일</div>
                <TextField disabled value={user.email || ''} sx={inputStyle} />
              </div>
            </div>
          </div>
          <div className="apply-modify-position-meeting-section">
            <div className="apply-modify-position-section">
              <div style={{ display: 'flex' }}>
                <div className="apply-modify-label" style={{ display: 'flex', alignItems: 'center' }}>
                  포지션
                </div>
                <FormControl style={inputStyle}>
                  <InputLabel id="demo-simple-select-label" sx={inputStyle}></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={position}
                    onChange={handlePositionChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {posting.postingPositionList &&
                      posting.postingPositionList.map((item, index) => (
                        <MenuItem value={getPositionName(item.positionCode) || ''} key={item.positionCode + index}>
                          {getPositionName(item.positionCode)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="apply-modify-meeting-section">
              <div style={{ display: 'flex' }}>
                <div className="apply-modify-label" style={{ display: 'flex', alignItems: 'center' }}>
                  화상미팅 예약
                </div>
                <div>
                  <MeetingDtSelect
                    open={open}
                    meetingList={meetingList}
                    onChange={handleMeetingDtChange}
                    meetingSeq={meetingSeq}
                  ></MeetingDtSelect>
                  {meetingValid ? (
                    <div style={{ textAlign: 'center' }}>{moment(meetingDafault).format('YYYY-MM-DD HH')}시</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="apply-modify-skill-section">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ minWidth: '12.5%', alignItems: 'center' }}>
                <span className="apply-modify-label">사용기술</span>
              </div>
              <div className="apply-modify-skill-select">
                <ReactSelect
                  placeholder=""
                  isClearable
                  onChange={handleSkillInput}
                  isSearchable={true}
                  options={changeSelectForm(Skilldata)}
                />
              </div>
            </div>
            <div>{numberOfTags > 0 ? tags : ''}</div>
          </div>
          <div className="apply-modify-career-exp-section">
            <div style={{ width: '50%' }}>
              <div className="apply-modify-career-section">
                <div className="apply-modify-career-label">
                  <div style={{ padding: '0px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>경력</div>
                      <img
                        src={plusButton}
                        alt="plusButton"
                        className="apply-modify-plus-button"
                        onClick={handleCareerAdd}
                      />
                    </div>
                  </div>
                  <hr></hr>
                </div>
                <CareerList
                  careerList={careerList}
                  onRemove={handleCareerRemove}
                  onChange={handleCareerChange}
                ></CareerList>
              </div>
            </div>
            <div style={{ width: '50%' }}>
              <div className="apply-modify-exp-section">
                <div className="apply-modify-exp-label">
                  <div style={{ padding: '0px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>경험</div>
                      <img
                        src={plusButton}
                        alt="plusButton"
                        className="apply-modify-plus-button"
                        onClick={handleExpAdd}
                      />
                    </div>
                  </div>
                  <hr></hr>
                </div>
                <ExpList expList={expList} onRemove={handleExpRemove} onChange={handleExpChange}></ExpList>
              </div>
            </div>
          </div>
          <div className="apply-modify-content-section">
            <div className="apply-modify-label">하고싶은 말</div>
            <TextField
              style={textAreaStyle}
              fullWidth={true}
              multiline={true}
              minRows="5"
              defaultValue={content || ''}
              onChange={handleContentChange}
            />
          </div>
          <div className="apply-modify-question-answer-section">
            <div className="apply-modify-question-section">
              <div className="apply-modify-label">지원자에게 궁금한 점</div>
            </div>
            <div style={{ margin: '10px 0px' }}>
              <QnaList questionList={qnaList} onChange={handleQnAChange}></QnaList>
            </div>
          </div>
        </div>
        <div className="apply-modify-submit-button">
          <SignalBtn onClick={handleApplyModify} style={{ width: '50%' }}>
            수정하기
          </SignalBtn>
        </div>
      </div>
    </div>
  )
}

export default ApplyModify
