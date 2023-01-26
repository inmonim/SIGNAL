import React from 'react'
import { Typography, TextField } from '@mui/material'
import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import './WriteLetter.css'

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '697px',
  marginBottom: '38px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

const SignalBtn = styled(Btn)(({ theme }) => ({
  float: 'right',
  marginRight: '210px',
  backgroundColor: '#fff',
  color: '#574B9F',
  width: '92px',
  height: '45px',
  fontSize: '29px',
  border: '1px solid #574B9F',
  borderRadius: 15,
  boxShadow: '0px 4px 7px rgba(0,0,0,0.25)',
  '&:hover': {
    backgroundColor: '#574B9F',
    borderColor: '1px solid #574B9F',
    color: '#fff',
  },
}))

function WriteLetter() {
  //   const form = useRef()
  return (
    <div className="write-form">
      <Typography sx={{ textAlign: 'left', fontSize: '44px', fontWeight: 'bold' }}>쪽지 쓰기</Typography>
      {/* <form ref={form} onSubmit={sendLetter}> */}
      <div className="send">
        <label>받는 사람</label>
        <br />
        <TextField id="filled-multiline-flexible" sx={inputStyle} name="letter_send" />
        <br />
        <label>제목</label>
        <br />
        <TextField id="filled-multiline-flexible" sx={inputStyle} name="letter_subject" />
        <br />
        <label>내용</label>
        <br />
        <TextField
          id="filled-multiline-flexible"
          multiline
          minRows={10}
          rows={10}
          sx={inputStyle}
          name="letter_content"
        />
      </div>
      {/* </form> */}
      <SignalBtn>전송</SignalBtn>
    </div>
  )
}

export default WriteLetter
