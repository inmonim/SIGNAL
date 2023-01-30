import React from 'react'
import Career from './Career'

function CareerList({ careerList, onRemove, onChange }) {
  return (
    <div>
      {careerList.map((item) => (
        <Career career={item.content} id={item.seq} key={item.seq} onRemove={onRemove} onChange={onChange}></Career>
      ))}
    </div>
  )
}

export default CareerList
