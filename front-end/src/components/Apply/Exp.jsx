import React from 'react'
import { TextField } from '@mui/material'
import minusButton from '../../assets/image/minusButton.png'
const inputStyle = {
  backgroundColor: '#f3f5f7',
  width: '22rem',
}

function Exp({ exp, onRemove }) {
  return (
    <div className="exp-div">
      <TextField
        id="outlined-basic"
        variant="outlined"
        defaultValue={exp.title}
        inputProps={exp.title}
        style={inputStyle}
      />
      <div className="minus-button-section">
        <img
          src={minusButton}
          alt="minusButton"
          className="minus-button"
          onClick={() => {
            onRemove(exp.id)
          }}
        />
      </div>
    </div>
  )
}

export default Exp
