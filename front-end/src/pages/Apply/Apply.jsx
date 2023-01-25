import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'

import plusButton from '../../assets/image/plusButton.png'
import ExpList from '../../components/Layout/ExpList'
// import CustomSelect from '../../components/common/CustomSelect'

import * as S from '../../assets/styles/apply'
import '../../assets/styles/apply.css'

const userSeq = '1'
const SERVER_URL = 'http://tableminpark.iptime.org:8080'
const PARAM_URL = `/user/${userSeq}`

const Apply = () => {
  const [nickname, setNickname] = useState([])
  const [phone, setPhone] = useState([])
  const [email, setEmail] = useState([])
  //     const [position, setPostion] = useState("FrontEnd");
  //   const [positionList, setPostionList] = useState([]);

  const [expList, setExpList] = useState([])

  // userFetch : setNickName, setPhone, setEmail
  const userFetch = async () => {
    const res = await axios.get(SERVER_URL + PARAM_URL)
    setNickname(res.data.body.nickname)
    setPhone(res.data.body.phone)
    setEmail(res.data.body.email)
  }
  const handleExpAdd = (event) => {
    const expArr = [...expList]
    const exp = {
      title: '',
    }
    expArr.push(exp)
    setExpList(expArr)
  }

  useEffect(() => {
    userFetch()
    // positionListFetch();
    // setPostion("1");
    // expListFetch();
  }, [])
  return (
    <div className="container">
      <div className="application-section">
        <div>
          <div>
            <p>이름</p>
            <S.Input
              className="input"
              value={nickname}
              disabled
              // onChange={(event) => setNickname(event.target.value)}
            />
          </div>
          <hr></hr>
          {/* 전화번호 & 이메일 입력 */}
          <div className="phone-email-section">
            <div className="phone-section">
              <p>전화번호 </p>
              <S.Input
                className="input"
                value={phone}
                disabled
                // onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="email-section">
              <p>이메일</p>
              <S.Input
                className="input"
                variant="outlined"
                value={email}
                // onChange={(event) => setEmail(event.target.value)}
                disabled
              />
            </div>
          </div>
          {/* //전화번호 & 이메일 입력 */}
          <hr></hr>

          <div>
            <div>
              <p>원하는 포지션</p>
              {/* <CustomSelect optionData={positionList} postion={position}></CustomSelect> */}
            </div>
          </div>
          <hr></hr>

          <div className="skill-meeting-section">
            <div className="skill-section">
              <p>사용기술</p>
              {/* autoComplete */}
              <S.Input className="input" id="outlined-textarea" placeholder="java" />
            </div>
            <div className="meeting-section">
              <p>화상미팅 예약</p>
              <button className="Button">시간선택 </button>
              {/*  select된 list */}
            </div>
          </div>
          <hr></hr>

          <div className="career-exp-section">
            <div className="career-section">
              <div>
                <div className="career-label">
                  <p>경력</p>
                  <Button>
                    <img src={plusButton} alt="plusButton" />
                  </Button>
                </div>
                <hr></hr>
              </div>
              <div>{/* careerList */}</div>
            </div>
            <div className="exp-section">
              <div>
                <div className="exp-label">
                  <p>경험</p>
                  <Button>
                    <img src={plusButton} alt="plusButton" onClick={handleExpAdd} />
                  </Button>
                </div>
                <hr></hr>
              </div>
              <ExpList expList={expList}></ExpList>
            </div>
          </div>
          <hr></hr>

          <div>
            <p>하고싶은 말</p>
            <div>
              <S.Input></S.Input>
            </div>
          </div>
          <hr></hr>

          <div>
            <p>지원자에게 궁금한 점</p>
            {/* 반복 */}
            <div>
              <div>Q1. mbti 무엇</div>
              <S.Input></S.Input>
            </div>
          </div>
          <hr></hr>
        </div>
        <div className="SubmitButton">
          <button className="Button">지원하기</button>
        </div>
      </div>
    </div>
  )
}
export default Apply
