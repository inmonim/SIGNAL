import { Box } from '@mui/system'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { remove, addCount, minusCount } from 'store/redux'
import { Typography, Button } from '@mui/material'

function positionTodo(props) {
  const todolist = useSelector((state) => state.positionTodo)
  const dispatch = useDispatch()

  return (
    <Box>
      {todolist.map((ele, idx) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} key={idx}>
          <Typography variant="h4">{ele.text}</Typography>
          <Button
            onClick={() => {
              dispatch(minusCount(ele.id))
            }}
          >
            -
          </Button>
          <Typography variant="h4">{ele.count}</Typography>
          <Button
            onClick={() => {
              dispatch(addCount(ele.id))
            }}
          >
            +
          </Button>
          <button
            onClick={() => {
              dispatch(remove(todolist[idx].id))
            }}
          >
            삭제
          </button>
        </Box>
      ))}
    </Box>
  )
}

export default positionTodo
