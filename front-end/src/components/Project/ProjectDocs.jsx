import React, { useState } from 'react'
import plusBtn from 'assets/image/plusButton.png'
import TodoPlusModal from './TodoPlusModal'
import 'assets/styles/project/projectdocs.css'

function ProjectDocs() {
  const [openTodoPlus, setOpenTodoPlus] = useState(false)
  const handleToAlert = () => setOpenTodoPlus(true)
  const handleToClose = () => setOpenTodoPlus(false)
  return (
    <div className="docs-container">
      <div className="todo-todos-header">
        <div className="todo-todos-title">ToDos</div>
        <div className="todo-todos-plus" onClick={handleToAlert}>
          <img src={plusBtn} alt="" />
        </div>
        <TodoPlusModal open={openTodoPlus} onClose={handleToClose} />
      </div>
      <div className="todo-todos-list"></div>
    </div>
  )
}

export default ProjectDocs
