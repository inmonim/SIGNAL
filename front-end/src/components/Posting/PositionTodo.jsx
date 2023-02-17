import { Box } from '@mui/system'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove, addCount, minusCount } from 'store/redux'
import { Typography, Button } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
function positionTodo(props) {
  const todolist = useSelector((state) => state.positionTodo)
  const dispatch = useDispatch()

  return (
    <Box>
      {todolist.map((ele, idx) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }} key={idx}>
          <Typography style={{ width: '30%' }} variant="h5">
            {' '}
            {ele.text}
          </Typography>
          <Button
            onClick={() => {
              dispatch(minusCount(ele.id))
            }}
          >
            -
          </Button>
          <Typography variant="h5">{ele.count}</Typography>
          <Button
            onClick={() => {
              dispatch(addCount(ele.id))
            }}
          >
            +
          </Button>
          <SignalBtn
            sigfontsize="15px"
            sigborderradius={15}
            onClick={() => {
              dispatch(remove(todolist[idx].id))
            }}
          >
            삭제
          </SignalBtn>
        </Box>
      ))}
    </Box>
  )
}

export default positionTodo
