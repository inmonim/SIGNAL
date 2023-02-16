import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
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
// import DateSelect from 'components/Posting/DateSelect'
import Chip from '@mui/material/Chip'
// import Stack from '@mui/material/Stack'
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
import { add, addQna, addQnaF } from 'store/redux'
import QnaTodo from 'components/Posting/QnaTodo'
import Swal from 'sweetalert2'
import ReactSelect from 'react-select'
import { changeSelectForm } from 'utils/changeForm'
import api from 'api/Api'
// import SignalBtn from 'components/common/SignalBtn'

const Container = styled.section`
  padding: 130px 10em;
`
// const skillStyle = {
//   width: '100%',
//   maxwidth: '378px',
//   height: '42px',
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

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

const contactList = [
  { name: '대면', status: true },
  { name: '비대면', status: false },
]
const hunjae = new Date()
const humjaetime = moment(hunjae).format('YYYY-MM-DD HH:mm:ss.SSS')
const PostingModify = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const postingSeq = location.state.postingSeq

  //   console.log(postingSeq)
  const [posting] = useState({
    userSeq: '',
    subject: '',
    localCode: '',
    fieldCode: '',
    isContact: '',
    term: 3,
    content: '',
    postingEndDt: humjaetime,
    level: 1,
    postingMeetingList: [],
    postingSkillList: [],
    postingPositionList: [],
    postingQuestionList: [],
  })
  const [userSeqget, setUserSeqget] = useState('')
  const [subjectget, setSubjectget] = useState('')
  const [localCodeget, setLocalCodeget] = useState('')
  const [fieldCodeget, setFieldCodeget] = useState('')
  // const [leaderPositionget, setLeaderPositionget] = useState('')
  const [isContactget, setIsContactget] = useState('')
  const [termget, setTermget] = useState(3)
  const [contentget, setContentget] = useState('')
  const [postingEndDtget, setPostingEndDtget] = useState('')
  const [levelget, setLevelget] = useState(1)
  const [postingSkillListget, setPostingSkillListget] = useState([])
  // const [postingMeetingListget, setPostingMeetingListget] = useState([])
  const [postingPositionListget, setPostingPositionListget] = useState([])
  const [postingQuestionListget, setPostingQuestionListget] = useState([])

  // const [u]
  const postPutFetch = async () => {
    const res = await api.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
    const post = res.data.body
    setUserSeqget(sessionStorage.getItem('userSeq'))
    setSubjectget(post.subject)
    setLocalCodeget(post.localCode)
    setFieldCodeget(post.fieldCode)
    // setLeaderPositionget(post.leaderPosition)
    setIsContactget(post.isContact)
    setTermget(post.term)
    setContentget(post.content)
    setPostingEndDtget(post.postingEndDt)
    setLevelget(post.level)
    // 스킬
    const resultSkill = post.postingSkillList.map((e) => e.skillCode)
    setPostingSkillListget(resultSkill)
    // 미팅
    // const resultMeeting = post.postingMeetingList.map((e) => e.meetingDt)
    // setPostingMeetingListget(resultMeeting)
    //
    const resultPosition = post.postingPositionList.map((e) => ({
      code: e.positionCode,
      name: e.code.name,
      count: e.positionCnt,
    }))
    setPostingPositionListget()
    const resultSkillde = post.postingSkillList.map((e) => ({ label: e.code.name, value: e.code.code }))
    const resultQuestion = post.postingQuestionList.map((e) => ({
      id: e.num,
      text: e.content,
    }))

    resultPosition.forEach((e) => dispatch(add(e)))
    resultQuestion.forEach((e) => dispatch(addQnaF(e)))
    // setDateList(resultMeeting)
    addTag(resultSkillde)
  }
  // const [profile, setProfile] = useState([])

  const [careerList, setCareerList] = useState([])
  const navigate = useNavigate()

  // const [Daily, setDaily] = useState('')
  // const [DateList, setDateList] = useState([])
  // const [errorBox, setErrorBox] = useState(false)
  // end >> Data filter

  // start >> handle position
  const [posi, setPosi] = useState({ code: 'PO100', name: 'frontend' })
  const positionRedux = useSelector((state) => state.positionTodo)
  const qnaRedux = useSelector((state) => state.qnaTodo)
  // const [positionReduxlen, setPositionReduxlen] = useState(0)

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
    setPostingSkillListget(skillArr)
    // setPosting({ ...posting, postingSkillList: skillArr })
  }
  const handleDeleteSkill = (h) => {
    addTag((arrayOfTags) => arrayOfTags.filter((tag) => tag.label !== h.label))
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

  const handleContentChange = (event) => {
    setContentget(event.target.value)
    // setPosting({ ...posting, content: event.target.value })
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

  // end >> handle qna

  const handleApplySubmit = async (event) => {
    const req = {
      userSeq: userSeqget,
      subject: subjectget,
      localCode: localCodeget,
      fieldCode: fieldCodeget,
      isContact: isContactget,
      term: termget,
      content: contentget,
      postingEndDt: postingEndDtget,
      level: levelget,
      postingSkillList: postingSkillListget,
      postingPositionList: postingPositionListget,
      postingQuestionList: postingQuestionListget,
    }

    if (
      subjectget !== '' &&
      contentget !== '' &&
      postingSkillListget &&
      postingSkillListget.length !== 0 &&
      postingPositionListget &&
      postingPositionListget.length !== 0 &&
      postingQuestionListget !== 0
    ) {
      const config = { 'Content-Type': 'application/json' }

      await api
        .put(process.env.REACT_APP_API_URL + '/posting/' + postingSeq, req, config)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          console.log(numberOfTags)
          console.log(posting)
        })
      navigate('/posting')
    } else {
      // setErrorBox(true)
      window.scrollTo(0, 0)
      Swal.fire({
        title: '등록 실패',
        text: '선택하지 않은 값이 있습니다.',
        icon: 'error',
        button: '예',
      })
    }
  }
  const handlePositon = () => {
    const copy = positionRedux.map((ele) => ({ positionCode: ele.id, positionCnt: ele.count }))
    // const countSum = copy.reduce((accumulator, currentValue) => accumulator + currentValue.positionCnt, 0)
    // setPositionReduxlen(countSum)
    setPostingPositionListget(copy)
    // setPosting({ ...posting, postingPositionList: copy })
  }
  const handleqna = () => {
    const copy = qnaRedux.map((ele, i) => ({ num: i + 1, content: ele.text }))
    setPostingQuestionListget(copy)
    // setPosting({ ...posting, postingQuestionList: copy })
  }
  useEffect(() => {
    postPutFetch()
  }, [])
  useEffect(() => {
    handlePositon()
  }, [positionRedux])
  useEffect(() => {
    handleqna()
  }, [qnaRedux])

  useEffect(() => {
    skillPostFilter(arrayOfTags)
  }, [arrayOfTags])
  return (
    <Container>
      <div>
        <div>
          <Title>공고 수정</Title>
        </div>
        <div>
          {/* 여기는 주제, 기간 */}
          <div style={{ display: 'flex', marginBottom: '1em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '20%' }}>
                <Label>프로젝트 주제</Label>
              </div>
              <div style={{ width: '80%' }}>
                {1 && (
                  <TextField
                    sx={inputStyle}
                    value={subjectget}
                    onChange={(e) => {
                      setSubjectget(e.target.value)
                      // setPosting({ ...posting, subject: e.target.value })
                    }}
                  />
                )}
              </div>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '30%' }}>
                <Label>프로젝트 모집 기간</Label>
              </div>
              <div style={{ width: '70%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="마감 날짜"
                    value={postingEndDtget}
                    onChange={(newValue) => {
                      const time = moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss.SSS')
                      setPostingEndDtget(time)
                      // setPosting({ ...posting, postingEndDt: time })
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
              <div style={{ width: '20%' }}>
                <Label>진행 지역</Label>
              </div>
              <div style={{ width: '80%' }}>
                <FilterSelect
                  value={localCodeget}
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setLocalCodeget(e.target.value)
                    // setPosting({ ...posting, localCode: e.target.value })
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
              <div style={{ width: '30%' }}>
                <Label>분야</Label>
              </div>
              <div style={{ width: '70%' }}>
                <FilterSelect
                  onChange={(e) => {
                    setFieldCodeget(e.target.value)
                  }}
                  value={fieldCodeget}
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
              <div style={{ width: '20%' }}>
                <Label>진행 유형 </Label>
              </div>
              <div style={{ width: '80%' }}>
                <FilterSelect
                  onChange={(e) => {
                    if (e.target.value === 'true') {
                      setIsContactget(true)
                      // setPosting({ ...posting, isContact: true })
                    } else {
                      setIsContactget(false)
                      // setPosting({ ...posting, isContact: false })
                    }
                  }}
                  value={isContactget}
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
              <div style={{ width: '30%' }}>
                <Label>프로젝트 기간</Label>
              </div>
              <div style={{ width: '70%' }}>
                <FilterSelect
                  onChange={(e) => {
                    setTermget(Number(e.target.value))
                    // setPosting({ ...posting, term: Number(e.target.value) })
                  }}
                  value={termget}
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
          {/* 여기는 사용기술 , 시간선택 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '20%' }}>
                <Label>사용 기술 </Label>
              </div>
              <div style={{ width: '80%' }}>
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
              <div style={{ width: '30%' }}>{/* <Label>화상미팅 예약</Label> */}</div>
              <div style={{ width: '70%' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '20%' }}></div>
              <div style={{ width: '80%', margin: 0 }}>{tags && tags}</div>
            </div>
            <div>
              {/* <Stack direction="row" spacing={1} className="meeting-time-scroll">
                {DateList.map((ele, i) => (
                  <Chip
                    key={i}
                    label={ele.slice(5, 16)}
                    onDelete={() => {
                      handleDelete(ele)
                    }}
                  />
                ))}
              </Stack> */}
              {/* <p style={{ marginTop: '1em', color: '#574b9f' }} className="meeting-time-scroll">
                <span className={errorBox && DateList.length < positionReduxlen ? 'active-warning-span' : ''}>
                  미팅예약은 포지션인원수의 최소값 만큼 설정해야합니다.
                </span>{' '}
                (<span style={{ color: DateList.length < positionReduxlen ? 'red' : '' }}>{DateList.length}</span>
                {' / '}
                <span>{positionReduxlen}</span>)
              </p> */}
              <div className="email-section" style={{ marginLeft: '3em' }}>
                <div style={{ width: '30%' }}></div>
                <div style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
          {/* 여기는 포지션인원 , 예상난이도 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <div style={{ width: '20%' }}>
                <Label>포지션 인원</Label>
              </div>
              <div style={{ width: '80%', display: 'flex' }}>
                <FilterSelect
                  // className={errorBox && posting.postingPositionList.length === 0 ? 'active-warning' : ''}
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
                    dispatch(add(posi))
                  }}
                />
              </div>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '30%' }}>
                <Label>난이도</Label>
              </div>
              <div style={{ width: '70%' }}>
                <FilterSelect
                  onChange={(e) => {
                    setLevelget(Number(e.target.value))
                    // setPosting({ ...posting, level: Number(e.target.value) })
                  }}
                  value={levelget}
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
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '6em' }}>
            <Box sx={{ width: '4.5%' }}></Box>
            <div className="phone-section1">
              <div>
                <div className="career-label">
                  <div style={{ width: '20%' }}></div>
                </div>
                <hr></hr>
                <PositionTodo />
                <div style={{ width: '80%', display: 'flex' }}></div>
              </div>
              <CareerList
                careerList={careerList}
                onRemove={handleCareerRemove}
                onChange={handleCareerChange}
                key={careerList[0]}
              ></CareerList>
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <div style={{ width: '30%' }}>{/* <Label>팀장 포지션</Label> */}</div>
              <div style={{ width: '70%', display: 'flex' }}></div>
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
                value={contentget}
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
            공고 수정
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
export default PostingModify
