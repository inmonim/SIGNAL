import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { Box, TextField, Button } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import CareerList from '../../components/Apply/CareerList'
import moment from 'moment/moment'
import '../../assets/styles/applyRegister.css'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Autocomplete from '@mui/material/Autocomplete'
import PositionTodo from 'components/Posting/PositionTodo'
import { FilterInput } from './Posting'
import DateSelect from 'components/Posting/DateSelect'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
// import { ko } from 'date-fns/esm/locale'
// import  DatePicker as DateTimePicker  from 'react-datepicker'
import AddIcon from '@mui/icons-material/Add'
// import { positionData } from 'data/Positiondata'
import Localdata from 'data/Localdata'
import { Fielddata2 } from 'data/Fielddata'
import { Skilldata } from 'data/Skilldata'
import { positionData } from 'data/Positiondata'
// import QnAList from 'components/Apply/QnaList'
import { useDispatch, useSelector } from 'react-redux'
import { add, addQna } from 'store/redux'
import QnaTodo from 'components/Posting/QnaTodo'

const Container = styled.section`
  padding: 100px 10em;
`
const skillStyle = {
  width: '100%',
  maxwidth: '378px',
  height: '42px',
  padding: '0 14px',
  border: '1px solid #d7e2eb',
  borderradius: '4px',
  boxsizing: 'border-box',
  backgroundcolor: '#fbfbfd',
  fontsize: '16px',
  fontweight: '500',
  lineheight: '1.6',
  color: '#263747',
  '& : hover': {
    border: '1px solid #3396f4',
    boxshadow: 'inset 0 0 0 1px#3396f4',
  },
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
  backgroundColor: '#ffffff',
  position: 'static',
}

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

const contactList = [
  { name: '대면', status: true },
  { name: '비대면', status: false },
]

const PostingModify = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const postingSeq = location.state.postingSeq
  //   console.log(postingSeq)

  const [subject, setSubject] = useState('')
  const [posting, setPosting] = useState({
    userSeq: 1,
    subject,
    localCode: '11',
    fieldCode: 'FI100',
    isContact: true,
    term: 10,
    content: '공고 등록 테스트 본문',
    postingEndDt: '2023-01-01 11:00:00.000',
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
  const postPutFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      const post = res.data.body
      setPosting({
        ...posting,
        subject: post.subject,
        localCode: post.localCode,
        fieldCode: post.fieldCode,
        isContact: post.isContact,
        term: post.term,
        content: post.content,
        postingEndDt: post.postingEndDt,
        level: post.level,
        postingMeetingList: post.MeetingList,
        postingSkillList: post.postingSkillList,
        postingPositionList: post.postingPositionList,
        postingQuestionList: post.postingQuestionList,
      })
      const result = post.postingMeetingList.map((e) => e.meetingDt)
      setDateList(result)

      dispatch(add({ code: 'PO100', name: 'backend', count: 2 }))
    } catch (error) {
      console.log(error)
    }
  }
  // const [profile, setProfile] = useState([])

  const [careerList, setCareerList] = useState([])

  // const profileFetch = async () => {
  //   try {
  //     const res = await axios.get('http://www.ssafysignal.site:8080/profile/1')
  //     setProfile(res.data.body)
  //     console.log(res.data.body)
  //     console.log(profile)
  //     careerFetchFilter(res.data.body.userCareerList)
  //     expFetchFilter(res.data.body.userExpList)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // end >> Fetch
  const [deSkill, setDeSkill] = useState([])
  // start >> Data filter
  const [Date, setDate] = useState('')
  const [DateList, setDateList] = useState([])
  // end >> Data filter

  // start >> handle position
  const [posi, setPosi] = useState({ code: 'PO100', name: 'frontend' })
  const positionRedux = useSelector((state) => state.positionTodo)
  const qnaRedux = useSelector((state) => state.qnaTodo)
  // end >> handle position

  // end >> skill filter
  // end >> handle skill

  // start >> handle career
  const handleChangeSkill = (value) => {
    const copy = value.map((ele) => ele.code)
    setPosting({ ...posting, postingSkillList: copy })
  }
  // ...copy 이런거로 나오게 해서 const 22 = map 써서 return 으로 넣자

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
  const handleDelete = (ele) => {
    // console.log('함수')
    setDateList(
      DateList.filter((date) => {
        // console.log(date, 'date')
        // console.log(ele, 'ele')
        return date !== ele
      })
    )
  }
  // const getDateList = () => {
  //   DateList.push()
  // }
  // const [startDate, setStartDate] = useState(new Date())
  // start >> handle exp

  // end >> handle exp

  // start >> handle content

  const handleContentChange = (event) => {
    setPosting({ ...posting, content: event.target.value })
  }

  // end >> handle content
  const [todolist, setTodolist] = useState({
    id: 0,
    text: '',
  })

  function handleText(e) {
    setTodolist({ text: e.target.value })
  }

  function onReset() {
    setTodolist({ text: '' })
  }
  // start >> handle qna
  function getMatchingValues(postingSkillList, Skilldata) {
    const result = []
    for (let i = 0; i < postingSkillList.length; i++) {
      for (let j = 0; j < Skilldata.length; j++) {
        // console.log(postingSkillList[i].skillCode)
        // console.log(Skilldata[j].code)
        if (postingSkillList[i].skillCode === Skilldata[j].code) {
          result.push(Skilldata[j])
          break
        }
      }
    }
    return result
  }
  // const handleQnAChange = (value, key) => {
  //   const qnaArr = [...qnaList]
  //   qnaArr.splice(key, 1, value)
  //   setQnaList(qnaArr)
  //   console.log(qnaList)
  // }

  // end >> handle qna

  const handleApplySubmit = async (event) => {
    try {
      const config = { 'Content-Type': 'application/json' }

      await axios
        .put(process.env.REACT_APP_API_URL + '/posting/' + postingSeq, posting, config)
        .then((res) => {
          // console.log(res)
          // console.log(1)
        })
        .catch((err) => {
          console.log(err)
          // console.log(posting)
          // console.log(JSON.stringify(posting))
        })

      // console.log('공고 post')
    } catch (error) {
      // console.log('에러')
    }
  }
  const handlePositon = () => {
    const copy = positionRedux.map((ele) => ({ positionCode: ele.id, positionCnt: ele.count }))
    setPosting({ ...posting, postingPositionList: copy })
  }
  const handleqna = () => {
    const copy = qnaRedux.map((ele, i) => ({ num: i + 1, content: ele.text }))
    setPosting({ ...posting, postingQuestionList: copy })
  }
  useEffect(() => {
    postPutFetch()
    setDeSkill(getMatchingValues(posting.postingSkillList, Skilldata))
  }, [])
  useEffect(() => {
    // postingFetch()
    // profileFetch()
    handlePositon()

    // console.log(JSON.stringify(positionRedux))
  }, [positionRedux])
  useEffect(() => {
    handleqna()
  }, [qnaRedux])
  useEffect(() => {
    setPosting({ ...posting, postingMeetingList: DateList })
  }, [DateList])
  useEffect(() => {})
  return (
    <Container>
      <div>
        <div>
          <button
            onClick={() => {
              console.log(posting)
              console.log(Skilldata)
              console.log(getMatchingValues(posting.postingSkillList, Skilldata))
              console.log(deSkill)
            }}
          >
            d
          </button>
          <Title>공고 등록</Title>
        </div>
        <div>
          {/* 여기는 주제, 기간 */}
          <div style={{ display: 'flex', marginBottom: '1em', marginLeft: '5em' }}>
            <div className="phone-section">
              <Label>프로젝트 주제 </Label>
              <TextField
                sx={inputStyle}
                value={posting.subject}
                onChange={(e) => {
                  // console.log(e.target.value)
                  setSubject(e.target.value)
                  setPosting({ ...posting, subject: e.target.value })
                  // console.log(subject)
                }}
              />
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <Label>프로젝트 모집 기간</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="마감 날짜"
                  value={posting.postingEndDt}
                  onChange={(newValue) => {
                    const time = moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss.SSS')

                    setPosting({ ...posting, postingEndDt: time })
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          {/* 여기는 진행지역,분야 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <Label>진행 지역</Label>
              <FilterSelect
                value={posting.localCode}
                onChange={(e) => {
                  // console.log(e.target.value)
                  setPosting({ ...posting, localCode: e.target.value })
                }}
              >
                {Object.keys(Localdata).map((ele, i) => (
                  <option key={i} value={ele}>
                    {Localdata[ele].name}
                  </option>
                ))}
              </FilterSelect>
            </div>
            <div className="email-section " style={{ marginLeft: '3em' }}>
              <Label style={{ width: '10%' }}>분야</Label>
              <FilterSelect
                onChange={(e) => {
                  // console.log(e.target.value)
                  setPosting({ ...posting, fieldCode: e.target.value })
                }}
                value={posting.fieldCode}
              >
                {Fielddata2.map((ele, i) => (
                  <option key={ele.code} value={ele.code}>
                    {ele.name}
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>
          {/* 여기는 진행유형,프로젝트기간 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <Label>진행 유형 </Label>
              <FilterSelect
                onChange={(e) => {
                  // console.log(e.target.value)
                  if (e.target.value === 'true') {
                    setPosting({ ...posting, isContact: true })
                  } else {
                    setPosting({ ...posting, isContact: false })
                  }
                  // console.log(typeof e.target.value)
                  // console.log(range(10, 3))
                }}
                value={posting.isContact}
              >
                {contactList.map((ele, i) => (
                  <option key={i} value={ele.status}>
                    {ele.name}
                  </option>
                ))}
              </FilterSelect>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <Label>프로젝트 기간</Label>
              <FilterSelect
                onChange={(e) => {
                  // console.log(e.target.value)
                  setPosting({ ...posting, term: Number(e.target.value) })
                }}
                value={posting.term}
              >
                {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}주
                  </option>
                ))}
              </FilterSelect>
            </div>
          </div>
          {/* 여기는 사용기술 , 시간선택 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <Label>사용 기술 </Label>
              {deSkill && (
                <Autocomplete
                  multiple
                  limitTags={5}
                  size="small"
                  id="multiple-limit-tags"
                  options={Skilldata}
                  getOptionLabel={(option) => option.name}
                  defaultValue={deSkill}
                  onChange={(event, newValue) => {
                    // console.log(newValue)
                    // console.log(event.target)
                    handleChangeSkill(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} label="기술 스택 검색" placeholder="Skill" />}
                  sx={{ skillStyle, width: 2 / 3, mb: 3, backgroundColor: '#fbfbfd' }}
                />
              )}
            </div>
            <div style={{ flexDirection: 'column' }}>
              <div className="email-section" style={{ marginLeft: '3em' }}>
                <Label>화상 미팅 예약</Label>
                <Box sx={{ flexDirection: 'row' }}>
                  <DateSelect setDate={setDate} />
                  <button
                    onClick={() => {
                      if (!DateList.includes(Date)) {
                        const copy = [...DateList]
                        copy.push(Date)
                        setDateList(copy)
                      }
                    }}
                  >
                    시간 선택
                  </button>
                </Box>
              </div>
              <Stack direction="row" spacing={1} style={{ marginLeft: '3em', overflowX: 'scroll', width: '450px' }}>
                {DateList.map((ele, i) => (
                  <Chip
                    key={i}
                    label={ele.slice(5, 16)}
                    onDelete={() => {
                      handleDelete(ele)
                    }}
                  />
                ))}
              </Stack>
            </div>
          </div>
          {/* 여기는 포지션인원 , 예상난이도 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section1">
              <div>
                <div>
                  <div className="career-label">
                    <Label>포지션 인원</Label>
                    <FilterSelect
                      onChange={(e) => {
                        // console.log(e.target.value)
                        const position = JSON.parse(e.target.value)
                        setPosi({ code: position.code, name: position.name })
                      }}
                    >
                      {positionData.map((ele, i) => (
                        <option key={i} value={JSON.stringify(ele)}>
                          {ele.name}
                        </option>
                      ))}
                    </FilterSelect>
                    <img
                      style={{ marginTop: '7px', marginBottom: '7px' }}
                      src={plusButton}
                      alt="plusButton"
                      className="plus-button"
                      onClick={() => {
                        console.log(posi)
                        dispatch(add(posi))
                      }}
                    />
                  </div>
                  <hr></hr>
                  <PositionTodo />
                </div>
                <CareerList
                  careerList={careerList}
                  onRemove={handleCareerRemove}
                  onChange={handleCareerChange}
                  key={careerList[0]}
                ></CareerList>
              </div>
            </div>
            <Box style={{ width: '5%' }}></Box>
            <div className="phone-section" style={{ marginLeft: '3em' }}>
              <Label style={{ marginBottom: '1em', marginTop: '1em  ' }}>난이도</Label>
              <FilterSelect
                onChange={(e) => {
                  // console.log(e.target.value)
                  setPosting({ ...posting, level: Number(e.target.value) })
                }}
                value={posting.level}
              >
                {[1, 2, 3, 4, 5].map((ele, i) => (
                  <option key={i} value={ele}>
                    LEVEL : {ele}
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
                value={posting.content}
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
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (todolist.text !== '') {
                      dispatch(addQna(todolist.text))
                    } else alert('질문을 입력해 주세요')
                    onReset()
                  }}
                >
                  <div style={{ marginBottom: '2em' }}>
                    <FilterInput
                      placeholder="질문을 입력하세요 "
                      type="text"
                      value={todolist.text}
                      onChange={handleText}
                    ></FilterInput>
                    <Button style={{ marginLeft: '1em' }} type="submit" variant="outlined" startIcon={<AddIcon />}>
                      추가
                    </Button>
                  </div>
                  <QnaTodo />
                </form>
              </div>
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
export default PostingModify
