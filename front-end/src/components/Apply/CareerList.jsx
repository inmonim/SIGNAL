import React from 'react'
import Career from './Career'

function CareerList({ careerList, onRemove, onChange }) {
  console.log('careerList: ', careerList)
  return (
    <div>
      {careerList.map((item, index) => (
        <Career career={item} id={index} key={index} onRemove={onRemove} onChange={onChange}></Career>
      ))}
    </div>
  )
}

export default CareerList
