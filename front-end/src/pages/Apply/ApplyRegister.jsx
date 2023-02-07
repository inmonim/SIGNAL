import React, { useState, useEffect } from 'react'
import { TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Apply/ExpList'
import CareerList from '../../components/Apply/CareerList'
// import { createFilterOptions } from '@mui/material/Autocomplete'
import '../../assets/styles/applyRegister.css'
// import { Skilldata, getSkillCode } from 'data/Skilldata'
import { Skilldata, getSkillCode } from 'data/Skilldata'
import { getPositionName, getPositionCode } from 'data/Positiondata'
import QnAList from 'components/Apply/QnaList'
import SkillList from 'components/Apply/SkillList'
import MeetingDtSelect from 'components/Meeting/MeetingDtSelect'
import SignalBtn from 'components/common/SignalBtn'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useNavigate, useLocation } from 'react-router-dom'/
import ReactSelect from 'react-select'
import { changeSelectForm } from 'utils/changeForm'
import api from 'api/Api.js'

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
  // start >> parameter

  // 1. 아래 default postingSeq 지우기
  // 2. const postingSeq = location.state.postingSeq
  // 3. import { useNavigate, useLocation } from 'react-router-dom'

  // const postingSeq = location.state.postingSeq
  const location = useLocation()
  const userSeq = sessionStorage.getItem('userSeq')
  const postingSeq = location.state.postingSeq

  // end >> parameter

  // start >> useNavigate

  const navigate = useNavigate()

  // end >> useNavigate

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
  const [meetingSeq, setMeetingSeq] = useState('')

  // ene >> useState

  // start >> Fetch
  const dataFetch = async () => {
    try {
      const res = await api.get(process.env.REACT_APP_API_URL + '/user/' + userSeq)
      setUser(res.data.body)

      await api.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq).then((res) => {
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
        setQuestionList(res.data.body.postingQuestionList)
      })

      await api.get(process.env.REACT_APP_API_URL + '/profile/' + userSeq).then((res) => {
        careerFetchFilter(res.data.body.userCareerList)
        expFetchFilter(res.data.body.userExpList)
      })
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
    list.map((item) => skillArr.push(getSkillCode(item)))
    return skillArr
  }

  // start >> handle position

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }
  // end >> handle position

  // start >> handle skill

  const handleSkillInput = (value) => {
    console.log(value)
    // const skillArr = [...skillList, value]
    // console.log(skillArr)
    // const set = new Set(skillArr)
    // const uniqueArr = Array.from(set)
    // setSkillList(uniqueArr)
  }

  const handleSkillRemove = (id) => {
    setSkillList(
      skillList.filter((skill) => {
        return skill !== id
      })
    )
  }

  // start >> skill filter
  // const skillSearchFilter = createFilterOptions({
  //   matchFrom: 'start',
  //   stringify: (option) => option.label,
  // })

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

  // start >> handle meeting

  const handleMeetingDtChange = (key) => {
    setMeetingSeq(key)
    console.log(key)
  }

  // end >> handle meeting

  // start >> post

  const handleApplySubmit = async () => {
    const userSeq = 1
    const postingSeq = location.state.postingSeq
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

      await api
        .post(process.env.REACT_APP_API_URL + '/apply/' + postingSeq, req)
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

  // end >> post

  // start >> useEffect

  useEffect(() => {
    dataFetch()
    qnaListDataFormat()
  }, [])

  // end >> useEffect

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
                <ReactSelect onChange={handleSkillInput} options={changeSelectForm(Skilldata)} isMulti />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  sx={{ width: 300 }}
                  options={Skilldata}
                  getOptionLabel={(option) => option.label}
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
                /> */}
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
