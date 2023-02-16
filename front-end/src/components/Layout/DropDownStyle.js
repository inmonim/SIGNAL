import styled, { css } from 'styled-components'

export const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`
export const NavBtn = styled.div`
  cursor: pointer;
  margin: 0px 20px;
`
export const Down = styled.div`
  background: #dddbec;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 148px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: #dddbec;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`

export const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const Li = styled.li``

export const LinkWrapper = styled.a`
  font-size: 22px;
  text-decoration: none;
  color: black;
`
