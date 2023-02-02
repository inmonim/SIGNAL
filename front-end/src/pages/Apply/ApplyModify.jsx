import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import '../../assets/styles/applyRegister.css'
import { Skilldata, getSkillCode } from 'data/Skilldata'
import { getPositionName, getPositionCode } from 'data/Positiondata'
import SkillList from 'components/Apply/SkillList'
import MeetingDtSelect from 'components/Meeting/MeetingDtSelect'
import { useNavigate } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'
import moment from 'moment/moment'
import QnaList from 'components/Apply/QnaList'
// import { useNavigate, useLocation } from 'react-router-dom'

const inputStyle = {
  backgroundColor: '#f3f5f7',
  position: 'static',
  width: '300px',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
  margin: '10px 0px',
}

function ApplyRegister() {
  // const location = useLocation()
  // const applySeq = location.state.applySeq

  const userSeq = 82
  const postingSeq = 458
  const applySeq = 1

  const navigate = useNavigate()

  // start >> useState

  const [user, setUser] = useState([])
  const [posting, setPosting] = useState([{}])
  const [apply, setApply] = useState([{}])
  const [position, setPosition] = useState('')
  const [careerList, setCareerList] = useState([])
  const [expList, setExpList] = useState([])
  const [skillList, setSkillList] = useState([])
  const [content, setContent] = useState([])
  const [qnaList, setQnaList] = useState()
  const [careerSeq, setCareerSeq] = useState(0)
  const [expSeq, setExpSeq] = useState(0)
  const [meetingList, setMeetingList] = useState([])
  const [meetingSeq, setMeetingSeq] = useState('')
  const [meetingDafault, setMeetingDafault] = useState('')
  const [meetingValid, setMeetingValid] = useState(true)
  // ene >> useState

  // start >> Fetch
  const userFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/user/' + userSeq)
      setUser(res.data.body)
      console.log('user', res.data.body)
      console.log('user', res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const postingFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      setPosting(res.data.body)
      console.log(res.data.body)
      const answerArr = []
      res.data.body.postingQuestionList.map((item) =>
        answerArr.push({
          postingQuestionSeq: item.postingQuestionSeq,
          content: '',
          applyAnswerSeq: '',
        })
      )
      meetingFetchFilter(res.data.body.postingMeetingList)
    } catch (error) {
      console.log(error)
    }
  }

  const applyFetch = async () => {
    try {
      const applyRes = await axios.get(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
      const postingRes = await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)

      setApply(applyRes.data.body)
      careerFetchFilter(applyRes.data.body.careerList)
      expFetchFilter(applyRes.data.body.expList)
      skillFetchFilter(applyRes.data.body.skillList)
      setPosition(applyRes.data.body.position.name)
      setContent(applyRes.data.body.content)
      qnaListDataFiltert(applyRes.data.body, postingRes.data.body)
      setMeetingSeq(applyRes.data.body.postingMeeting.postingMeetingSeq)
      console.log('meetingSeq', applyRes.data.body.postingMeeting.postingMeetingSeq)
      console.log(apply)
      console.log('applyRes.data.body', applyRes.data.body)
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
        setMeetingDafault(item.meetingDt)
        meetingDtArr.push({
          postingMeetingSeq: item.postingMeetingSeq,
          meetingDt: item.meetingDt,
        })
      }
    })

    setMeetingList(meetingDtArr)
  }

  const skillFetchFilter = (list) => {
    const skillArr = []
    list.forEach((item) => {
      skillArr.push(item.name)
    })

    setSkillList(skillArr)
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
    list.map((item) => skillArr.push(getSkillCode(item)))
    return skillArr
  }

  const answerPostFilter = (list) => {
    console.log('listdf', list)
    const answerArr = []
    list.map((item) =>
      answerArr.push({
        applyAnswerSeq: item.applyAnswerSeq,
        content: item.defaultValue,
      })
    )
    console.log('answerArr', answerArr)

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
    console.log('qnaArr', qnaArr)
    setQnaList(qnaArr)
  }

  // start >> handle position

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }
  // end >> handle position

  // start >> handle skill

  const handleSkillInput = (value) => {
    const skillArr = [...skillList, value]
    const set = new Set(skillArr)
    const uniqueArr = Array.from(set)
    setSkillList(uniqueArr)
  }

  const handleSkillRemove = (id) => {
    setSkillList(
      skillList.filter((skill) => {
        return skill !== id
      })
    )
  }

  // start >> skill filter
  const skillSearchFilter = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.name,
  })

  // end >> skill filter

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
    console.log(newExpArr)
    setExpList(newExpArr)
  }

  const handleExpRemove = (key) => {
    console.log(key)
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
    console.log(key)
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
    console.log(qnaArr)
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
        applySkillList: skillPostFilter(skillList),
        content,
        postingMeetingSeq: parseInt(meetingSeq),
        positionCode: getPositionCode(position),
        userSeq,
      }
      console.log(JSON.stringify(req))
      const config = { 'Content-Type': 'application/json' }
      await axios
        .put(process.env.REACT_APP_API_URL + '/apply/' + applySeq, req, config)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('지원서 put')
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }
  // end >> handle put

  useEffect(() => {
    userFetch()
    postingFetch()
    applyFetch()
  }, [])

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
                    value={position || ''}
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
                    meetingDafault !== '' ? (
                      <div style={{ textAlign: 'center' }}>{moment(meetingDafault).format('YYYY-MM-DD HH:MM')}</div>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="apply-modify-skill-section">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ minWidth: '12.5%', alignItems: 'center' }}>
                <span className="apply-modify-label">사용기술</span>
              </div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: 300 }}
                options={Skilldata}
                getOptionLabel={(option) => option.name}
                filterOptions={skillSearchFilter}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleSkillInput(e.target.value)
                      }
                    }}
                    sx={inputStyle}
                  />
                )}
              />
            </div>
          </div>
          <div style={{ display: 'inline-block', marginRight: '7px' }}>
            <SkillList skillList={skillList} onRemove={handleSkillRemove}></SkillList>
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

export default ApplyRegister
