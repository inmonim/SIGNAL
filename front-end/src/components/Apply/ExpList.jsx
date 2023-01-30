import React from 'react'
import Exp from './Exp'

function ExpList({ expList, onRemove, onChange }) {
  return (
    <div>
      {expList.map((item, index) => (
        <Exp exp={item.content} id={item.seq} key={item.seq} onRemove={onRemove} onChange={onChange}></Exp>
      ))}
    </div>
  )
}

export default ExpList
