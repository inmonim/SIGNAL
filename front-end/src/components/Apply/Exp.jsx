import React from 'react'
import { TextField } from '@mui/material'
import minusButton from '../../assets/image/minusButton.png'
const inputStyle = {
  backgroundColor: '#f3f5f7',
  width: '22rem',
}

function Exp({ exp, onRemove, onChange, id }) {
  const handleExpChange = (event) => {
    console.log(event.target.value)
    onChange(event.target.value, id)
  }
  return (
    <div className="exp-div">
      <TextField
        id="outlined-basic"
        variant="outlined"
        defaultValue={exp}
        style={inputStyle}
        onChange={(e) => {
          handleExpChange(e)
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

export default Exp
