import React, { useState } from 'react'
import 'assets/styles/project/todolist.css'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TodoPlusModal from './TodoPlusModal'

import plusBtn from 'assets/image/plusButton.png'

function TodoList() {
  const [tab, setTab] = useState(0)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const today = year + '-' + month + '-' + date
  const [dateValue, setDateValue] = useState(today)

  const [openTodoPlus, setOpenTodoPlus] = useState(false)
  const handleToAlert = () => setOpenTodoPlus(true)
  const handleToClose = () => setOpenTodoPlus(false)
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
                onChange={(newValue) => {
                  setDateValue(newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      '.MuiInputBase-input': { border: 0 },
                    }}
                  />
                )}
              />
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
            <TodoPlusModal open={openTodoPlus} onClose={handleToClose} />
          </div>
          <div className="todo-todos-list"></div>
        </div>
        <div className="todo-completed-container">
          <div className="todo-completed-header">
            <div className="todo-completed-title">Completed</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
