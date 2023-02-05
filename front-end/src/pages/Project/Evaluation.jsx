import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

function Evaluation() {
  return (
    <div className="evaluation-container">
      <div className="evaluation-member-bar">
        <div className="evaluation-member">이름</div>
      </div>
      <div className="evaluaiton-body">
        <div className="evaluation-date">3회차 2022.00.00 ~ 2022.00.00</div>
        <div className="evaluation-question">question</div>
        <div className="evaluation-radio-btn">
          <RadioGroup name="radio-buttons-group">
            <FormControlLabel value="0" control={<Radio />} label="매우 그렇지 않다" />
            <FormControlLabel value="1" control={<Radio />} label="그렇지 않다" />
            <FormControlLabel value="2" control={<Radio />} label="보통이다" />
            <FormControlLabel value="3" control={<Radio />} label="그렇다" />
            <FormControlLabel value="4" control={<Radio />} label="매우 그렇다" />
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
export default Evaluation
// ```
// {
//   "fromUserSeq": 31,
//   "projectSeq": 448,
//   "scoreList": [
//     {
//       "num": 1,
//       "score": 10
//     },
//     {
//       "num": 1,
//       "score": 20
//     },
//     {
//       "num": 1,
//       "score": 30
//     }
//   ],
//   "term": 1,
//   "toUserSeq": 32
// }
// ```
