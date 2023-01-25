import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Layout/ExpList'
import CustomSelect from '../../components/common/CustomSelect'

import '../../assets/styles/apply.css'
import styled from 'styled-components'

const userSeq = '1'
const SERVER_URL = 'http://tableminpark.iptime.org:8080'
const PARAM_URL = `/user/${userSeq}`

// const Input = styled.input.attrs({ type: 'text' })`
//   width: 100%;
//   background: #f3f5f7;
//   border: 1px solid #ced4da;
//   border-radius: 8px;
//   padding: 9px 0px 9px 13px;
//   color: #868e96;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
//   width: -webkit-fill-available;
//   &:active {
//     border: 0.5px solid #574b9f !important;
//     border-radius: 8px !important;
//   }
// `

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

const disabledStyle = {
  backgroundColor: '#DDDBEC',
}

const inputStyle = {
  backgroundColor: '#f3f5f7',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

const Apply = () => {
  const [nickname, setNickname] = useState([])
  const [phone, setPhone] = useState([])
  const [email, setEmail] = useState([])
  const [meetingTime, setMeetingTime] = React.useState(null)
  const position = 'FrontEnd'
  const positionList = [
    {
      key: 1,
      name: 'frontEnd',
    },
    {
      key: 2,
      name: 'backEnd',
    },
    {
      key: 3,
      name: 'pm',
    },
    {
      key: 4,
      name: 'dm',
    },
    {
      key: 5,
      name: 'designer',
    },
    {
      key: 6,
      name: '기획',
    },
  ]

  const [expList, setExpList] = useState([])

  // userFetch : setNickName, setPhone, setEmail
  const userFetch = async () => {
    const res = await axios.get(SERVER_URL + PARAM_URL)
    setNickname(res.data.body.nickname)
    setPhone(res.data.body.phone)
    setEmail(res.data.body.email)
  }
  const handleExpAdd = (event) => {
    const expArr = [...expList]
    const exp = {
      title: '',
    }
    expArr.push(exp)
    setExpList(expArr)
  }

  // const [careerList, setCareerList] = useState([])

  // const handleCareerAdd = (event) => {
  //   const careerArr = [...expList]
  //   const career = {
  //     title: '',
  //   }
  //   careerArr.push(career)
  //   setCareerList(careerArr)
  // }

  useEffect(() => {
    userFetch()
    // positionListFetch();
    // setPostion("1");
    // expListFetch();
  }, [])
  return (
    <Container>
      <div>
        <div>
          <Title>{nickname} 님의지원서</Title>
        </div>
        <div>
          <div className="user-detail-section">
            <div className="phone-section">
              <Label>전화번호 </Label>
              <TextField disabled value={phone} style={disabledStyle} />
            </div>
            <div className="email-section">
              <Label>이메일</Label>
              <TextField disabled value={email} style={disabledStyle} />
            </div>
          </div>
          {/* //전화번호 & 이메일 입력 */}
          <div className="position-section">
            <div>
              <Label className="label">원하는 포지션</Label>
              <CustomSelect optionData={positionList} postion={position}></CustomSelect>
            </div>
          </div>

          <div className="skill-meeting-section">
            <div className="skill-section">
              <Label className="label">사용기술</Label>
              {/* autoComplete */}
              <TextField label="skill" style={inputStyle} />
            </div>
            <div className="meeting-section">
              <Label className="label">화상미팅 예약</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic example"
                  value={meetingTime}
                  onChange={(newValue) => {
                    setMeetingTime(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} style={inputStyle} />}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className="career-exp-section">
            <div className="career-section">
              <div>
                <div className="career-label">
                  <Label>경력</Label>
                  <Button>
                    <img src={plusButton} alt="plusButton" />
                  </Button>
                </div>
                <hr></hr>
              </div>
              {/* <ExpList careerList={careerList}></ExpList> */}
            </div>
            <div className="exp-section">
              <div>
                <div className="exp-label">
                  <Label>경험</Label>
                  <Button>
                    <img src={plusButton} alt="plusButton" onClick={handleExpAdd} />
                  </Button>
                </div>
                <hr></hr>
              </div>
              <ExpList expList={expList}></ExpList>
            </div>
          </div>

          <div className="content-section">
            <Label className="label">하고싶은 말</Label>
            <div>
              <TextField label="content" style={textAreaStyle} fullWidth={true} multiline={true} minRows="5" />
            </div>
          </div>

          <div className="question-answer-section">
            <div className="question-section">
              <Label className="label">지원자에게 궁금한 점</Label>
            </div>
            <div className="answer-section">
              <Label className="question-label">Q1. mbti 무엇입니까아아아아아</Label>
              <TextField label="answer" style={inputStyle} fullWidth={true} />
            </div>
          </div>
        </div>
        <div className="submit-button">
          <button className="apply-button">지원하기</button>
        </div>
      </div>
    </Container>
  )
}

export default Apply
