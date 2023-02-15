import React, { useEffect, useState } from 'react'
import 'assets/styles/eval.css'
import api from 'api/Api'
import EvalQna from 'components/Project/EvalQna'

function TeamEval({ projectSeq, setMode }) {
  const userSeq = sessionStorage.getItem('userSeq')
  const [member, setMember] = useState([])
  const [finishMember, setFinishMember] = useState([])
  const [weekCnt, setWeekCnt] = useState(1)
  const [nickname, setNickname] = useState('')
  const [fromUserSeq, setFromUserSeq] = useState('')
  const [toUserSeq, setToUserSeq] = useState('')
  const [flag, setFlag] = useState(false)

  const [tab, setTab] = useState(0)

  const projectMemeberFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/project/member/' + projectSeq).then(async (res) => {
        const memberList = res.data.body.projectUserList.filter((element) => element.userSeq !== parseInt(userSeq))
        const fromUser = res.data.body.projectUserList.find((element) => element.userSeq === parseInt(userSeq))
        setMember(memberList)
        setFromUserSeq(fromUser.projectUserSeq)
        if (nickname === '' && toUserSeq === '') {
          setNickname(memberList[0].nickname)
          setToUserSeq(memberList[0].projectUserSeq)
        }

        // 평가한 팀원
        await api
          .get(
            process.env.REACT_APP_API_URL +
              `/project/evaluation?projectUserSeq=${fromUser.projectUserSeq}&weekCnt=${tab + 1}`
          )
          .then((res) => {
            setFinishMember(res.data.body.evaluationList)
          })
      })
      // 현재까지 주차
      await api.get(process.env.REACT_APP_API_URL + `/project/weekCnt?projectSeq=${projectSeq}`).then((res) => {
        setWeekCnt(res.data.body)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // setFlag(false)
    projectMemeberFetch()
  }, [flag, tab])

  const cnt = []
  for (let i = 0; i < weekCnt; i++) {
    cnt.push(i)
  }

  return (
    <>
      <div className="eval-count-tab-container">
        <div className="eval-count-tab-list">
          {cnt.map((i, index) => {
            return (
              <div
                className={`eval-count-tab ${tab === i ? 'active' : ''}`}
                key={index}
                onClick={() => {
                  setTab(i)
                  // 몇회차인지 상태변경
                }}
              >
                {i + 1}회차
              </div>
            )
          })}
        </div>
      </div>
      <div className="eval-container">
        <div className="eval-section">
          <div className="eval-member-bar">
            {member.map((item, index) => (
              <div
                className={`eval-member ${finishMember.includes(item.projectUserSeq) ? 'active' : ''}`}
                key={index}
                onClick={() => {
                  setToUserSeq(item.projectUserSeq)
                  setNickname(item.nickname)
                  setFlag(!flag)
                  console.log(nickname)
                }}
              >
                <div className="eval-member-name">{item.nickname}</div>
              </div>
            ))}
          </div>
          <div className="eval-qna-container">
            <EvalQna
              fromUserSeq={fromUserSeq}
              toUserSeq={toUserSeq}
              projectSeq={projectSeq}
              tab={tab + 1}
              nickname={nickname}
              weekCnt={weekCnt}
              flag={flag}
              setFlag={setFlag}
              setMode={setMode}
            ></EvalQna>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeamEval
