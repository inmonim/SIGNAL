import React from 'react'
import Career from './Career'

function CareerList({ careerList, onRemove }) {
  return (
    <div>
      {careerList.map((item, index) => (
        <Career career={item} key={index} onRemove={onRemove}></Career>
      ))}
    </div>
  )
}

export default CareerList
