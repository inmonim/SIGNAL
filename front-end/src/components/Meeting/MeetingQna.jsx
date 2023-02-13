// import api from 'api/Api'
import React, { useState, useEffect } from 'react'
import cancleButton from 'assets/image/x.png'
import 'assets/styles/beforemeeting.css'
import { Modal, Box, Typography } from '@mui/material'
import api from 'api/Api'

function MeetingQna({ open, onClose, applySeq, postingSeq }) {
  const [questionList, setQuestionList] = useState([])
  const [answerList, setAnswerList] = useState([])

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + '/apply/' + applySeq).then((res) => {
      setAnswerList(res.data.body.answerList)
      console.log(answerList)
    })
    api.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq).then((res) => {
      setQuestionList(res.data.body.postingQuestionList)
      console.log(questionList)
    })
  }, [open])

  return (
    <Modal open={open} onClose={onClose} hideBackdrop={true}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
          사전 미팅 답변
        </Typography>
        <img src={cancleButton} alt="plusButton" style={cancleButtonStyle} onClick={onClose} />
        <div className="before-meeting-body">
          <hr></hr>
          <div>
            {questionList &&
              questionList.map((question, index) => (
                <div key={question.postingQuestionSeq} style={{ margin: '10px 0px' }}>
                  <div className="before-meeting-qusetion">
                    {index + 1}. {question.content}
                  </div>
                  <div className="before-meeting-answer">
                    {answerList
                      .filter((answer) => answer.postingQuestionSeq === question.postingQuestionSeq)
                      .map((item) => (
                        <div key={item.applyAnswerSeq}>{item.content}</div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Box>
    </Modal>
  )
}
export default MeetingQna

const style = {
  position: 'absolute',
  top: '67%',
  left: '83.5%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  backgroundColor: '#DDDBEC',
  borderRadius: 8,
  p: 4,
}

const cancleButtonStyle = {
  width: ' 40px',
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
}
