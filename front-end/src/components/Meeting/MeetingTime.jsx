import React from 'react'
import Button from '@mui/material/Button'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'
import '../../assets/styles/Calendar.css'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  padding: '5px',
}

const CommonButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.common.white,
  color: '#574B9F',
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
  },
}))

function MeetingTime(props) {
  const timeFilter = (item) => {
    return item.slice(11, 13)
  }

  const handleTimeClick = (event) => {
    props.onChange(event.target.value)
    props.close()
  }

  return (
    <CssVarsProvider>
      <div style={style}>
        <div>{timeFilter(props.item)} 시</div>
        <CommonButton variant="contained" value={props.id} onClick={handleTimeClick}>
          선택
        </CommonButton>
      </div>
    </CssVarsProvider>
  )
}

export default MeetingTime
