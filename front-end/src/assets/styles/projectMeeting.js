import { css } from '@emotion/react'

export const videoList = (props) => {
  return css`
    display: ${props.mode === 0 ? 'flex' : 'none'};
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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
