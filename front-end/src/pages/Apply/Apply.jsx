import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Layout/ExpList'
import CareerList from '../../components/Layout/CareerList'

import '../../assets/styles/apply.css'
import styled from 'styled-components'

const userSeq = '1'
const SERVER_URL = 'http://tableminpark.iptime.org:8080'
const PARAM_URL = `/user/${userSeq}`

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
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

const positionSelectStyle = {
  backgroundColor: '#f3f5f7',
  width: '11.5em',
}

const Apply = () => {
  const [nickname, setNickname] = useState([])
  const [phone, setPhone] = useState([])
  const [email, setEmail] = useState([])
  const [position, setPosition] = useState('frontEnd')
  const [post, setPost] = useState([])
  //post body 확인하고 nickname처럼 나눌지 말지 결정
  const [content, setContent] = userState([])
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

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }

  const [expList, setExpList] = useState([])

  // userFetch : setNickName, setPhone, setEmail
  const userFetch = async () => {
    const res = await axios.get(SERVER_URL + PARAM_URL)
    setNickname(res.data.body.nickname)
    setPhone(res.data.body.phone)
    setEmail(res.data.body.email)
  }

  const postFetch = async () => {
    const res = await axios.get(SERVER_URL + '/posting/1')
    setPost(res.data.body)
    console.log(res)
    console.log(post.postingQuestionList)
  }
  const handleExpAdd = (event) => {
    const expArr = [...expList]
    const exp = {
      title: 'exp',
    }
    expArr.push(exp)
    setExpList(expArr)
  }

  const [careerList, setCareerList] = useState([])

  const handleCareerAdd = (event) => {
    const careerArr = [...careerList]
    const career = {
      title: 'career',
    }
    careerArr.push(career)
    setCareerList(careerArr)
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
      regDt.getSeconds() +
      '.' +
      regDt.getMilliseconds()

    try {
      const req = {
        applyCareerList: careerList,
        applyCode: 'AS101',
        applyExpList: expList,
        applySkillList: ['string'],
        content: content,
        memo: '이 지원자는 열정이 있음',
        positionCode: 'PO100',
        postingSeq: 1,
        regDt: regDtreq,
        select: true,
        userSeq: 1,
      }
      await axios.post('SERVER_URL' + '/apply', req)

      console.log('지원서 post')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userFetch()
    postFetch()
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
              <TextField disabled value={phone} style={inputStyle} />
            </div>
            <div className="email-section">
              <Label>이메일</Label>
              <TextField disabled value={email} style={inputStyle} />
            </div>
          </div>
          {/* //전화번호 & 이메일 입력 */}
          <div className="position-section">
            <div>
              <Label className="label">원하는 포지션</Label>
              <FormControl style={positionSelectStyle}>
                <InputLabel id="demo-simple-select-label" style={positionSelectStyle}></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={position}
                  onChange={handlePositionChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem
                    disabled
                    value={position}
                    sx={{
                      display: 'none',
                    }}
                  ></MenuItem>
                  {positionList.map((props, index) => (
                    <MenuItem value={props.key} key={index}>
                      {props.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="skill-meeting-section">
            <div className="skill-section">
              <Label className="label">사용기술</Label>
              {/* autoComplete */}
              <TextField style={inputStyle} />
            </div>
            <div className="meeting-section">
              <Label className="label">화상미팅 예약</Label>
              <button className="apply-button">시간선택</button>
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
              <CareerList careerList={careerList}></CareerList>
            </div>
            <div className="exp-section">
              <div>
                <div className="exp-label">
                  <Label>경험</Label>
                  <img src={plusButton} alt="plusButton" className="plus-button" onClick={handleExpAdd} />
                </div>
                <hr></hr>
              </div>
              <ExpList expList={expList}></ExpList>
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
              {post.postingQuestionList.map((props) => (
                <div key={props.postingSeq}>
                  <Label className="question-label">{props.content}</Label>
                  <TextField style={textAreaStyle} fullWidth={true} multiline={true} minRows="1" />
                </div>
              ))}
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
