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
      ? 'rgb(87, 75, 159, 0.4)'
      : props.children === '지원취소'
      ? 'rgb(255, 66, 66, 0.4)'
      : 'white'};
    border-radius: 15px;
    color: white;
    padding: 2px 4px;
    font-size: 17px;
  `
}
const StateCode = styled.div`
  ${dynamicStyle};
`
export default StateCode
