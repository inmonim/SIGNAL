import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { FormControlLabel } from '@mui/material'
import QuestionIcon from 'assets/image/question-icon.png'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/eval.css'
// import api from 'api/Api'

function EvaluationQna(toUserSeq, projectSeq) {
  const userSeq = sessionStorage.getItem('userSeq')
  const [score, setScore] = useState([0, 0, 0, 0, 0])

  const handleScoreChange = (e, index) => {
    console.log(e.target.name)
    const scoreArr = [...score]
    scoreArr.splice(e.target.name, 1, e.target.value)
    setScore(scoreArr)
    console.log(scoreArr)
  }
  const question = [
    '의사소통에 적극적으로 참여했나요?',
    '약속 시간을 잘 지켰나요?',
    '얼마나 프로젝트에 성실히 임했나요?',
    '얼마나 목표를 이행하였나요?',
    '얼마나 프로젝트에 기여했나요?',
  ]

  const evaluationSubmit = async () => {
    try {
      // await api.post(process.env.REACT_APP_API_URL + '/project/evaluation', {
      //   fromUserSeq: userSeq,
      //   projectSeq,
      //   scoreList: score.map((item, index) => ({ num: index + 1, score: item })),
      //   // term: ???/
      //   toUserSeq,
      // })
      console.log({
        fromUserSeq: userSeq,
        projectSeq,
        scoreList: score.map((item, index) => ({ num: index + 1, score: item })),
        // term: ???/
        toUserSeq,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="eval-body">
      <div className="eval-date">3회차 2022.00.00 ~ 2022.00.00</div>
      {question.map((item, index) => (
        <div key={index}>
          <div className="eval-question">
            <img src={QuestionIcon} alt="" style={{ width: '30px' }} />
            {item}
          </div>
          <div className="eval-radio-btn">
            <RadioGroup name={index} sx={{ flexDirection: 'row' }} onChange={handleScoreChange}>
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

      <SignalBtn
        onClick={() => {
          evaluationSubmit()
        }}
      >
        평가 완료
      </SignalBtn>
    </div>
  )
}
export default EvaluationQna
