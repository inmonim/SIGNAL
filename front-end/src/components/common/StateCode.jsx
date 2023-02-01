// import { Box } from '@mui/system'
// import { styled } from '@mui/material/styles'

// const StateCode = styled(Box)(({ theme, color }) => ({
//   fontFamily: 'dohyeon',
//   fontColor: theme.palette.getContrastText(color),
//   textAlign: 'center',
//   backgroundColor: theme.palette.getContrastText(color),
//   border: `1px solid ${theme.palette.getContrastText(color)}`,
//   borderRadius: '10px',
//   color: theme.palette.getContrastText(color),
// }))

// export default StateCode

import styled from '@emotion/styled'
import { css } from '@emotion/react'

const dynamicStyle = (props) => {
  return css`
    background-color: ${props.children === '대기중'
      ? 'rgb(87, 75, 159, 0.5)'
      : props.children === '지원취소'
      ? 'rgb(255, 66, 66, 0.5)'
      : 'white'};
    border-radius: 15px;
    padding: 4px 2px;
    color: white;
    font-size: normal;
  `
}
const StateCode = styled.div`
  ${dynamicStyle};
`
export default StateCode
