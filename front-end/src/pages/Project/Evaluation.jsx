import React, { useEffect, useState } from 'react'
import 'assets/styles/evaluation.css'
import api from 'api/Api'
import EvaluationQna from 'components/Project/EvaluationQna'

function Evaluation() {
  const [member, setMember] = useState([])
  const projectSeq = 721

  const [toUserSeq, setToUserSeq] = useState('')
  // location 에서 받아오기

  const projectMemeberFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/project/member/' + projectSeq).then((res) => {
        setMember(res.data.body.projectUserList)
        console.log(res.data.body)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    projectMemeberFetch()
  }, [])

  return (
    <div className="evaluation-container">
      <div className="evaluation-section">
        <div className="evaluation-member-bar">
          {member.map((item, index) => (
            <div
              className="evaluation-member"
              key={index}
              onClick={() => {
                setToUserSeq(item.projectUserSeq)
              }}
            >
              <div>{item.nickname}</div>
            </div>
          ))}
        </div>
        <EvaluationQna toUserSeq={toUserSeq} projectSeq={projectSeq}></EvaluationQna>
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
