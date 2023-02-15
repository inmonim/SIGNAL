import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { FormControlLabel } from '@mui/material'
import QuestionIcon from 'assets/image/question-icon.png'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/eval.css'
import api from 'api/Api'
import AlertModal from 'components/AlertModal'

function EvalQna({ fromUserSeq, toUserSeq, projectSeq, tab, weekCnt, setFlag, nickname, flag, setMode }) {
  const [score, setScore] = useState([])
  const [evaluationStartDt, setEvaluationStartDt] = useState('')
  const [evaluationEndDt, setEvaluationEndDt] = useState('')
  const [question, setQuestion] = useState([])

  const [evalHistory, setEvalHistory] = useState([])

  const [alertOpen, setAlertOpen] = useState(false)
  const [msg, setMsg] = useState('')

  const evaluationSubmit = () => {
    if (score.length === 5) {
      setMsg('평가를 완료하였습니다.')
    } else {
      setMsg('평가하지 않은 항목이 있습니다.')
    }
    setAlertOpen(true)
  }
  const handleToClose = () => setAlertOpen(false)

  const handleScoreChange = (e, index) => {
    const scoreArr = [...score]
    scoreArr.splice(e.target.name, 1, e.target.value)
    setScore(scoreArr)
  }

  const handleToEval = async () => {
    try {
      if (score.length === 5) {
        await api
          .post(process.env.REACT_APP_API_URL + '/project/evaluation', {
            fromUserSeq,
            projectSeq,
            scoreList: score.map((item, index) => ({ num: index + 1, score: item })),
            weekCnt,
            toUserSeq,
          })
          .then(() => {
            setFlag(!flag)
            setAlertOpen(false)
          })
        setMode(0)
      } else {
        setMsg('평가하지 않은 항목이 있습니다.')
      }
    } catch (error) {
      setMsg('이미 평가한 팀원 입니다.')
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

    await api
      .get(
        process.env.REACT_APP_API_URL +
          `/project/evaluation/history?toUserSeq=${toUserSeq}&fromUserSeq=${fromUserSeq}&weekCnt=${tab}`
      )
      .then((res) => {
        setEvalHistory(res.data.body)
        console.log('toUserSeq', toUserSeq, 'fromUserSeq', fromUserSeq, 'weekCnt', weekCnt)
        console.log(evalHistory)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    evaluationFetch()
    console.log(evalHistory)
  }, [flag, toUserSeq, tab])

  return (
    <div className="eval-body">
      {weekCnt !== tab ? <div className="last-eval">❗ 지난 평가입니다.</div> : <></>}
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
            {evalHistory && evalHistory.length === 0 ? (
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
            ) : (
              <RadioGroup name={`${index}`} sx={{ flexDirection: 'row' }}>
                {evalHistory && evalHistory[index].score === 10 ? (
                  <FormControlLabel
                    value="10"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={true}
                    label="매우 그렇지 않다"
                  />
                ) : (
                  <FormControlLabel
                    value="10"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={false}
                    label="매우 그렇지 않다"
                  />
                )}
                {evalHistory[index].score === 20 ? (
                  <FormControlLabel
                    value="20"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={true}
                    label="그렇지 않다"
                  />
                ) : (
                  <FormControlLabel
                    value="20"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={false}
                    label="그렇지 않다"
                  />
                )}
                {evalHistory[index].score === 30 ? (
                  <FormControlLabel
                    value="30"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={true}
                    label="보통이다"
                  />
                ) : (
                  <FormControlLabel
                    value="30"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={false}
                    label="보통이다"
                  />
                )}
                {evalHistory[index].score === 40 ? (
                  <FormControlLabel
                    value="40"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={true}
                    label="그렇다"
                  />
                ) : (
                  <FormControlLabel
                    value="40"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={false}
                    label="그렇다"
                  />
                )}
                {evalHistory[index].score === 50 ? (
                  <FormControlLabel
                    value="50"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={true}
                    label="매우 그렇다"
                  />
                ) : (
                  <FormControlLabel
                    value="50"
                    control={<Radio checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#796FB2' }} />} />}
                    disabled
                    checked={false}
                    label="매우 그렇다"
                  />
                )}
              </RadioGroup>
            )}
          </div>
        </div>
      ))}
      {weekCnt === tab && evalHistory && evalHistory.length === 0 ? (
        <>
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
          <AlertModal msg={msg} open={alertOpen} onClick={handleToEval} onClose={handleToClose}></AlertModal>
        </>
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
