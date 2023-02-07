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

import plusBtn from 'assets/image/plusButton.png'
import api from 'api/Api'
import moment from 'moment'

function TodoList() {
  const [tab, setTab] = useState(0)
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [dateValue, setDateValue] = useState(today)

  const [openTodoPlus, setOpenTodoPlus] = useState(false)
  const handleToAlert = () => setOpenTodoPlus(true)
  const handleToClose = () => {
    setOpenTodoPlus(false)
    setTodoModifyOpen(false)
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

  const userSeq = sessionStorage.getItem('userSeq')
  const projectSeq = 721
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
      setData(res.data.body)
    })
  }, [flag])

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

  const handleCompleteTodo = async (e) => {
    if (e.target.checked === true) {
      await api
        .put(process.env.REACT_APP_API_URL + '/todo/state/' + e.target.id, true)
        .then(() => {
          setFlag(!flag)
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
    setTodoModifyOpen(true)
  }

  return (
    <>
      <div className="todo-person-tab-container">
        <div className="todo-person-tab-list">
          <div className={`todo-person-tab ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>
            황수빈
          </div>
          <div className={`todo-person-tab ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
            나유진
          </div>
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
      </div>
      <div className="todo-kanban-container">
        <div className="todo-todos-container">
          <div className="todo-todos-header">
            <div className="todo-todos-title">ToDos</div>
            {dateValue === today ? (
              <div className="todo-todos-plus" onClick={handleToAlert}>
                <img src={plusBtn} alt="" />
              </div>
            ) : (
              <></>
            )}
            <TodoPlusModal open={openTodoPlus} onClose={handleToClose} handleFlag={handleFlag} flag={flag} />
          </div>
          <div className="todo-todos-list">
            {todoList.map((todo, index) => (
              <>
                <div className="todo-todos-list-item" key={todo.todoSeq} id={todo.todoSeq}>
                  {dateValue === today ? (
                    <FormControlLabel
                      onChange={handleCompleteTodo}
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
                  ) : (
                    <FormControlLabel
                      onChange={handleCompleteTodo}
                      control={
                        <Checkbox
                          indeterminate
                          id={todo.todoSeq}
                          sx={{
                            '& .MuiSvgIcon-root': { fontSize: 30 },
                          }}
                        />
                      }
                      disabled
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
              todoSeq={todoSeq}
              open={todoModifyOpen}
              onClose={handleToClose}
              handleFlag={handleFlag}
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
                    onChange={handleCompleteTodo}
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
