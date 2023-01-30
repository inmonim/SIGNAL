import React from 'react'
import { TextField } from '@mui/material'
import minusButton from '../../assets/image/minusButton.png'

const inputStyle = {
  backgroundColor: '#f3f5f7',
  width: '22rem',
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
      <div className="minus-button-section">
        <img
          src={minusButton}
          alt="minusButton"
          className="minus-button"
          onClick={() => {
            onRemove(id)
          }}
        />
      </div>
    </div>
  )
}

export default Career
