import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add, addQna } from 'store/redux'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import moment from 'moment/moment'
import { TextField, Button } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DateSelect from 'components/Posting/DateSelect'
import { positionData } from 'data/Positiondata'
import { FilterInput } from 'pages/Posting/Posting'
import QnaTodo from 'components/Posting/QnaTodo'
import AddIcon from '@mui/icons-material/Add'
import styled from 'styled-components'
import 'assets/font/font.css'
import SignalBtn from '../common/SignalBtn'

import closeBtn from 'assets/image/x.png'
import plusButton from '../../assets/image/plusButton.png'
// import api from 'api/Api'

const style = {
  width: 727,
  height: 800,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
}

// const inputStyle = {
//   backgroundColor: '#DDDBEC',
//   width: '549px',
//   marginBottom: '28px',
//   '& label.Mui-focused': {
//     color: '#574b9f',
//   },
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: '#574b9f',
//     },
//   },
// }

function RepostingModal({ open, onClose }) {
  const dispatch = useDispatch()
  const hunjae = new Date()
  const humjaetime = moment(hunjae).format('YYYY-MM-DD HH:mm:ss.SSS')
  const [datevalue, setDateValue] = useState(humjaetime)
  const [Daily, setDaily] = useState('')
  const [DateList, setDateList] = useState([])
  const [posi, setPosi] = useState({ code: 'PO100', name: 'frontend' })

  const [reposting, setReposting] = useState({
    userSeq: sessionStorage.getItem('userSeq'),
    content: '',
    postingEndDt: humjaetime,
    level: 1,
    postingMeetingList: [],
    postingSkillList: [],
    postingPositionList: [],
    postingQuestionList: [],
  })
  const handleContentChange = (event) => {
    setReposting({ ...reposting, content: event.target.value })
  }
  const [qnaList, setQnaList] = useState({
    id: 0,
    text: '',
  })

  function handleText(e) {
    setQnaList({ text: e.target.value })
  }

  function onReset() {
    setQnaList({ text: '' })
  }
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="close">
            <img
              className="closeimg"
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '90%',
                bottom: '90%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div className="reposting-title" style={{ fontSize: '44px' }}>
              재공고
            </div>
            <div className="reposting-input" style={{ display: 'inline-block' }}>
              <div
                className="reposting-project-date"
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '10px 0px' }}
              >
                <div>프로젝트 모집 기간</div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="마감 날짜"
                      value={datevalue}
                      onChange={(newValue) => {
                        const time = moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss.SSS')
                        setDateValue(time)
                      }}
                      renderInput={(params) => <TextField {...params} style={{ width: '100%' }} />}
                      minDate={hunjae}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div
                className="reposting-project-meeting"
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '10px 5px' }}
              >
                <div>화상미팅 예약</div>
                <div>
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
              <div
                className="reposting-project-position"
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '10px 0px' }}
              >
                <div>포지션 인원</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FilterSelect
                    className=""
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
              <div
                className="reposting-content"
                style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '10px 0px' }}
              >
                <div>프로젝트 소개</div>
                <div>
                  <TextField fullWidth={true} multiline={true} minRows="5" onChange={handleContentChange} />
                </div>
              </div>

              {/* 지원자에게 물어 보고 싶은 말   */}
              <div
                className="reposting-question-answer-section"
                style={{ display: 'flex', margin: '10px 0px', flexDirection: 'column' }}
              >
                <div className="reposting-question-section">
                  <div>지원자에게 물어 보고 싶은 말</div>
                </div>
                <div className="reposting-answer-section">
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (qnaList.text !== '') {
                          dispatch(addQna(qnaList.text))
                        } else alert('질문을 입력해 주세요')
                        onReset()
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <FilterInput
                          placeholder="질문을 입력하세요 "
                          type="text"
                          value={qnaList.text}
                          onChange={handleText}
                        ></FilterInput>
                        <Button
                          style={{ marginLeft: '10px' }}
                          type="submit"
                          variant="outlined"
                          startIcon={<AddIcon />}
                        ></Button>
                      </div>
                      <QnaTodo />
                    </form>
                  </div>
                </div>
              </div>
              <div className="login-btn">
                <SignalBtn
                  sigwidth="173px"
                  sigheight="90px"
                  sigfontsize="44px"
                  sigborderradius={25}
                  sigmargin="30px auto"
                  variant="contained"
                >
                  확인
                </SignalBtn>
                {/* <AlertModal
                  open={repostingAlertOpen}
                  onClick={handleToReposting}
                  onClose={handleToClose}
                  msg="재공고 하시겠습니까?"
                ></AlertModal> */}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
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

export default RepostingModal
