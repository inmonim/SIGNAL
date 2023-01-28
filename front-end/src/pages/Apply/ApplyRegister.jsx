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
import { getPositionName } from 'data/Positiondata'
import QnAList from 'components/Apply/QnaList'
import SkillList from 'components/Apply/SkillList'
import MeetingDtSelect from 'components/Apply/MeetingDtSelect'

const Container = styled.section`
  padding: 100px 25em;
`

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

const Apply = () => {
  const [user, setUser] = useState([])
  const [posting, setPosting] = useState([{}])
  const [profile, setProfile] = useState([])

  const [position, setPosition] = useState(['frontend'])
  // default 값 front-end

  const [careerList, setCareerList] = useState([])
  const [expList, setExpList] = useState([])

  // const [answerList, setAnswerList] = useState([])
  const [skillList, setSkillList] = useState([])

  const [content, setContent] = useState([])
  const [qnaList, setQnaList] = useState([])

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }

  const userFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/user/1')
      setUser(res.data.body)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const postingFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/posting/1')
      setPosting(res.data.body)
      const qnaArr = []
      res.data.body.postingQuestionList.map(() => qnaArr.push(''))
      setQnaList(qnaArr)
      console.log(res.data.body)
    } catch (error) {
      console.log(error)
    }
  }

  const profileFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/profile/1')
      setProfile(res.data.body)
      console.log(res)
      console.log(profile)
    } catch (error) {
      console.log(error)
    }
  }

  const handleExpAdd = () => {
    const expArr = [...expList]
    const exp = ''
    expArr.push(exp)
    setExpList(expArr)
    console.log(expList)
  }

  const handleCareerAdd = () => {
    const careerArr = [...careerList]
    const career = ''
    careerArr.push(career)
    setCareerList(careerArr)
    console.log(careerList)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }

  const handleApplySubmit = async (event) => {
    const regDt = new Date()
    console.log(regDt)
    const regDtreq =
      regDt.getFullYear() +
      '-' +
      regDt.getMonth() +
      '-' +
      regDt.getDate() +
      ' ' +
      regDt.getHours() +
      ':' +
      regDt.getMinutes() +
      ':' +
      regDt.getSeconds()
    try {
      const req = {
        applyAnswerList: [],
        applyCareerList: careerList,
        applyExpList: expList,
        applySkillList: [],
        content,
        fieldCode: 'FI100',
        applyCode: 'AS101',
        meetingDt: '2023-01-01 11:00:00.000',
        memo: '이 지원자는 열정이 있음',
        positionCode: 'PO100',
        postingSeq: 1,
        userSeq: 1,
      }
      console.log('regDtreq')
      console.log(regDtreq)
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

  const handleExpRemove = (id) => {
    setExpList(
      expList.filter((exp) => {
        return exp.id !== id
      })
    )
  }

  const handleCareerRemove = () => {
    const careerArr = [...careerList]
    setCareerList(careerArr) ///
  }

  useEffect(() => {
    userFetch()
    postingFetch()
    profileFetch()
  }, [])

  const skillSearchFilter = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.name,
  })

  const handleCareerInput = (value, key) => {
    const careerArr = [...careerList]
    careerArr.splice(key, 1, value)
    setCareerList(careerArr)
  }

  const handleExpInput = (value, key) => {
    const expArr = [...expList]
    expArr.splice(key, 1, value)
    setExpList(expArr)
  }

  const handleQnAChange = (value, key) => {
    const qnaArr = [...qnaList]
    qnaArr.splice(key, 1, value)
    setQnaList(qnaArr)
    console.log(qnaList)
  }

  const handleSkillInput = (value) => {
    const skillArr = [...skillList]
    skillArr.push(value)
    setSkillList(skillArr)
    console.log(skillArr)
  }

  return (
    <Container>
      <div>
        <div>
          <Title>{user.nickname} 님의지원서</Title>
        </div>
        <div>
          <div className="user-detail-section">
            <div className="phone-section">
              <Label>전화번호 </Label>
              <TextField disabled value={user.phone} sx={inputStyle} />
            </div>
            <div className="email-section">
              <Label>이메일</Label>
              <TextField disabled value={user.email} sx={inputStyle} />
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
                  value={position}
                  onChange={handlePositionChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {posting.postingPositionList &&
                    posting.postingPositionList.map((item, index) => (
                      <MenuItem value={getPositionName(item.positionCode)} key={item.positionCode + index}>
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
                        console.log('enter')
                        console.log(e.target.value)
                        handleSkillInput(e.target.value)
                      }
                    }}
                  />
                )}
              />
              <SkillList skillList={skillList}></SkillList>
            </div>
            <div className="meeting-section">
              <Label className="label">화상미팅 예약</Label>
              <MeetingDtSelect></MeetingDtSelect>
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
                onChange={handleCareerInput}
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
              <ExpList expList={expList} onRemove={handleExpRemove} onChange={handleExpInput}></ExpList>
            </div>
          </div>

          <div className="content-section">
            <Label className="label">하고싶은 말</Label>
            <div>
              <TextField style={textAreaStyle} fullWidth={true} multiline={true} minRows="5" onChange={handleContent} />
            </div>
          </div>

          <div className="question-answer-section">
            <div className="question-section">
              <Label className="label">지원자에게 궁금한 점</Label>
            </div>
            <div className="answer-section">
              <QnAList qnaList={posting.postingQuestionList} onChange={handleQnAChange}></QnAList>
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

export default Apply
