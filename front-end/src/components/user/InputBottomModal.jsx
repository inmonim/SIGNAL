import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import 'assets/styles/profile/profileinput.css'
import SignalBtn from 'components/common/SignalBtn'
import closeBtn from 'assets/image/x.png'
import minusBtn from 'assets/image/minusButton.png'
import api from 'api/Api'

function InputBottomModal({ open, onClose, inputTopTitle }) {
  const userSeq = sessionStorage.getItem('userSeq')
  const [tag, setTag] = useState('')
  const [numberOfTags, setNumberOfTags] = useState(0)
  const [arrayOfTags, addTag] = useState([])

  const handleDelete = async (h) => {
    console.log(h)
    addTag((arrayOfTags) => arrayOfTags.filter((tag) => tag.chipseq !== h.chipseq))

    if (inputTopTitle === '경험') {
      try {
        await api.delete(process.env.REACT_APP_API_URL + `/profile/exp/${h.chipseq}`)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await api.delete(process.env.REACT_APP_API_URL + `/profile/career/${h.chipseq}`)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleHashtagChange = (event) => {
    // handleToSetTag(event.target.value)
    setTag(event.target.value)
  }
  const newTag = async () => {
    setNumberOfTags(numberOfTags + 1)
    console.log(tag)
    if (inputTopTitle === '경험') {
      await api.post(process.env.REACT_APP_API_URL + `/profile/exp/${userSeq}`, {
        content: tag,
      })

      dataFetch()
    } else {
      await api.post(process.env.REACT_APP_API_URL + `/profile/career/${userSeq}`, {
        content: tag,
      })
      dataFetch()
    }
  }

  const tags = arrayOfTags.map((h, index) => (
    <div key={index} className="user-profile-input-chip-item">
      <div onClick={() => handleDelete(h)}>
        <img src={minusBtn} alt="" className="user-profile-input-chip-minus-img" />
      </div>
      <div className="user-profile-input-chip-text">{h.content}</div>
    </div>
  ))

  const dataFetch = async () => {
    if (inputTopTitle === '경험') {
      try {
        const res = await api.get(process.env.REACT_APP_API_URL + `/profile/exp/${userSeq}`)
        const form = []
        res.data.body.userExpList.map((item) =>
          form.push({
            content: item.content,
            chipseq: item.userExpSeq,
          })
        )
        addTag(form)
        setNumberOfTags(form.length)
        console.log(form)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await api.get(process.env.REACT_APP_API_URL + `/profile/career/${userSeq}`)
        const form = []
        res.data.body.userCareerList.map((item) =>
          form.push({
            content: item.content,
            chipseq: item.userCareerSeq,
          })
        )
        addTag(form)
        setNumberOfTags(form.length)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    dataFetch()
  }, [inputTopTitle])

  useEffect(() => {}, [arrayOfTags])

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <div className="close">
            <img
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '90%',
                bottom: '80%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={() => location.reload()}
            />
          </div>
          <div className="user-profile-input-main">
            <div className="user-profile-input-title">{inputTopTitle}</div>
            <div className="user-profile-input-input">
              <TextField
                id="filled-multiline-flexible"
                name={inputTopTitle}
                label={inputTopTitle}
                value={tag}
                sx={inputStyle}
                onChange={handleHashtagChange}
                onKeyUp={(e) => {
                  if (e.code === 'Enter') newTag()
                }}
              />
              <SignalBtn
                sigwidth="80px"
                sigheight="50px"
                sigfontsize="24px"
                sigborderradius={15}
                sigmargin="auto"
                onClick={newTag}
              >
                추가
              </SignalBtn>
            </div>
            <div className="user-profile-input-chip">{numberOfTags > 0 ? tags : ''}</div>
            <div className="user-profile-input-check-btn">
              <SignalBtn
                sigwidth="60px"
                sigheight="40px"
                sigfontsize="20px"
                sigborderradius={15}
                onClick={() => location.reload()}
              >
                확인
              </SignalBtn>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  width: 607,
  height: 500,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  // overflow: 'hidden',
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '300px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

export default InputBottomModal
