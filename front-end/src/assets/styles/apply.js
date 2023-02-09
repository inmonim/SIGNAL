import styled from 'styled-components'

export const Input = styled.input.attrs({ type: 'text' })`
  width: 100%;
  height: 25px;
  background: #f3f5f7;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 9px 0px 9px 13px;
  color: #868e96;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: -webkit-fill-available;
  &:active {
    border: 0.5px solid #574b9f !important;
    border-radius: 8px !important;
  }
`

export const MultilineInput = styled.input.attrs({ type: 'text' })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
