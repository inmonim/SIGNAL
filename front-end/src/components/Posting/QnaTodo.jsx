import { Box } from '@mui/system'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeQna } from 'store/redux'
import DeleteIcon from '@mui/icons-material/Delete'
import { Typography } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'

const theme = createTheme({
  typography: {
    h4: {
      color: '#574b9f',
    },
  },
})
function QnaTodo() {
  const todolist = useSelector((state) => state.qnaTodo)
  const dispatch = useDispatch()

  return (
    <div>
      <ThemeProvider theme={theme}>
        {todolist.map((todo, idx) => (
          <Box key={todolist[idx].id}>
            <Typography variant="h4">사전질문 {idx + 1}</Typography>
            <Box sx={{ display: 'flex', width: 2 / 3, justifyContent: 'space-between', mb: 1, mt: 1 }}>
              <Typography variant="h5">{todo.text}</Typography>

              <button type="button" onClick={() => dispatch(removeQna(todolist[idx].id))}>
                <DeleteIcon />
              </button>
            </Box>
          </Box>
        ))}
      </ThemeProvider>
    </div>
  )
}

export default QnaTodo
