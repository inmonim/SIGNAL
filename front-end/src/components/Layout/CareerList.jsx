import React from 'react'
import Career from './Career'

function CareerList(props) {
  return (
    <div>
      {props.careerList.map((item, index) => (
        <Career career={item} key={index}></Career>
      ))}
    </div>
  )
}

export default CareerList
