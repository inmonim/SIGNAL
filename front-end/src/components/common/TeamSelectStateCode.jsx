import styled from '@emotion/styled'
import { css } from '@emotion/react'

const stateCode = (props) => {
  return css`
    display: ${props.children === '미선택' ? 'none' : ''};
    background-color: ${props.children === '대기중'
      ? 'rgba(164, 164, 164, 0.5)'
      : props.children === '지원취소'
      ? 'rgba(255, 0, 0, 0.4)'
      : props.children === '확정'
      ? 'rgba(70, 60, 127, 0.7)'
      : props.children === '거절'
      ? 'rgba(0, 0, 0, 0.4)'
      : ''};
    border-radius: 15px;
    color: white;
    padding: 2px 4px;
    font-size: 17px;
  `
}

const StateCode = styled.div`
  ${stateCode};
`

const teamSelectBtn = (props) => {
  return css`
    visibility: ${props.state === '미선택' ? 'visible' : 'hidden'};
    background-color: white;
    color: #574b9f;
    border: 1px solid #574b9f;
    height: 30;
    &hover {
      background-color: #574b9f;
      color: white;
      border-color: white;
    }
  `
}

const TeamSelectBtn = styled.div`
  ${teamSelectBtn};
`
export { StateCode, TeamSelectBtn }
