import React, { useState } from 'react'
import styled from 'styled-components'

const SelectBox = styled.div`
  position: relative;
  width: 180px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  background-color: #f3f5f7;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &::before {
    content: '⌵';
    position: absolute;
    right: 8px;
    bottom: 5px;
    color: #574b9f;
    font-size: 20px;
  }
`
const Label = styled.label`
  font-size: 17px;
  margin-left: 16px;
  text-align: center;
`
const SelectOptions = styled.ul`
  position: absolute;
  top: 30px;
  list-style: none;
  width: 150px;
  height: 150px;
  overflow: auto;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  padding: 0px;
  border-radius: 8px;
  background-color: #f3f5f7;
  color: #000000;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: #f3f5f7;
    opacity: 0.2;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`

const Option = styled.li`
  font-size: 14px;
  height: 40px;
  padding: 0px 0px 0px 12px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #dddbec;
  }
`
const CustomSelect = ({ optionData, position }) => {
  const [currentValue, setCurrentValue] = useState(position)
  const [showOptions, setShowOptions] = useState(false)

  const handleOnChangeSelectValue = (e) => {
    setCurrentValue(e.target.getAttribute('value'))
  }

  return (
    <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Label>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        {optionData.map((data) => (
          <Option key={data.key} value={data.name} onClick={handleOnChangeSelectValue}>
            {data.name}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  )
}

export default CustomSelect
