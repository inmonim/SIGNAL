import React from 'react'
import { TextField } from '@mui/material'
import styled from 'styled-components'

const Label = styled.h1`
  font-size: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`

const textAreaStyle = {
  backgroundColor: '#f3f5f7',
}

function Qna({ question, id, onChange }) {
  const handleQnAChange = (event) => {
    onChange(event.target.value, id)
  }
  return (
    <div>
      <Label className="question-label">{question.content}</Label>
      <TextField style={textAreaStyle} fullWidth={true} multiline={true} minRows="1" onChange={handleQnAChange} />
    </div>
  )
}

export default Qna
