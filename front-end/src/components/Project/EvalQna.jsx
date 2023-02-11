import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { FormControlLabel } from '@mui/material'
import QuestionIcon from 'assets/image/question-icon.png'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/eval.css'
import api from 'api/Api'

function EvalQna({ fromUserSeq, toUserSeq, projectSeq, tab, weekCnt, setFlag, nickname }) {
  const [score, setScore] = useState([])
  const [evaluationStartDt, setEvaluationStartDt] = useState('')
  const [evaluationEndDt, setEvaluationEndDt] = useState('')
  const [question, setQuestion] = useState([])

  const handleScoreChange = (e, index) => {
    const scoreArr = [...score]
    scoreArr.splice(e.target.name, 1, e.target.value)
    setScore(scoreArr)
  }

  const evaluationSubmit = async () => {
    try {
      await api
        .post(process.env.REACT_APP_API_URL + '/project/evaluation', {
          fromUserSeq,
          projectSeq,
          scoreList: score.map((item, index) => ({ num: index + 1, score: item })),
          weekCnt: weekCnt,
          toUserSeq,
        })
        .then(() => {
          setFlag(true)
        })
    } catch (error) {
      alert('이미 평가한 팀원 입니다.')
    }
  }

  const evaluationFetch = async () => {
    await api
      .get(process.env.REACT_APP_API_URL + `/project/evaluation/` + projectSeq)
      .then((response) => {
        setQuestion(response.data.body.questionList)
        setEvaluationStartDt(response.data.body.evaluationStartDt)
        setEvaluationEndDt(response.data.body.evaluationEndDt)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    evaluationFetch()
  }, [toUserSeq])

  return (
    <div className="eval-body">
      <div className="eval-date">{nickname} 님 평가</div>
      <div className="eval-date">
        {tab}회차 {evaluationStartDt} ~ {evaluationEndDt}
      </div>
      {question.map((item, index) => (
        <div key={index} className="eval-question-body">
          <div className="eval-question">
            <img src={QuestionIcon} alt="" style={{ width: '30px' }} />
            {item.content}
          </div>
          <div className="eval-radio-btn">
            <RadioGroup name={`${index}`} sx={{ flexDirection: 'row' }} onChange={handleScoreChange}>
              <FormControlLabel
                value="10"
                control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                label="매우 그렇지 않다"
              />
              <FormControlLabel
                value="20"
                control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                label="그렇지 않다"
              />
              <FormControlLabel
                value="30"
                control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                label="보통이다"
              />
              <FormControlLabel
                value="40"
                control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                label="그렇다"
              />
              <FormControlLabel
                value="50"
                control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                label="매우 그렇다"
              />
            </RadioGroup>
          </div>
        </div>
      ))}
      {weekCnt === tab ? (
        <SignalBtn
          sigwidth="224px"
          sigheight="52px"
          sigborderradius={14}
          sigfontsize="24px"
          sigmargin="43px auto"
          sx={BtnStyle}
          onClick={() => {
            evaluationSubmit()
          }}
        >
          평가 완료
        </SignalBtn>
      ) : (
        <></>
      )}
    </div>
  )
}
export default EvalQna

const BtnStyle = {
  backgroundColor: '#fff',
  color: '#574B9F',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: '#fff',
  },
}
