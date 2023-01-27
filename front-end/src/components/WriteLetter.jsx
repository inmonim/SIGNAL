import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import './WriteLetter.css'
import AlertModal from 'components/AlertModal'

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

function WriteLetter({ handleMenuListItemClick }) {
  const [alertOpen, setAlertOpen] = useState(false)
  const [inputs, setInputs] = useState({
    nickname: '',
    title: '',
    content: '',
    userSeq: sessionStorage.getItem('userSeq'),
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...inputs, [name]: value }
    setInputs(nextInputs)
    console.log(nextInputs)
  }

  const handleSend = () => {
    fetch(process.env.REACT_APP_API_URL + '/letter', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (response.ok === true) {
          setAlertOpen(true)
          return response.json()
        } else {
          alert('다시 시도')
        }
      })
      .then((data) => {
        console.log(`data: ${JSON.stringify(data)}`)
      })
  }

  const handleToSend = (e) => {
    setAlertOpen(false)
    handleMenuListItemClick(1)
  }
  return (
    <div className="write-form">
      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'inline-block', fontSize: '44px', fontWeight: 'bold', marginBottom: '26px' }}>
          쪽지 쓰기
        </div>
        <div className="send">
          <label>받는 사람</label>
          <br />
          <TextField id="filled-multiline-flexible" sx={inputStyle} name="nickname" onChange={handleInput} />
          <br />
          <label>제목</label>
          <br />
          <TextField id="filled-multiline-flexible" sx={inputStyle} name="title" onChange={handleInput} />
          <br />
          <label>내용</label>
          <br />
          <TextField
            id="filled-multiline-flexible"
            rows={10}
            multiline
            sx={inputStyle}
            name="content"
            onChange={handleInput}
          />
        </div>
      </div>

      <SignalBtn onClick={handleSend}>전송</SignalBtn>
      <AlertModal open={alertOpen} onClick={handleToSend} msg="전송되었습니다."></AlertModal>
    </div>
  )
}

export default WriteLetter
