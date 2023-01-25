import React from 'react'
import { Button } from '@mui/material'
import minusButton from '../../assets/image/minusButton.png'
import * as S from '../../assets/styles/apply'

function Exp(props) {
  return (
    <S.Exp>
      <S.Input value={props.exp.title} />
      <Button>
        <img src={minusButton} alt="minusButton" />
      </Button>
    </S.Exp>
  )
}

export default Exp
