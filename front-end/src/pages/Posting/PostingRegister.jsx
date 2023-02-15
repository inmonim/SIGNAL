import React, { useState, useEffect } from 'react'
import api from 'api/Api'
import { Box, TextField, Button } from '@mui/material'
import plusButton from '../../assets/image/plusButton.png'
import CareerList from '../../components/Apply/CareerList'
import moment from 'moment/moment'
import '../../assets/styles/applyRegister.css'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import Autocomplete from '@mui/material/Autocomplete'
import PositionTodo from 'components/Posting/PositionTodo'
import { FilterInput } from './Posting'
import DateSelect from 'components/Posting/DateSelect'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
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
import Swal from 'sweetalert2'
import ReactSelect from 'react-select'
import { changeSelectForm } from 'utils/changeForm'
import SignalBtn from 'components/common/SignalBtn'
const Container = styled.section`
  padding: 130px 10em;
`
// const skillStyle = {
//   width: '100%',
//   height: '60px',
//   padding: '0 14px',
//   border: '1px solid #d7e2eb',
//   borderradius: '4px',
//   boxsizing: 'border-box',
//   backgroundcolor: '#fbfbfd',
//   fontsize: '16px',
//   fontweight: '500',
//   lineheight: '1.6',
//   color: '#263747',
//   '& : hover': {
//     border: '1px solid #3396f4',
//     boxshadow: 'inset 0 0 0 1px#3396f4',
//   },
// }
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
  color: #574b9f;
`

const inputStyle = {
  backgroundColor: '#ffffff',
  position: 'static',
  width: 1,
}

const hunjae = new Date()
const humjaetime = moment(hunjae).format('YYYY-MM-DD HH:mm:ss.SSS')
const contactList = [
  { name: '대면', status: true },
  { name: '비대면', status: false },
]

const PostingRegister = () => {
  const dispatch = useDispatch()
  // start >> useState
  // console.log(JSON.stringify(Skilldata))
  // const today = dateNow.toISOString().slice(0, 10)
  const navigate = useNavigate()
  const [datevalue, setDateValue] = useState(humjaetime)
  const [subject, setSubject] = useState('')
  const [posting, setPosting] = useState({
    userSeq: sessionStorage.getItem('userSeq'),
    subject,
    localCode: '11',
    leaderPosition: 'PO100',
    fieldCode: 'FI100',
    isContact: true,
    term: 3,
    content: '',
    postingEndDt: humjaetime,
    level: 1,
    postingMeetingList: [],
    postingSkillList: [],
    postingPositionList: [],
    postingQuestionList: [],
  })
  // const [profile, setProfile] = useState([])
  // const [heart, setHeart] = useState(0)

  const checkHeart = () => {
    api.get(process.env.REACT_APP_API_URL + `/profile/heartCnt/${sessionStorage.getItem('userSeq')}`).then((res) => {
      // setHeart(res.data.body)
      if (res.data.body < 100) {
        alert('하트가 부족해양')
        navigate('/posting')
      }
    })
  }
  const [careerList, setCareerList] = useState([])

  const [numberOfTags, setNumberOfTags] = useState(0)
  const [arrayOfTags, addTag] = useState([])
  const handleSkillInput = (e) => {
    if (e === null) return
    newTag({
      label: e.label,
      value: e.value,
    })
  }
  const newTag = (tag) => {
    const set = arrayOfTags.concat(tag)
    const uniqueTags = set.filter((arr, index, callback) => index === callback.findIndex((t) => t.label === arr.label))
    setNumberOfTags(uniqueTags.length)
    addTag(uniqueTags)
  }
  const tags = arrayOfTags.map((h, index) => (
    <Chip
      label={h.label}
      value={h.value}
      variant="outlined"
      sx={{ fontSize: '20px', margin: '5px' }}
      key={index}
      onDelete={() => handleDeleteSkill(h)}
    />
  ))
  const skillPostFilter = (list) => {
    const skillArr = []
    list.map((item) => skillArr.push(item.value))
    setPosting({ ...posting, postingSkillList: skillArr })
  }
  // end >> Fetch

  // start >> Data filter
  const [Daily, setDaily] = useState('')
  const [DateList, setDateList] = useState([])
  const [errorBox, setErrorBox] = useState(false)
  // end >> Data filter

  // start >> handle position
  const [posi, setPosi] = useState({ code: 'PO100', name: 'frontend' })
  const positionRedux = useSelector((state) => state.positionTodo)
  const qnaRedux = useSelector((state) => state.qnaTodo)
  const [positionReduxlen, setPositionReduxlen] = useState(0)
  // end >> handle position

  // end >> skill filter
  // end >> handle skill

  // start >> handle career
  // const handleChangeSkill = (value) => {
  //   const copy = value.map((ele) => ele.code)
  //   setPosting({ ...posting, postingSkillList: copy })
  // }
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
  const handleDeleteSkill = (h) => {
    addTag((arrayOfTags) => arrayOfTags.filter((tag) => tag.label !== h.label))
  }

  const handleCareerRemove = (key) => {
    setCareerList(careerList.filter((career) => career.seq !== key))
  }

  // end >> handle career
  const handleDelete = (ele) => {
    setDateList(
      DateList.filter((date) => {
        return date !== ele
      })
    )
  }
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

  const handleApplySubmit = async (event) => {
    if (
      posting.subject !== '' &&
      posting.content !== '' &&
      posting.postingMeetingList.length !== 0 &&
      posting.postingSkillList.length !== 0 &&
      posting.postingPositionList.length !== 0 &&
      posting.postingQuestionList !== 0 &&
      DateList.length >= positionReduxlen
    ) {
      const config = { 'Content-Type': 'application/json' }

      await api
        .post(process.env.REACT_APP_API_URL + '/posting', posting, config)
        .then((res) => {
          // console.log(res)
          // console.log(1)
        })
        .catch((err) => {
          console.log(err)
          // console.log(posting)
          // console.log(JSON.stringify(posting))
        })
      navigate('/posting')
      // console.log('공고 post')
    } else {
      setErrorBox(true)
      Swal.fire({
        title: '등록 실패',
        heightAuto: true,
        text: '선택하지 않은 값이 있습니다.',
        icon: 'error',
        showConfirmButton: true,
        onClose: () => {
          window.scrollTo(0, 0)
        },
      })
    }
  }
  const handlePositon = () => {
    const copy = positionRedux.map((ele) => ({ positionCode: ele.id, positionCnt: ele.count }))
    const countSum = copy.reduce((accumulator, currentValue) => accumulator + currentValue.positionCnt, 0)
    setPositionReduxlen(countSum)
    setPosting({ ...posting, postingPositionList: copy })
  }
  const handleqna = () => {
    const copy = qnaRedux.map((ele, i) => ({ num: i + 1, content: ele.text }))
    setPosting({ ...posting, postingQuestionList: copy })
  }

  useEffect(() => {
    checkHeart()
  }, [])

  useEffect(() => {
    // postingFetch()
    // profileFetch()
    handlePositon()
  }, [positionRedux])
  useEffect(() => {
    handleqna()
  }, [qnaRedux])
  useEffect(() => {
    setPosting({ ...posting, postingMeetingList: DateList })
  }, [DateList])

  useEffect(() => {
    setPosting({ ...posting, postingMeetingList: DateList })
    skillPostFilter(arrayOfTags)
  }, [arrayOfTags])

  return (
    <Container>
      <div style={{ marginTop: '10px' }}>
        <div>
          <Title>공고 등록</Title>
        </div>
        <div>
          {/* 여기는 주제, 기간 */}
          <div style={{ display: 'flex', marginBottom: '1em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '25%' }}>
                <Label className="posting-label-name">프로젝트 주제</Label>
              </div>
              <div style={{ width: '75%' }}>
                <TextField
                  error={errorBox && !posting.subject}
                  sx={inputStyle}
                  onChange={(e) => {
                    setSubject(e.target.value)
                    setPosting({ ...posting, subject: e.target.value })
                  }}
                />
              </div>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '25%' }}>
                <Label>프로젝트 모집기간</Label>
              </div>
              <div style={{ width: '75%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="마감 날짜"
                    value={datevalue}
                    onChange={(newValue) => {
                      const time = moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss.SSS')
                      setDateValue(time)
                      setPosting({ ...posting, postingEndDt: time })
                    }}
                    renderInput={(params) => <TextField {...params} style={{ width: '100%' }} />}
                    minDate={hunjae}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          {/* 여기는 진행지역,분야 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '25%' }}>
                <Label>진행 지역</Label>
              </div>
              <div style={{ width: '75%' }}>
                <FilterSelect
                  onChange={(e) => {
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
            </div>
            <div className="email-section " style={{ marginLeft: '3em' }}>
              <div style={{ width: '25%' }}>
                <Label>분야</Label>
              </div>
              <div style={{ width: '75%' }}>
                <FilterSelect
                  onChange={(e) => {
                    setPosting({ ...posting, fieldCode: e.target.value })
                  }}
                >
                  {Fielddata2.map((ele, i) => (
                    <option key={ele.code} value={ele.code}>
                      {ele.name}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </div>
          </div>
          {/* 여기는 진행유형,프로젝트기간 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '25%' }}>
                <Label>진행 유형 </Label>
              </div>
              <div style={{ width: '75%' }}>
                <FilterSelect
                  onChange={(e) => {
                    if (e.target.value === 'true') {
                      setPosting({ ...posting, isContact: true })
                    } else {
                      setPosting({ ...posting, isContact: false })
                    }
                  }}
                >
                  {contactList.map((ele, i) => (
                    <option key={i} value={ele.status}>
                      {ele.name}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '25%' }}>
                <Label>프로젝트 기간</Label>
              </div>
              <div style={{ width: '75%' }}>
                <FilterSelect
                  onChange={(e) => {
                    setPosting({ ...posting, term: Number(e.target.value) })
                  }}
                >
                  {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((ele, i) => (
                    <option key={i} value={ele}>
                      {ele}주
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '25%' }}>
                <Label>사용 기술 </Label>
              </div>
              <div style={{ width: '75%' }}>
                <ReactSelect
                  placeholder=""
                  isClearable
                  onChange={handleSkillInput}
                  isSearchable={true}
                  options={changeSelectForm(Skilldata)}
                />
              </div>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '25%' }}>
                <Label>화상미팅 예약</Label>
              </div>
              <div style={{ width: '75%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DateSelect setDate={setDaily} />
                  <SignalBtn
                    sigwidth="50px"
                    sigfontsize="12px"
                    sigborderradius={15}
                    sigmargin="0px 20px"
                    className="post-button-modi"
                    onClick={() => {
                      if (!DateList.includes(Daily) && Daily) {
                        const copy = [...DateList]
                        copy.push(Daily)
                        setDateList(copy)
                      }
                    }}
                  >
                    시간 선택
                  </SignalBtn>
                </Box>
              </div>
            </div>
          </div>
          {/* 여기는 사용기술 , 시간선택 */}
          <div style={{ display: 'flex', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '25%' }}></div>
              <div className="skill-scroll" style={{ width: '75%', margin: 0 }}>
                {numberOfTags > 0 ? tags : ''}
              </div>
            </div>
            <div style={{ width: '50%' }}>
              <Stack direction="row" spacing={1} className="meeting-time-scroll">
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
              <p style={{ marginTop: '1em', color: '#574b9f' }} className="meeting-time-scroll">
                <span className={errorBox && DateList.length < positionReduxlen ? 'active-warning-span' : ''}>
                  미팅예약은 포지션인원수의 최소값 만큼 설정해야합니다.
                </span>{' '}
                (<span style={{ color: DateList.length < positionReduxlen ? 'red' : '' }}>{DateList.length}</span>
                {' / '}
                <span>{positionReduxlen}</span>)
              </p>
              <div className="email-section" style={{ marginLeft: '3em' }}>
                <div style={{ width: '30%' }}></div>
                <div style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '25%' }}>
                <Label>포지션 인원</Label>
              </div>
              <div style={{ width: '75%', display: 'flex', alignItems: 'center' }}>
                <FilterSelect
                  className={errorBox && posting.postingPositionList.length === 0 ? 'active-warning' : ''}
                  onChange={(e) => {
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
                    dispatch(add(posi))
                  }}
                />
              </div>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '25%' }}>
                <Label>난이도</Label>
              </div>
              <div style={{ width: '75%' }}>
                <FilterSelect
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setPosting({ ...posting, level: Number(e.target.value) })
                  }}
                >
                  {[1, 2, 3, 4, 5].map((ele, i) => (
                    <option key={i} value={ele}>
                      LEVEL : {ele}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </div>
          </div>
          {/* 여기는 포지션인원 , 예상난이도 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div className="posting-position-plus">
                <div className="career-label">
                  <div style={{ width: '25%' }}></div>
                </div>
                <PositionTodo />
                <div style={{ width: '75%', display: 'flex' }}></div>
              </div>
              <CareerList
                careerList={careerList}
                onRemove={handleCareerRemove}
                onChange={handleCareerChange}
                key={careerList[0]}
              ></CareerList>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '25%' }}>
                <Label>팀장 포지션</Label>
              </div>
              <div style={{ width: '75%', display: 'flex' }}>
                <FilterSelect
                  style={{ marginRight: '0px' }}
                  onChange={(e) => {
                    const position = JSON.parse(e.target.value)
                    setPosting({ ...posting, leaderPosition: position.code })
                  }}
                >
                  {positionData.map((ele, i) => (
                    <option key={i} value={JSON.stringify(ele)}>
                      {ele.name}
                    </option>
                  ))}
                </FilterSelect>
              </div>
            </div>
          </div>

          {/* 여기는 프로젝트 소개 */}
          <div className="content-section">
            <Label className="label">프로젝트 소개</Label>
            <div>
              <TextField
                error={errorBox && !posting.content}
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
                      className={errorBox && posting.postingQuestionList.length === 0 ? 'active-warning' : ''}
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
            공고 등록
          </button>
        </div>
      </div>
    </Container>
  )
}
const FilterSelect = styled.select`
  width: 100%;
  height: 60px;
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
  &.active-warning {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`
export default PostingRegister
