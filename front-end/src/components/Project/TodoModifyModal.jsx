import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import 'assets/styles/profile/profileinput.css'
import SignalBtn from 'components/common/SignalBtn'
import AlertModal from 'components/AlertModal'
import closeBtn from 'assets/image/x.png'
import api from 'api/Api'

function TodoModifyModal({ open, onClose, handleFlag, todoSeq }) {
  const [content, setContent] = useState('')
  useEffect(() => {
    api({
      url: process.env.REACT_APP_API_URL + '/todo/' + todoSeq,
      method: 'GET',
      params: { todoSeq },
    }).then((res) => {
      console.log(res.data.body)
      setContent(res.data.body.content)
    })
  }, [todoSeq])

  const [todo, setTodo] = useState('')
  const handleInput = (e) => {
    const { name, value } = e.target
    const nextInputs = { ...todo, [name]: value }
    setTodo(nextInputs)
    console.log('.', nextInputs)
  }

  const [alert, setAlert] = useState(false)
  const handleToMAlert = async () => {
    try {
      const req = {
        todoSeq,
      }
      await api.put(process.env.REACT_APP_API_URL + '/todo/' + todoSeq, req).then((res) => {
        console.log(res)
        setAlert(true)
      })
    } catch (e) {
      console.log(e)
    }
  }
  const handleToDAlert = async () => {}
  const handleToModify = () => {
    setAlert(false)
    onClose(true)
    handleFlag(true)
  }
  const handleToDelete = () => {
    setAlert(false)
    onClose(true)
    handleFlag(true)
  }
  const handleToClose = () => {
    setAlert(false)
    onClose(true)
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
            <div className="todo-input-title">To Do 수정</div>
            <div className="todo-input-input">
              <TextField
                id="filled-multiline-flexible"
                name="content"
                defaultValue={content}
                sx={inputStyle}
                onChange={handleInput}
              />
            </div>
            <div className="todo-modify-btn">
              <SignalBtn
                sigwidth="60px"
                sigheight="40px"
                sigfontsize="20px"
                sigborderradius={15}
                sigmargin="0px 5px"
                onClick={handleToMAlert}
              >
                수정
              </SignalBtn>
              <AlertModal
                msg="수정하시겠습니까?"
                open={alert}
                onClick={handleToModify}
                onClose={handleToClose}
              ></AlertModal>
              <SignalBtn
                sigwidth="60px"
                sigheight="40px"
                sigfontsize="20px"
                sigborderradius={15}
                sigmargin="0px 5px"
                onClick={handleToDAlert}
              >
                삭제
              </SignalBtn>
              <AlertModal
                msg="삭제하시겠습니까?."
                open={alert}
                onClick={handleToDelete}
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

export default TodoModifyModal
