import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import '../../assets/styles/applyRegister.css'
import Skill from '../../data/Skilldata'
import { getPositionName, getPositionCode } from 'data/Positiondata'
import QnAList from 'components/Apply/QnaList'
import SkillList from 'components/Apply/SkillList'
import MeetingDtSelect from 'components/Meeting/MeetingDtSelect'
import { useNavigate } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'

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
  const userSeq = 1
  const postingSeq = 458

  // start >> useState
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [posting, setPosting] = useState([{}])
  const [position, setPosition] = useState('')
  const [careerList, setCareerList] = useState([])
  const [expList, setExpList] = useState([])
  const [skillList, setSkillList] = useState([])
  const [content, setContent] = useState([])
  const [questionList, setQuestionList] = useState([])
  const [answerList, setAnswerList] = useState([])
  const [careerSeq, setCareerSeq] = useState(0)
  const [expSeq, setExpSeq] = useState(0)
  const [meetingList, setMeetingList] = useState([])
  const [meetingSeq, setMeetingSeq] = useState('')
  // ene >> useState

  // start >> Fetch
  const userFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/user/' + userSeq)
      setUser(res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const postingFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      setPosting(res.data.body)
      const answerArr = []
      res.data.body.postingQuestionList.map((item) =>
        answerArr.push({
          postingQuestionSeq: item.postingQuestionSeq,
          content: '',
        })
      )
      meetingFetchFilter(res.data.body.postingMeetingList)
      setAnswerList(answerArr)
      console.log(res.data.body)
      setQuestionList(res.data.body.postingQuestionList)
    } catch (error) {
      console.log(error)
    }
  }

  const qnaListDataFormat = () => {
    const qnaArr = []
    questionList.map((item, index) =>
      qnaArr.push({
        postingQuestionSeq: item.postingQuestionSeq,
        content: item.content,
        defaultValue: '',
      })
    )

    setQuestionList(qnaArr)
  }

  const profileFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/profile/' + userSeq)
      careerFetchFilter(res.data.body.userCareerList)
      expFetchFilter(res.data.body.userExpList)
      console.log(res.data.body)
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
        seq: index,
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
        seq: index,
        content: item.content,
      })
    )
    setExpSeq(list.length)
    setExpList(expArr)
  }

  const meetingFetchFilter = (list) => {
    const meetingDtArr = []
    list.forEach((item) => {
      if (item.postingMeetingCode === 'PM102') {
        meetingDtArr.push({
          postingMeetingSeq: item.postingMeetingSeq,
          meetingDt: item.meetingDt,
        })
      }
    })

    setMeetingList(meetingDtArr)
    console.log('meetingDtArr', meetingDtArr)
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
    list.map((item) => skillArr.push(Skill.getSkillCode(item)))
    return skillArr
  }

  // start >> handle position

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }
  // end >> handle position

  // start >> handle skill

  const handleSkillInput = (value) => {
    const skillArr = [...skillList, value]
    console.log(skillArr)
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
    const answerArr = [...answerList]
    answerList.forEach((item, index) => {
      if (item.postingQuestionSeq === key) {
        answerArr.splice(index, 1, {
          postingQuestionSeq: key,
          content: value,
        })
      }
    })

    setAnswerList(answerArr)
  }

  // end >> handle qna

  const handleMeetingDtChange = (key) => {
    setMeetingSeq(key)
    console.log(key)

    // console.log(postingMeetingList[key].postingMeetingCode)
  }

  const handleApplySubmit = async () => {
    const userSeq = 1
    const postingSeq = 458
    try {
      const req = {
        applyAnswerList: answerList,
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
        .post(process.env.REACT_APP_API_URL + '/apply/' + postingSeq, req, config)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('지원서 post')
    } catch (error) {
      console.log(error)
    }
    navigate('/')
  }

  useEffect(() => {
    userFetch()
    postingFetch()
    profileFetch()
    qnaListDataFormat()
  }, [])

  return (
    <div className="apply-register-container">
      <div className="apply-register-width-section">
        <div>
          <div className="apply-register-title">{user.nickname} 님의지원서</div>
        </div>
        <hr className="apply-register-hr" />
        <div className="apply-register-application-section">
          <div className="apply-register-user-detail-section">
            <div className="apply-register-phone-section">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="apply-register-label">전화번호 </div>
                <TextField disabled value={user.phone || ''} sx={inputStyle} />
              </div>
            </div>
            <div className="apply-register-email-section">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="apply-register-label">이메일</div>
                <TextField disabled value={user.email || ''} sx={inputStyle} />
              </div>
            </div>
          </div>
          <div className="apply-register-position-meeting-section">
            <div className="apply-register-position-section">
              <div style={{ display: 'flex' }}>
                <div className="apply-register-label" style={{ display: 'flex', alignItems: 'center' }}>
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
            <div className="apply-register-meeting-section">
              <div style={{ display: 'flex' }}>
                <div className="apply-register-label" style={{ display: 'flex', alignItems: 'center' }}>
                  화상미팅 예약
                </div>
                <div>
                  <MeetingDtSelect
                    open={open}
                    meetingList={meetingList}
                    onChange={handleMeetingDtChange}
                    meetingSeq={meetingSeq}
                  ></MeetingDtSelect>
                </div>
              </div>
            </div>
          </div>
          <div className="apply-register-skill-section">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ minWidth: '12.5%', alignItems: 'center' }}>
                <span className="apply-register-label">사용기술</span>
              </div>
              <div>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  sx={{ width: 300 }}
                  options={Skill.Skilldata}
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
          </div>
          <div className="apply-register-career-exp-section">
            <div style={{ width: '50%' }}>
              <div className="apply-register-career-section">
                <div className="apply-register-career-label">
                  <div style={{ padding: '0px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>경력</div>
                      <img
                        src={plusButton}
                        alt="plusButton"
                        className="apply-register-plus-button"
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
              <div className="apply-register-exp-section">
                <div className="apply-register-exp-label">
                  <div style={{ padding: '0px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>경험</span>
                      <img
                        src={plusButton}
                        alt="plusButton"
                        className="apply-register-plus-button"
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
          <div className="apply-register-content-section">
            <div className="apply-register-label">하고싶은 말</div>
            <TextField
              style={textAreaStyle}
              fullWidth={true}
              multiline={true}
              minRows="5"
              onChange={handleContentChange}
            />
          </div>
          <div className="apply-register-question-answer-section">
            <div className="apply-register-question-section">
              <div className="apply-register-label">지원자에게 궁금한 점</div>
            </div>
            <div style={{ margin: '10px 0px' }}>
              <QnAList questionList={questionList} onChange={handleQnAChange}></QnAList>
            </div>
          </div>
        </div>
        <div className="apply-register-submit-button">
          <SignalBtn onClick={handleApplySubmit} style={{ width: '50%' }}>
            지원하기
          </SignalBtn>
        </div>
      </div>
    </div>
  )
}

export default ApplyRegister
