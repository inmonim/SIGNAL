import { css } from '@emotion/react'

export const videoList = (props) => {
  return css`
    display: ${props.mode === 0 ? 'flex' : 'none'};
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    overflow: auto;
    margin-top: 30px;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #9a93c5;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
  `
}

export const codeEidt = (props) => {
  return css`
    display: ${props.mode === 1 ? 'block' : 'none'};
    height: 100%;
    width: 100%;
  `
}

export const share = (props) => {
  return css`
    display: ${props.mode === 2 ? 'flex' : 'none'};
    align-items: center;
  `
}
