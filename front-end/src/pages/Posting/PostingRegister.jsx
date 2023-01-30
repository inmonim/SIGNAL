import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import CareerList from '../../components/Apply/CareerList'
import moment from 'moment/moment'
import '../../assets/styles/applyRegister.css'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Localdata from 'data/Localdata'
import QnAList from 'components/Apply/QnaList'

const Container = styled.section`
  // padding: 100px 25em;
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
  backgroundColor: '#ffffff',
  position: 'static',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

const PostingRegister = () => {
  // start >> useState
  const [datevalue, setDateValue] = useState('')
  const [subject, setSubject] = useState('')
  const [posting, setPosting] = useState({
    userSeq: 1,
    subject,
    localCode: '39',
    fieldCode: 'FI100',
    Contact: true,
    term: 10,
    content: '공고 등록 테스트 본문',
    postingEndDt: datevalue,

    level: 5,
    postingMeetingList: ['2023-01-01 11:00:00.000', '2023-01-02 11:00:00.000'],
    postingSkillList: ['WE100', 'WE101'],
    postingPositionList: [
      {
        positionCode: 'PO100',
        positionCnt: 5,
      },
      {
        positionCode: 'PO101',
        positionCnt: 10,
      },
    ],
    postingQuestionList: [
      {
        num: 1,
        content: '질문 1',
      },
      {
        num: 2,
        content: '질문 2',
      },
    ],
  })
  const [profile, setProfile] = useState([])

  const [careerList, setCareerList] = useState([])

  // const [answerList, setAnswerList] = useState([])

  const [qnaList, setQnaList] = useState([])

  // ene >> useState

  // start >> Fetch

  const postingFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/posting/1')
      setPosting(res.data.body)
      const qnaArr = []
      res.data.body.postingQuestionList.map(() => qnaArr.push(''))
      setQnaList(qnaArr)
    } catch (error) {
      console.log(error)
    }
  }

  const profileFetch = async () => {
    try {
      const res = await axios.get('http://www.ssafysignal.site:8080/profile/1')
      setProfile(res.data.body)
      console.log(res.data.body)
      console.log(profile)
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
  }

  // end >> Data filter

  // start >> handle position

  // end >> handle position

  // end >> skill filter

  // end >> handle skill

  // start >> handle career

  const handleCareerAdd = () => {
    const careerArr = [...careerList]
    const career = {
      seq: careerArr[careerArr.length - 1].seq + 1,
      content: '',
    }
    careerArr.push(career)
    setCareerList(careerArr)
    console.log(careerList)
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

  // end >> handle exp

  // start >> handle content

  const handleContentChange = (event) => {}

  // end >> handle content

  // start >> handle qna

  const handleQnAChange = (value, key) => {
    const qnaArr = [...qnaList]
    qnaArr.splice(key, 1, value)
    setQnaList(qnaArr)
    console.log(qnaList)
  }

  // end >> handle qna

  const handleApplySubmit = async (event) => {
    try {
      const config = { 'Content-Type': 'application/json' }
      await axios
        .post('/posting', posting, config)
        .then((res) => {
          console.log(res)
          console.log(1)
        })
        .catch((err) => {
          console.log(err)
          console.log(datevalue)
        })

      console.log('공고 post')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    postingFetch()
    profileFetch()
  }, [])

  return (
    <Container>
      <div>
        <div>
          <Title>공고 등록</Title>
        </div>
        <div>
          {/* 여기는 주제, 기간 */}
          <div style={{ display: 'flex', marginBottom: '1em' }}>
            <div className="phone-section">
              <Label>프로젝트 주제 </Label>
              <TextField
                sx={inputStyle}
                onChange={(e) => {
                  // console.log(e.target.value)
                  setSubject(e.target.value)
                  console.log(subject)
                }}
              />
            </div>
            <div className="email-section">
              <Label>프로젝트 모집 기간</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="마감 날짜"
                  value={datevalue}
                  onChange={(newValue) => {
                    const time = moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss.SSS')
                    console.log(time)
                    console.log(typeof time)
                    setDateValue(time)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          {/* 여기는 진행지역,분야 */}
          <div style={{ display: 'flex', marginBottom: '2em' }}>
            <div className="phone-section">
              <Label>진행 지역</Label>
              <FilterSelect>
                {Object.keys(Localdata).map((ele, i) => (
                  <option key={i} value={ele}>
                    {Localdata[ele].name}
                  </option>
                ))}
              </FilterSelect>
            </div>
            <div className="email-section">
              <Label style={{ width: '10%' }}>분야</Label>
              <FilterSelect>
                {Object.keys(Localdata).map((ele, i) => (
                  <option key={i} value={ele}>
                    {Localdata[ele].name}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>
          {/* 여기는 진행유형,프로젝트기간 */}
          <div style={{ display: 'flex', marginBottom: '2em' }}>
            <div className="phone-section">
              <Label>진행 유형 </Label>
              <FilterSelect>
                {Object.keys(Localdata).map((ele, i) => (
                  <option key={i} value={ele}>
                    {Localdata[ele].name}
                  </option>
                ))}
              </FilterSelect>
            </div>
            <div className="email-section">
              <Label>프로젝트 기간</Label>
              <FilterSelect>
                {Object.keys(Localdata).map((ele, i) => (
                  <option key={i} value={ele}>
                    {Localdata[ele].name}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>
          {/* 여기는 포지션인원 , 예상난이도 */}
          <div style={{ display: 'flex', marginBottom: '2em' }}>
            <div className="phone-section">
              <div>
                <div>
                  <div className="career-label">
                    <Label>포지션 인원</Label>
                    <img src={plusButton} alt="plusButton" className="plus-button" onClick={handleCareerAdd} />
                  </div>
                  <hr></hr>
                </div>
                <CareerList
                  careerList={careerList}
                  onRemove={handleCareerRemove}
                  onChange={handleCareerChange}
                  key={careerList[0]}
                ></CareerList>
              </div>
            </div>
            <div>
              <Label style={{ marginBottom: '1em', marginTop: '1em  ' }}>예상 난이도</Label>
              <FilterSelect>
                {Object.keys(Localdata).map((ele, i) => (
                  <option key={i} value={ele}>
                    {Localdata[ele].name}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>
          {/* 여기는 프로젝트 소개 */}
          <div className="content-section">
            <Label className="label">프로젝트 소개</Label>
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
          {/* 지원자에게 물어 보고 싶은 말   */}
          <div className="question-answer-section">
            <div className="question-section">
              <Label className="label" style={{ width: '30%' }}>
                지원자에게 물어 보고 싶은 말
              </Label>
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
const FilterSelect = styled.select`
  width: 100%;
  max-width: 378px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
  background-size: 0.625rem 0.3125rem;
  background-color: #fbfbfd;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #263747;
  margin-right: 2em;
  &:hover {
    border: 1px solid #848484;
    box-shadow: inset 0 0 0 1px#bcb7d9;
  }
`
export default PostingRegister
