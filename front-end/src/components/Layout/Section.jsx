import React from 'react'
import styled from 'styled-components'
import gradient from 'assets/image/gradient.png'

const Container = styled.div`
  width: 1920px;
  margin: auto;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: url('${({ isBg }) => (isBg ? gradient : null)}');
  }
`

function Section({ children, isBg }) {
  return <Container isBg={isBg}>{children}</Container>
}

export default Section
