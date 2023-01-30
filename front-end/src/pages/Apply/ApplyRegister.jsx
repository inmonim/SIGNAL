import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import '../../assets/styles/applyRegister.css'
import styled from 'styled-components'

import Skilldata from 'data/Skilldata'
import { getPositionName, getPositionCode } from 'data/Positiondata'
import QnAList from 'components/Apply/QnaList'
import SkillList from 'components/Apply/SkillList'
import MeetingDtSelect from 'components/Apply/MeetingDtSelect'

const Container = styled.section`
  padding: 50px 500px;
`

const width = {
  minWidth: '800px',
}

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: bold;
  padding-bottom: 40px;
  border-bottom: 5px solid #796fb2;
`

const Label = styled.h1`
  font-size: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`

const inputStyle = {
  backgroundColor: '#f3f5f7',
  position: 'static',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

const positionSelectStyle = {
  backgroundColor: '#f3f5f7',
  width: '11.5em',
  position: 'static',
}

function ApplyRegister() {
  const userSeq = 1
  const postingSeq = 458

  // start >> useState

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
  const [meeting, setMeeting] = useState('')
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

  const profileFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/profile/' + userSeq)
      careerFetchFilter(res.data.body.userCareerList)
      expFetchFilter(res.data.body.userExpList)
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
    list.map((item, index) => meetingDtArr.push(item.meetingDt))
    setMeetingList(meetingDtArr)
  }

  const CareerPostFilter = (list) => {
    const careerArr = []
    list.map((item) => careerArr.push(item.content))
    return careerArr
  }

  const ExpPostFilter = (list) => {
    const expArr = []
    list.map((item) => expArr.push(item.content))
    return expArr
  }

  // start >> handle position

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }
  // end >> handle position

  // start >> handle skill

  const handleSkillInput = (value) => {
    const skillArr = [...skillList]
    skillArr.push(value)
    setSkillList(skillArr)
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
    setMeeting(meetingList[key])
    console.log(meetingList)
  }

  const handleApplySubmit = async () => {
    const userSeq = 1
    const postingSeq = 458
    try {
      const req = {
        applyAnswerList: answerList,
        applyCareerList: CareerPostFilter(careerList),
        applyExpList: ExpPostFilter(expList),
        applySkillList: skillList,
        content,
        fieldCode: posting.fieldCode,
        meetingDt: meeting,
        positionCode: getPositionCode(position),
        postingSeq,
        userSeq,
      }
      console.log(req)
      const config = { 'Content-Type': 'application/json' }
      await axios
        .post('.', req, config)
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
  }

  useEffect(() => {
    userFetch()
    postingFetch()
    profileFetch()
  }, [])

  return (
    <Container>
      <div style={width}>
        <div>
          <Title>{user.nickname} 님의지원서</Title>
        </div>
        <div>
          <div className="user-detail-section">
            <div className="phone-section">
              <Label>전화번호 </Label>
              <TextField disabled value={user.phone || ''} sx={inputStyle} />
            </div>
            <div className="email-section">
              <Label>이메일</Label>
              <TextField disabled value={user.email || ''} sx={inputStyle} />
            </div>
          </div>
          <div className="position-section">
            <div>
              <Label className="label">원하는 포지션</Label>
              <FormControl style={positionSelectStyle}>
                <InputLabel id="demo-simple-select-label" sx={{ inputStyle, width: '11.5em' }}></InputLabel>
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
          <div className="skill-meeting-section">
            <div className="skill-section">
              <Label className="label">사용기술</Label>
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
                  />
                )}
              />
              <SkillList skillList={skillList} onRemove={handleSkillRemove}></SkillList>
            </div>
            <div className="meeting-section">
              <Label className="label">화상미팅 예약</Label>
              <MeetingDtSelect
                open={open}
                meetingList={meetingList}
                onChange={handleMeetingDtChange}
                meeting={meeting}
              ></MeetingDtSelect>
            </div>
          </div>
          <div className="career-exp-section">
            <div className="career-section">
              <div>
                <div className="career-label">
                  <Label>경력</Label>
                  <img src={plusButton} alt="plusButton" className="plus-button" onClick={handleCareerAdd} />
                </div>
                <hr></hr>
              </div>
              <CareerList
                careerList={careerList}
                onRemove={handleCareerRemove}
                onChange={handleCareerChange}
              ></CareerList>
            </div>
            <div className="exp-section">
              <div>
                <div className="exp-label">
                  <Label>경험</Label>
                  <img src={plusButton} alt="plusButton" className="plus-button" onClick={handleExpAdd} />
                </div>
                <hr></hr>
              </div>
              <ExpList expList={expList} onRemove={handleExpRemove} onChange={handleExpChange}></ExpList>
            </div>
          </div>
          <div className="content-section">
            <Label className="label">하고싶은 말</Label>
            <div>
              <TextField
                style={textAreaStyle}
                fullWidth={true}
                multiline={true}
                minRows="5"
                onChange={handleContentChange}
              />
            </div>
          </div>
          <div className="question-answer-section">
            <div className="question-section">
              <Label className="label">지원자에게 궁금한 점</Label>
            </div>
            <div className="answer-section">
              <QnAList questionList={questionList} onChange={handleQnAChange}></QnAList>
            </div>
          </div>
        </div>
        <div className="submit-button">
          <button className="apply-button" onClick={handleApplySubmit}>
            지원하기
          </button>
        </div>
      </div>
    </Container>
  )
}

export default ApplyRegister
