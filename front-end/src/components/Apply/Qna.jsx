import React, { useEffect } from 'react'
import { TextField } from '@mui/material'

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
  margin: '10px 0px',
}

function Qna({ question, id, onChange }) {
  const handleQnAChange = (event) => {
    onChange(event.target.value, id)
  }

  useEffect(() => {}, [])
  return (
    <div style={{ margin: '10px 0px' }}>
      <div style={{ marginBottom: '5px', color: '#574b9f' }}>{question.content}</div>
      <TextField
        style={textAreaStyle}
        fullWidth={true}
        multiline={true}
        minRows="2"
        defaultValue={question.defaultValue}
        onChange={handleQnAChange}
      />
    </div>
  )
}

export default Qna
