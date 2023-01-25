import React from 'react'
import { TextField } from '@mui/material'
import minusButton from '../../assets/image/minusButton.png'

const inputStyle = {
  backgroundColor: '#f3f5f7',
  width: '22rem',
}

function Career(props) {
  return (
    <div className="career-div">
      <TextField id="outlined-basic" variant="outlined" defaultValue={props.career.title} style={inputStyle} />
      <div className="minus-button-section">
        <img src={minusButton} alt="minusButton" className="minus-button" />
      </div>
    </div>
  )
}

export default Career
