import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import 'assets/styles/profile/profileinput.css'
import SignalBtn from 'components/common/SignalBtn'
import AlertModal from 'components/AlertModal'
import closeBtn from 'assets/image/x.png'
import api from 'api/Api'

function TodoPlusModal({ open, onClose, handleFlag, flag, userSeq, projectSeq }) {
  const [todo, setTodo] = useState('')
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...todo, [name]: value }
    setTodo(nextInputs)
  }
  const [alert, setAlert] = useState(false)
  const handleToPlus = () => {
    setAlert(false)
    onClose(true)
    handleFlag(!flag)
  }
  const handleToClose = () => {
    setAlert(false)
    onClose(true)
    handleFlag(flag)
  }

  const handleToAdd = async () => {
    try {
      const todoReq = {
        content: todo.content,
        projectSeq,
        userSeq,
      }
      await api
        .post(process.env.REACT_APP_API_URL + '/todo', JSON.stringify(todoReq), {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res)
          setAlert(true)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      handleToAdd()
    }
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
                right: '10px',
                top: '10px',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div className="todo-input-main">
            <div className="todo-input-title">To Do 추가</div>
            <div className="todo-input-input">
              <TextField
                id="filled-multiline-flexible"
                name="content"
                label="To Do"
                sx={inputStyle}
                onChange={handleInput}
                onKeyDown={(e) => activeEnter(e)}
              />
            </div>
            <div className="user-profile-input-check-btn">
              <SignalBtn sigwidth="60px" sigheight="40px" sigfontsize="20px" sigborderradius={15} onClick={handleToAdd}>
                등록
              </SignalBtn>
              <AlertModal
                msg="등록되었습니다."
                open={alert}
                onClick={handleToPlus}
                onClose={handleToClose}
              ></AlertModal>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  width: 607,
  height: 300,
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
  width: '100%',
  '& label.Mui-focused': {
    color: '#574b9f',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#574b9f',
    },
  },
}

export default TodoPlusModal
