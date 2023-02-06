import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import 'assets/styles/profile/profileinput.css'
import SignalBtn from 'components/common/SignalBtn'
import closeBtn from 'assets/image/x.png'
import Chip from '@mui/material/Chip'
import Select from 'react-select'
import { getSkillCode } from 'data/Skilldata'
import { getPositionCode } from 'data/Positiondata'
import api from 'api/Api'

function InputTopModal({ open, onClose, inputTopTitle, Options }) {
  const userSeq = sessionStorage.getItem('userSeq')
  const [tag, setTag] = useState('')
  const [numberOfTags, setNumberOfTags] = useState(0)
  const [arrayOfTags, addTag] = useState([])

  const handleDelete = (h) => () => {
    addTag((arrayOfTags) => arrayOfTags.filter((tag) => tag !== h))
  }
  const handleHashtagChange = (event) => {
    setTag(event.label)
  }
  const newTag = () => {
    const set = new Set(arrayOfTags.concat(tag))
    setNumberOfTags(set.size)
    const uniqueTags = Array.from(set)
    addTag(uniqueTags)
  }

  const tags = arrayOfTags.map((h, index) => (
    <Chip
      label={h}
      variant="outlined"
      sx={{ fontSize: '20px', margin: '5px' }}
      key={index}
      onDelete={handleDelete(h)}
    />
  ))

  const handleToProfile = async () => {
    if (inputTopTitle === '스킬') {
      arrayOfTags.map(async (item) => {
        await api.post(process.env.REACT_APP_API_URL + `/profile/skill/${userSeq}`, {
          skillCode: getSkillCode(item),
        })
      })

      console.log(arrayOfTags.map((item) => getSkillCode(item)))
    } else {
      arrayOfTags.map(async (item) => {
        await api.post(process.env.REACT_APP_API_URL + `/profile/position/${userSeq}`, {
          positionCode: getPositionCode(item),
        })
      })
      console.log(arrayOfTags.map((item) => getPositionCode(item)))
    }

    onClose(onClose(true))
  }

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
              onClick={onClose}
            />
          </div>
          <div className="user-profile-input-main">
            <div className="user-profile-input-title">{inputTopTitle}</div>
            <div className="user-profile-input-input">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="position"
                options={Options}
                onChange={handleHashtagChange}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: '#574b9f',
                    backgroundColor: '#DDDBEC',
                    width: '300px',
                    height: '50px',
                    fontSize: '22px',
                    ':hover': {
                      backgroundColor: '#DDDBEC',
                      borderColor: '#574b9f',
                      cursor: 'pointer',
                    },
                  }),
                  option: (baseStyles) => ({
                    ...baseStyles,
                    fontSize: '22px',
                    ':hover': {
                      backgroundColor: '#DDDBEC',
                    },
                    ':focus': {
                      backgroundColor: '#574b9f',
                    },
                    ':checked': {
                      backgroundColor: '#574b9f',
                    },
                  }),
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
                onClick={handleToProfile}
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

// const inputStyle = {
//   backgroundColor: '#DDDBEC',
//   width: '300px',
//   '& label.Mui-focused': {
//     color: '#574b9f',
//   },
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: '#574b9f',
//     },
//   },
// }

export default InputTopModal
