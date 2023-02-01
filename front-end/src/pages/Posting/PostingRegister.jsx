import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import Skilldata from 'data/Skilldata'
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
  const [datevalue, setDateValue] = useState(humjaetime)
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

  // const handleQnAChange = (value, key) => {
  //   const qnaArr = [...qnaList]
  //   qnaArr.splice(key, 1, value)
  //   setQnaList(qnaArr)
  //   console.log(qnaList)
  // }

  // end >> handle qna
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
      title: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
      title: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ]
  const handleApplySubmit = async (event) => {
    try {
      const config = { 'Content-Type': 'application/json' }

      await axios
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

  return (
    <Container>
      <div>
        <div>
          <Title>공고 등록</Title>
          <Autocomplete
            multiple
            id="tags-standard"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[13]]}
            getOptionSelected={(option, value) => option.value === value.value}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Multiple values" placeholder="Favorites" />
            )}
          />
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
                  if (e.target.value === 'true') {
                    setPosting({ ...posting, isContact: true })
                  } else {
                    setPosting({ ...posting, isContact: false })
                  }
                  // console.log(typeof e.target.value)
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
                  // console.log(newValue)
                  // console.log(event.target)
                  handleChangeSkill(newValue)
                }}
                renderInput={(params) => <TextField {...params} label="기술 스택 검색" placeholder="Skill" />}
                sx={{ skillStyle, width: 2 / 3, mb: 3, backgroundColor: '#fbfbfd' }}
              />
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
              <Stack direction="row" spacing={1} style={{ marginLeft: '3em', overflowX: 'scroll', width: '500px' }}>
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
export default PostingRegister
