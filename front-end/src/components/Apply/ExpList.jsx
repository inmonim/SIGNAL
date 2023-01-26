import React from 'react'
import Exp from './Exp'

function ExpList({ expList, onRemove }) {
  return (
    <div>
      {expList.map((item, index) => (
        <Exp exp={item} key={index} onRemove={onRemove}></Exp>
      ))}
    </div>
  )
}

export default ExpList
