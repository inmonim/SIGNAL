import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import '../../assets/styles/apply.css'
import styled from 'styled-components'

import { useSelector, useDispatch } from 'react-redux'
import { fetchPostionCode } from '../../store/redux'
import Skilldata from 'data/Skilldata'

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
  const [posting, setPosting] = useState([{}])
  const [content, setContent] = useState([])
  const [expIndex, setExpIndex] = useState(2)
  const [careerIndex, setCareerIndex] = useState(0)
  const [careerList, setCareerList] = useState([])
  const [expList, setExpList] = useState([
    {
      id: 0,
      title: 'exp0',
    },
    {
      id: 1,
      title: 'exp1',
    },
  ])

  const [positionList, setPositionList] = useState([])
  const handlePositionChange = (event) => {
    setPosition(event.target.value)
    console.log(position)
  }

  // userFetch : setNickName, setPhone, setEmail
  const userFetch = async () => {
    try {
      const res = await axios.get(SERVER_URL + PARAM_URL)
      setNickname(res.data.body.nickname)
      setPhone(res.data.body.phone)
      setEmail(res.data.body.email)
      console.log('userFetch response')
    } catch (error) {
      console.log(error)
    }
  }

  const postingFetch = async () => {
    try {
      const res = await axios.get(SERVER_URL + '/posting/1')
      setPosting(res.data.body)
      console.log('durl' + posting.postingQuestionList)
      // console.log(res.data.body.postingQuestionList)
    } catch (error) {
      console.log(error)
    }
  }

  const handleExpAdd = () => {
    const expArr = [...expList]
    const exp = {
      id: expIndex,
      title: 'exp' + expIndex,
    }
    setExpIndex(expIndex + 1)
    expArr.push(exp)
    setExpList(expArr)
  }

  const handleCareerAdd = () => {
    const careerArr = [...careerList]
    const career = {
      id: careerIndex,
      title: 'career' + careerIndex,
    }
    setCareerIndex(careerIndex + 1)
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
        content,
        memo: '이 지원자는 열정이 있음',
        positionCode: 'PO100',
        postingSeq: 1,
        regDt: regDtreq,
        select: true,
        userSeq: 1,
      }
      console.log('careerList')
      console.log(careerList)
      console.log('expList')
      console.log(expList)
      console.log('regDtreq')
      console.log(regDtreq)
      const config = { 'Content-Type': 'application/json' }
      await axios
        .post(SERVER_URL + '/apply', req, config)
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

  const handleCareerRemove = (id) => {
    setCareerList(
      careerList.filter((career) => {
        return career.id !== id
      })
    )
  }
  const dispatch = useDispatch()
  const state = useSelector((state) => {
    return state
  })

  useEffect(() => {
    userFetch()
    postingFetch()
    dispatch(fetchPostionCode())
    // positionListFetch();
    // setPostion("1");
    // expListFetch();
  }, [])

  const reduxConsole = () => {
    console.log('apply')
    console.log(state)
    state.positionCode.then((e) => {
      setPositionList(e)
      console.log(e)
      console.log(positionList)
    })
  }

  const skillSearchFilter = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.name,
  })

  const [skillvalue, setSkillvalue] = useState(Skilldata[0].name)
  const [skillinputValue, setSkillinpuValeu] = useState('')

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
                    <MenuItem value={props.name} key={index}>
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
                    value={skillvalue}
                    onChange={(event, newValue) => {
                      setSkillvalue(newValue)
                    }}
                    inputValue={skillinputValue}
                    onInputChange={(event, newInputValue) => {
                      setSkillinpuValeu(newInputValue)
                    }}
                  />
                )}
              />
            </div>
            <div className="meeting-section">
              <Label className="label">화상미팅 예약</Label>
              <button className="apply-button" onClick={reduxConsole}>
                시간선택
              </button>
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
              <CareerList careerList={careerList} onRemove={handleCareerRemove}></CareerList>
            </div>
            <div className="exp-section">
              <div>
                <div className="exp-label">
                  <Label>경험</Label>
                  <img src={plusButton} alt="plusButton" className="plus-button" onClick={handleExpAdd} />
                </div>
                <hr></hr>
              </div>
              <ExpList expList={expList} onRemove={handleExpRemove}></ExpList>
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
              {posting.postingQuestionList &&
                posting.postingQuestionList.map((props) => (
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
