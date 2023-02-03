import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import 'assets/styles/profile/userpwd.css'
import SignalBtn from 'components/common/SignalBtn'
import closeBtn from 'assets/image/x.png'
import Chip from '@mui/material/Chip'

function InputModal({ open, onClose, insertTitle }) {
  const [tag, setTag] = useState('')
  const [numberOfTags, setNumberOfTags] = useState(0)
  const [arrayOfTags, addTag] = useState([])
  const handleDelete = (chipToDelete) => () => {
    addTag((chips) => chips.filter((chip) => chip.key !== chipToDelete.key))
  }
  const handleHashtagChange = (event) => setTag(event.target.value)

  const newTag = () => {
    setNumberOfTags(numberOfTags + 1)
    addTag((arrayOfTags) => arrayOfTags.concat(tag))
  }
  const tags = arrayOfTags.map((h, index) => (
    <Chip label={h} variant="outlined" sx={{ fontSize: '20px' }} key={index} onDelete={handleDelete(h)} />
  ))

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
                bottom: '85%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div className="user-pwd-main">
            <div className="user-pwd-title">{insertTitle}</div>
            <div className="user-pwd-input-container">
              <div className="user-pwd-input">
                <TextField
                  id="filled-multiline-flexible"
                  name={insertTitle}
                  label={insertTitle}
                  value={tag}
                  sx={inputStyle}
                  onChange={handleHashtagChange}
                />
              </div>
            </div>
            <SignalBtn
              sigwidth="100px"
              sigheight="50px"
              sigfontsize="24px"
              sigborderradius={15}
              sigmargin="auto"
              onClick={newTag}
            >
              입력
            </SignalBtn>
            <div>{numberOfTags > 0 ? tags : ''}</div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  width: 707,
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
}

const inputStyle = {
  backgroundColor: '#DDDBEC',
  width: '500px',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

export default InputModal
