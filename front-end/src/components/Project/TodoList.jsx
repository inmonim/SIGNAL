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

function TodoList() {
  const [tab, setTab] = useState(0)
  const now = new Date()
  const year = now.getFullYear()
  const month = ('0' + (now.getMonth() + 1)).slice(-2)
  const date = ('0' + now.getDate()).slice(-2)
  const today = year + '-' + month + '-' + date
  const [dateValue, setDateValue] = useState(today)

  const [openTodoPlus, setOpenTodoPlus] = useState(false)
  const handleToAlert = () => setOpenTodoPlus(true)
  const handleToClose = () => {
    setOpenTodoPlus(false)
    setModalOpen(false)
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
  const [code, setCode] = useState('TD100')

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

  const [completeTodo, setCompleteTodo] = useState(false)

  const handleCompleteTodo = async () => {
    const nextCompleteTodo = completeTodo
    setCompleteTodo(!nextCompleteTodo)
    setCode('TD101') // 수정하기로
    console.log(nextCompleteTodo)
    console.log(code)
    AddArray()
    const req = {
      isComplete: true,
    }
    await api
      .put(process.env.REACT_APP_API_URL + '/todo/state/' + data.projectToDoSeq, req)
      .then((res) => {
        console.log(res)
        setFlag(!flag)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [todoSeq, setTodoSeq] = useState(0)
  const handleToModify = (e) => {
    console.log(e.target.id)
    setTodoSeq(e.target.id)
    setModalOpen(true)
  }
  // const handleToClose = () => {
  //   setOpenTodoPlus(false)
  //   setModalOpen(false)
  // }

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
            <div className="todo-todos-plus" onClick={handleToAlert}>
              <img src={plusBtn} alt="" />
            </div>
            <TodoPlusModal open={openTodoPlus} onClose={handleToClose} handleFlag={handleFlag} />
          </div>
          <div className="todo-todos-list">
            {todoList.map((todo, index) => (
              <>
                <div className="todo-todos-list-item" key={index} id={todo.todoSeq} onClick={handleToModify}>
                  <FormControlLabel
                    onChange={handleCompleteTodo}
                    style={{ color: '#574b9f' }}
                    control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />}
                  />
                  <div className="todo-todos-list-item-container">
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
              open={modalOpen}
              onClose={handleToClose}
              handleFlag={handleFlag}
            ></TodoModifyModal>
          </div>
        </div>
        <div className="todo-completed-container">
          <div className="todo-completed-header">
            <div className="todo-completed-title">Completed</div>
          </div>
          <div className="todo-completed-list">
            {completedTodoList.map((todo, index) => (
              <div className="todo-completed-list-item" key={todo.todoSeq}>
                <FormControlLabel
                  onChange={handleCompleteTodo}
                  style={{ color: '#fff' }}
                  control={
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 30 },
                        color: 'white',
                        '&.Mui-checked': { color: 'white' },
                      }}
                      disabled
                      checked
                    />
                  }
                />
                <div className="todo-completed-list-item-container">
                  <div id={todo.todoSeq} className="todo-completed-list-item-content" draggable>
                    {todo.content}
                  </div>
                  <div className="todo-completed-list-item-regDt">{regDt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
