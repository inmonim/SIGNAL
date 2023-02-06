import React from 'react'
import Exp from './Exp'

function ExpList({ expList, onRemove, onChange }) {
  return (
    <div style={{ padding: '0px 20px' }}>
      {expList.map((item) => (
        <Exp exp={item.content} id={item.seq} key={item.seq} onRemove={onRemove} onChange={onChange}></Exp>
      ))}
    </div>
  )
}

export default ExpList
