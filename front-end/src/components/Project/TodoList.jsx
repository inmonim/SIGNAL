import React, { useEffect, useState } from 'react'
import 'assets/styles/project/todolist.css'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TodoPlusModal from './TodoPlusModal'
import TodoModifyModal from './TodoModifyModal'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import plusBtn from 'assets/image/plusButton.png'
import api from 'api/Api'
import moment from 'moment'
import AlertModal from 'components/AlertModal'

function TodoList({ projectSeq }) {
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [dateValue, setDateValue] = useState(today)

  const [openTodoPlus, setOpenTodoPlus] = useState(false)
  const handleToAlert = () => setOpenTodoPlus(true)
  const handleToClose = () => {
    setOpenTodoPlus(false)
    setTodoModifyOpen(false)
    setComplAlertOpen(false)
  }

  function dateToString(value) {
    if (value !== null) {
      const year = String(value.$y)
      let month = ''
      let day = ''
      if (value.$M + 1 >= 10) {
        month = String(value.$M + 1)
      } else {
        month = '0' + String(value.$M + 1)
      }
      if (value.$D >= 10) {
        day = String(value.$D)
      } else {
        day = '0' + String(value.$D)
      }
      const birthString = `${year}-${month}-${day}`
      return birthString
    }
  }

  // 프로젝트 팀 구성원 조회
  const [member, setMember] = useState([])
  const MemberFetch = async () => {
    await api({
      url: process.env.REACT_APP_API_URL + '/project/member/' + projectSeq,
      method: 'GET',
    }).then((res) => {
      setMember(res.data.body.projectUserList)
    })
  }
  const memberList = []
  member.map((item) =>
    memberList.push({
      userSeq: item.userSeq,
      nickname: item.nickname,
    })
  )
  console.log(memberList)

  useEffect(() => {
    MemberFetch()
  }, [])

  const [userSeq, setUserSeq] = useState(sessionStorage.getItem('userSeq'))
  const currentUser = sessionStorage.getItem('userSeq')
  const regDt = dateValue

  const [data, setData] = useState('')
  const [flag, setFlag] = useState(false)

  const dateInput = (e) => {
    setDateValue(dateToString(e))
    setFlag(!flag)
  }

  const handleFlag = (n) => {
    setFlag(n)
  }

  useEffect(() => {
    api({
      url: process.env.REACT_APP_API_URL + '/todo',
      method: 'GET',
      params: { userSeq, projectSeq, regDt },
    }).then((res) => {
      console.log(res.data.body)
      console.log('userSeq:', userSeq)
      setData(res.data.body)
    })
  }, [flag, userSeq])

  const todoList = []
  const completedTodoList = []

  const AddArray = () => {
    Array.from(data).forEach((item) => {
      item.toDoCode.code === 'TD100'
        ? todoList.push({
            todoSeq: item.projectToDoSeq,
            content: item.content,
            todoCode: item.toDoCode.code,
          })
        : completedTodoList.push({
            todoSeq: item.projectToDoSeq,
            content: item.content,
            todoCode: item.toDoCode.code,
          })
    })
  }
  AddArray()

  const [complAlertOpen, setComplAlertOpen] = useState(false)
  const [todoId, setTodoId] = useState('')
  const handleToComplAlert = (e) => {
    setTodoId(e.target.id)
    setComplAlertOpen(true)
  }

  const handleCompleteTodo = async () => {
    setComplAlertOpen(false)
    await api
      .put(process.env.REACT_APP_API_URL + '/todo/state/' + todoId, true)
      .then(() => {
        setFlag(!flag)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [todoModifyOpen, setTodoModifyOpen] = useState(false)
  const [todoSeq, setTodoSeq] = useState(0)
  const [content, setContent] = useState('')
  const handleToModify = async (e) => {
    const { id } = e.target
    const nextSeq = { ...todoSeq, id }
    setTodoSeq(nextSeq.id)
    console.log('.', nextSeq.id)
    try {
      await api.get(process.env.REACT_APP_API_URL + '/todo/' + e.target.id).then((res) => {
        setContent(res.data.body.content)
        console.log(res.data.body.content)
      })
    } catch (e) {
      console.log(e)
    }
    alertOpen()
  }
  const alertOpen = () => {
    if (userSeq === JSON.parse(currentUser)) setTodoModifyOpen(true)
  }

  return (
    <>
      <div className="todo-person-tab-container">
        <div className="todo-person-tab-list">
          {memberList.map((mem, index) => {
            return (
              <div
                key={mem.userSeq}
                id={index}
                className={`todo-person-tab ${
                  userSeq === mem.userSeq || (index === 0 && userSeq === currentUser) ? 'active' : ''
                }`}
                onClick={() => {
                  setUserSeq(mem.userSeq)
                  console.log('.', userSeq)
                }}
              >
                {mem.nickname}
              </div>
            )
          })}
        </div>
      </div>
      <div className="todo-date-container">
        <div className="todo-date">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateValue}
              inputFormat="YYYY-MM-DD"
              onChange={dateInput}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    '.MuiInputBase-input': { border: 0 },
                  }}
                />
              )}
            />
            {console.log(dateValue)}
          </LocalizationProvider>
        </div>
      </div>
      <div className="todo-kanban-container">
        <div className="todo-todos-container">
          <div className="todo-todos-header">
            <div className="todo-todos-title">ToDos</div>
            {(dateValue === today && userSeq === JSON.parse(currentUser)) || userSeq === currentUser ? (
              <div className="todo-todos-plus" onClick={handleToAlert}>
                <img src={plusBtn} alt="" />
              </div>
            ) : (
              <></>
            )}
            <TodoPlusModal
              userSeq={userSeq}
              projectSeq={projectSeq}
              open={openTodoPlus}
              onClose={handleToClose}
              handleFlag={handleFlag}
              flag={flag}
            />
          </div>
          <div className="todo-todos-list">
            {todoList.map((todo, index) => (
              <>
                <div className="todo-todos-list-item" key={todo.todoSeq} id={todo.todoSeq}>
                  {(dateValue === today && userSeq === JSON.parse(currentUser)) || userSeq === currentUser ? (
                    <>
                      <FormControlLabel
                        onChange={handleToComplAlert}
                        control={
                          <Checkbox
                            id={todo.todoSeq}
                            defaultChecked={false}
                            sx={{
                              '& .MuiSvgIcon-root': { fontSize: 30 },
                              color: '#574B9F',
                              '&.Mui-checked': { color: '#574B9F' },
                            }}
                          />
                        }
                      />
                      <AlertModal
                        open={complAlertOpen}
                        onClick={handleCompleteTodo}
                        onClose={handleToClose}
                        msg="완료하셨습니까?"
                      ></AlertModal>
                    </>
                  ) : (
                    <WarningAmberIcon
                      sx={{
                        color: 'red',
                        borderRadius: '15px',
                      }}
                      fontSize="inherit"
                    />
                  )}
                  <div className="todo-todos-list-item-container" id={todo.todoSeq} onClick={handleToModify}>
                    <div id={todo.todoSeq} className="todo-todos-list-item-content" draggable>
                      {todo.content}
                    </div>
                    <div className="todo-todos-list-item-regDt">{regDt}</div>
                  </div>
                </div>
              </>
            ))}
            <TodoModifyModal
              open={todoModifyOpen}
              onClose={handleToClose}
              flag={flag}
              handleFlag={handleFlag}
              todoSeq={todoSeq}
              content={content}
            ></TodoModifyModal>
          </div>
        </div>
        <div className="todo-completed-container">
          <div className="todo-completed-header">
            <div className="todo-completed-title">Completed</div>
          </div>
          <div className="todo-completed-list">
            {completedTodoList.map((todo) => (
              <>
                <div className="todo-completed-list-item" key={todo.todoSeq} id={todo.todoSeq}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={todo.todoSeq}
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 30 },
                          color: 'white',
                          '&.Mui-checked': { color: 'white' },
                        }}
                      />
                    }
                    disabled
                    checked
                  />
                  <div className="todo-completed-list-item-container" id={todo.todoSeq}>
                    <div id={todo.todoSeq} className="todo-completed-list-item-content">
                      {todo.content}
                    </div>
                    <div className="todo-completed-list-item-regDt">{regDt}</div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
