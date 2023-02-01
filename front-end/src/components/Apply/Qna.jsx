import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
  margin: '10px 0px',
}

function Qna({ question, id, onChange, answerList }) {
  const [answer, setAnswer] = useState('')

  const setDefaultAnswer = () => {
    if (answerList !== undefined) {
      answerList.forEach((item) => {
        if (item.postingQuestionSeq === id) setAnswer(item.content)
      })
    }
  }

  const handleQnAChange = (event) => {
    onChange(event.target.value, id)
  }

  useEffect(() => {
    setDefaultAnswer()
  }, [])
  return (
    <div style={{ margin: '10px 0px' }}>
      <div style={{ marginBottom: '5px', color: '#574b9f' }}>{question.content}</div>
      <TextField
        style={textAreaStyle}
        fullWidth={true}
        multiline={true}
        minRows="2"
        defaultValue={answer || ''}
        onChange={handleQnAChange}
      />
    </div>
  )
}

export default Qna
