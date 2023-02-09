// import api from 'api/Api'
import React from 'react'
import cancleButton from 'assets/image/x.png'
import 'assets/styles/beforemeeting.css'

function MeetingQna(setQnaOpen) {
  console.log(setQnaOpen)

  const handleQnaClose = () => {
    setQnaOpen(false)
  }

  const qna = [
    {
      question: '질문1',
      answer: '답변1',
    },
  ]

  // const qnaFetch = () => {
  //   // try {
  //   //   await api.get('').then((res) => {
  //   //     setQna(res.data.body)
  //   //     console.log(qna)
  //   //   })
  //   // } catch (error) {
  //   //   console.log(error)
  //   // }
  //   console.log('get Meeting Qna')
  // }
  // useEffect({ qnaFetch }, [open])
  return (
    <div>
      <div className="before-meeting-qna-header">
        <div className="before-meeting-qna-title">답변</div>
        <img className="before-meeting-qna-cancel-btn" src={cancleButton} alt="" onClick={handleQnaClose} />
      </div>
      <div className="before-meeting-body">
        <div className="before-meeting-qna-applyName">지원자이름</div>
        <hr />
        <div className="before-meeting-qna-list">
          {qna.map((item, index) => (
            <div key={index} className="before-meeting-qna-item">
              <div className="before-meeting-qusetion">{item.question}</div>
              <div className="before-meeting-answer">{item.answer} </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default MeetingQna
