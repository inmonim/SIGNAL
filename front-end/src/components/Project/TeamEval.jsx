import React, { useEffect, useState } from 'react'
import 'assets/styles/eval.css'
import api from 'api/Api'
import EvalQna from 'components/Project/EvalQna'

function TeamEval({ projectSeq }) {
  const userSeq = sessionStorage.getItem('userSeq')
  const [member, setMember] = useState([])
  const [fromUserSeq, setFromUserSeq] = useState('')
  const [toUserSeq, setToUserSeq] = useState('')
  const [flag, setFlag] = useState(false)

  const projectMemeberFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/project/member/' + projectSeq).then((res) => {
        const memberList = res.data.body.projectUserList.filter((element) => element.userSeq !== parseInt(userSeq))
        setMember(memberList)
        setToUserSeq(memberList[0].projectUserSeq)
        setFromUserSeq(
          res.data.body.projectUserList.find((element) => element.userSeq === parseInt(userSeq)).projectUserSeq
        )
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setFlag(false)
    projectMemeberFetch()
  }, [flag])

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
          <EvalQna fromUserSeq={fromUserSeq} toUserSeq={toUserSeq} projectSeq={projectSeq} setFlag={setFlag}></EvalQna>
        </div>
      </div>
    </div>
  )
}

export default TeamEval
