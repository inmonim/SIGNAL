import React from 'react'
import { TextField } from '@mui/material'
import minusButton from '../../assets/image/minusButton.png'

const inputStyle = {
  backgroundColor: '#f3f5f7',
  width: '20rem',
}

function Career({ career, id, onRemove, onChange }) {
  const handleCareerChange = (event) => {
    console.log(event.target.value)
    onChange(event.target.value, id)
  }
  return (
    <div className="career-div">
      <TextField
        id="outlined-basic"
        variant="outlined"
        defaultValue={career}
        style={inputStyle}
        onChange={(e) => {
          handleCareerChange(e)
        }}
      />
      <img
        style={{ height: '34px', padding: '5px' }}
        src={minusButton}
        alt="minusButton"
        onClick={() => {
          onRemove(id)
        }}
      />
    </div>
  )
}

export default Career
