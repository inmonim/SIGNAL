import React from 'react'
import Exp from './Exp'

function ExpList(props) {
  return (
    <div>
      {props.expList.map((item, index) => (
        <Exp exp={item} key={index}></Exp>
      ))}
    </div>
  )
}

export default ExpList
