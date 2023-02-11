import React, { useEffect, useState } from 'react'
import 'assets/styles/eval.css'
import api from 'api/Api'
import EvalQna from 'components/Project/EvalQna'

function TeamEval({ projectSeq }) {
  console.log(projectSeq)
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

  const [tab, setTab] = useState(0)
  const [end, setEnd] = useState(false)

  return (
    <>
      <div className="eval-count-tab-container">
        <div className="eval-count-tab-list">
          <div
            className={`eval-count-tab ${tab === 0 ? 'active' : ''}`}
            onClick={() => {
              setTab(0)
              // 몇회차인지 상태변경
            }}
          >
            1회차
          </div>
          <div
            className={`eval-count-tab ${tab === 1 ? 'active' : ''}`}
            onClick={() => {
              setTab(1)
              // 몇회차인지 상태변경
            }}
          >
            2회차
          </div>
        </div>
      </div>
      <div className="eval-container">
        <div className="eval-section">
          <div className="eval-member-bar">
            {member.map((item, index) => (
              <div
                className={`eval-member ${end ? 'active' : ''}`}
                key={index}
                onClick={() => {
                  // 평가 완료하면 end만 true로 바꿔주면 ui 알아서 바뀜여 ~~
                  setToUserSeq(item.projectUserSeq)
                }}
              >
                <div className="eval-member-name">{item.nickname}</div>
              </div>
            ))}
          </div>
          <div className="eval-qna-container">
            {end ? (
              <div className="eval-body">
                <div className="eval-end">평가 완료</div>
              </div>
            ) : (
              <EvalQna
                fromUserSeq={fromUserSeq}
                toUserSeq={toUserSeq}
                projectSeq={projectSeq}
                setFlag={setFlag}
                setEnd={setEnd}
              ></EvalQna>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamEval
