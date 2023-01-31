import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, TextField } from '@mui/material'
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
// import { positionData } from 'data/Positiondata'
import Localdata from 'data/Localdata'
import { Fielddata2 } from 'data/Fielddata'
import Skilldata from 'data/Skilldata'
import { positionData } from 'data/Positiondata'
// import QnAList from 'components/Apply/QnaList'
import { useDispatch, useSelector } from 'react-redux'
import { add } from 'store/redux'

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
const hunjae = new Date()
const humjaetime = moment(hunjae).format('YYYY-MM-DD HH:mm:ss.SSS')
const contactList = [
  { name: '대면', status: true },
  { name: '비대면', status: false },
]

const PostingRegister = () => {
  const dispatch = useDispatch()
  // start >> useState

  const [datevalue, setDateValue] = useState(humjaetime)
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
        positionCnt: 1,
      },
      {
        positionCode: 'PO101',
        positionCnt: 2,
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

  // start >> Data filter

  // end >> Data filter

  // start >> handle position
  const [posi, setPosi] = useState({ code: 'PO100', name: 'frontend' })
  const positionRedux = useSelector((state) => state.positionTodo)
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

  // start >> handle exp

  // end >> handle exp

  // start >> handle content

  const handleContentChange = (event) => {
    setPosting({ ...posting, content: event.target.value })
  }

  // end >> handle content

  // start >> handle qna

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
        .post(process.env.REACT_APP_API_URL + '/posting', posting, config)
        .then((res) => {
          console.log(res)
          console.log(1)
        })
        .catch((err) => {
          console.log(err)
          console.log(posting)
        })

      console.log('공고 post')
    } catch (error) {
      console.log('에러')
    }
  }
  const handlePositon = () => {
    const copy = positionRedux.map((ele) => ({ positionCode: ele.id, positionCnt: ele.count }))
    setPosting({ ...posting, postingPositionList: copy })
  }
  useEffect(() => {
    // postingFetch()
    // profileFetch()
    handlePositon()
    // console.log(JSON.stringify(positionRedux))
  }, [positionRedux])

  return (
    <Container>
      <div>
        <div>
          <Title>공고 등록</Title>
        </div>
        <div>
          {/* 여기는 주제, 기간 */}
          <div style={{ display: 'flex', marginBottom: '1em', marginLeft: '5em' }}>
            <div className="phone-section">
              <Label>프로젝트 주제 </Label>
              <TextField
                sx={inputStyle}
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
                  value={datevalue}
                  onChange={(newValue) => {
                    const time = moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss.SSS')
                    setDateValue(time)
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
                onChange={(e) => {
                  console.log(e.target.value)
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
                  setPosting({ ...posting, isContact: e.target.value })
                  // console.log(range(10, 3))
                }}
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
                  setPosting({ ...posting, term: e.target.value })
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
          {/* 여기는 사용기술 , 시간선택 */}
          <div style={{ display: 'flex', marginBottom: '2em', marginLeft: '5em' }}>
            <div className="phone-section">
              <Label>사용 기술 </Label>
              <Autocomplete
                multiple
                limitTags={5}
                size="small"
                id="multiple-limit-tags"
                options={Skilldata}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  // console.log(event.target)
                  handleChangeSkill(newValue)
                }}
                renderInput={(params) => <TextField {...params} label="기술 스택 검색" placeholder="Skill" />}
                sx={{ skillStyle, width: 2 / 3, mb: 3, backgroundColor: '#fbfbfd' }}
              />
            </div>
            <div className="email-section" style={{ marginLeft: '3em' }}>
              <Label>화상 미팅 예약</Label>
              <button>시간 선택</button>
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

                        // dispatch(add(e.target.value))
                        // setPosting({ ...posting, term: e.target.value })
                      }}
                    >
                      {positionData.map((ele, i) => (
                        <option key={i} value={JSON.stringify(ele)}>
                          {ele.name}
                        </option>
                      ))}
                    </FilterSelect>
                    <img
                      src={plusButton}
                      alt="plusButton"
                      className="plus-button"
                      onClick={() => {
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
              <Label style={{ marginBottom: '1em', marginTop: '1em  ' }}>x`난이도</Label>
              <FilterSelect
                onChange={(e) => {
                  console.log(e.target.value)
                  setPosting({ ...posting, level: e.target.value })
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
              {/* <QnAList qnaList={posting.postingQuestionList} onChange={handleQnAChange}></QnAList> */}
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
