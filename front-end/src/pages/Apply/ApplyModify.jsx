import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import '../../assets/styles/applyRegister.css'
import styled from 'styled-components'
import Skill from '../../data/Skilldata'
import { getPositionName, getPositionCode } from 'data/Positiondata'
import QnAList from 'components/Apply/QnaList'
import SkillList from 'components/Apply/SkillList'
import MeetingDtSelect from 'components/Meeting/MeetingDtSelect'
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()

  const userSeq = 1
  const postingSeq = 458
  const applySeq = location.state.applySeq

  // start >> useState

  const [user, setUser] = useState([])
  const [posting, setPosting] = useState([{}])
  const [apply, setApply] = useState([{}])
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
      setQuestionList(res.data.body.postingQuestionList)
    } catch (error) {
      console.log(error)
    }
  }

  const applyFetch = async () => {
    try {
      // const res = await axios.get(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
      const res = {
        data: {
          header: {
            code: '200',
            message: '성공',
          },
          body: {
            userSeq: 2,
            postingSeq: 458,
            content: '저는 프로젝트 팀 구하는 게 힘들었던 경험이 있어 이 프로젝트에 지원합니다.',
            position: {
              code: 'PO100',
              name: 'frontend',
              groupCode: 'PO',
              groupName: '포지션 구분',
            },
            answerList: [
              {
                applyAnswerSeq: 4,
                applySeq: 22,
                postingSeq: 458,
                postingQuestionSeq: 81,
                content: '답변 테스트1',
                regDt: [2023, 1, 31, 14, 39, 44],
              },
            ],
            careerList: [
              {
                applyCareerSeq: 16,
                applySeq: 22,
                content: '경력1',
              },
              {
                applyCareerSeq: 17,
                applySeq: 22,
                content: '경력2',
              },
            ],
            expList: [
              {
                applyExpSeq: 13,
                applySeq: 22,
                content: '경험1',
              },
              {
                applyExpSeq: 14,
                applySeq: 22,
                content: '경험2',
              },
            ],
            skillList: [
              {
                code: 'AI100',
                name: 'keras',
                groupCode: 'AI',
                groupName: '인공지능 기술스택 구분',
              },
              {
                code: 'AI101',
                name: 'matplotlib',
                groupCode: 'AI',
                groupName: '인공지능 기술스택 구분',
              },
            ],
            postingMeeting: {
              postingMeetingSeq: 314,
              postingSeq: 458,
              applySeq: 22,
              fromUserSeq: 1,
              toUserSeq: 2,
              meetingDt: '2023-01-29 16:33:58.000',
              postingMeetingCode: 'PM100',
              code: {
                code: 'PM100',
                name: '미팅전',
                groupCode: 'PM',
                groupName: '사전미팅 상태구분',
              },
            },
          },
        },
      }

      console.log(applySeq)
      console.log(apply)

      setApply(res.data.body)
      careerFetchFilter(res.data.body.careerList)
      expFetchFilter(res.data.body.careerList)
      skillFetchFilter(res.data.body.skillList)
      setPosition(res.data.body.position.name)
      setContent(res.data.body.content)
      setAnswerList(res.data.body.answerList)
      setMeetingSeq(res.data.body.postingMeeting.postingMeetingSeq)
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
      if (item.postingMeetingCode === 'PM102') {
        meetingDtArr.push({
          postingMeetingSeq: item.postingMeetingSeq,
          meetingDt: item.meetingDt,
          applyAnswerSeq: item.applyAnswerSeq,
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
    list.map((item) => skillArr.push(Skill.getSkillCode(item)))
    return skillArr
  }

  const answerPostFilter = (list) => {
    const answerArr = []
    list.map((item) =>
      answerArr.push({
        applyAnswerSeq: item.applyAnswerSeq,
        content: item.content,
      })
    )
    return answerArr
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
  }

  const handleApplySubmit = async () => {
    const userSeq = 1
    const postingSeq = 458
    try {
      const req = {
        applyAnswerList: answerPostFilter(answerList),
        applyCareerList: careerPostFilter(careerList),
        applyExpList: expPostFilter(expList),
        applySkillList: skillPostFilter(skillList),
        content,
        postingMeetingSeq: meetingSeq,
        positionCode: getPositionCode(position),
        userSeq,
      }
      console.log(req)
      await axios
        .put(process.env.REACT_APP_API_URL + '/apply/' + postingSeq, req)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      console.log('지원서 put')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userFetch()
    postingFetch()
    applyFetch()
  }, [])

  return (
    <div className="apply-register-container">
      <div className="apply-register-width-section">
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
                meetingSeq={meetingSeq}
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
                defaultValue={content || ''}
                onChange={handleContentChange}
              />
            </div>
          </div>
          <div className="question-answer-section">
            <div className="question-section">
              <Label className="label">지원자에게 궁금한 점</Label>
            </div>
            <div className="answer-section">
              <QnAList questionList={questionList} answerList={answerList} onChange={handleQnAChange}></QnAList>
            </div>
          </div>
        </div>
        <div className="submit-button">
          <button className="apply-button" onClick={handleApplySubmit}>
            지원하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplyRegister
