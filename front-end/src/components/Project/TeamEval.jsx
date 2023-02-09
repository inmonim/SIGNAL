import React, { useEffect, useState } from 'react'
import 'assets/styles/eval.css'
import api from 'api/Api'
import EvalQna from 'components/Project/EvalQna'

function TeamEval({ projectSeq }) {
  const [member, setMember] = useState([])

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
    <div className="eval-container">
      <div className="eval-section">
        <div className="eval-member-bar">
          {member.map((item, index) => (
            <div
              className="eval-member"
              key={index}
              onClick={() => {
                setToUserSeq(item.projectUserSeq)
              }}
            >
              <div className="eval-member-name">{item.nickname}</div>
            </div>
          ))}
        </div>
        <div className="eval-qna-container">
          <EvalQna toUserSeq={toUserSeq} projectSeq={projectSeq}></EvalQna>
        </div>
      </div>
    </div>
  )
}

export default TeamEval
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
