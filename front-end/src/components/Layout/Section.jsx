import React from 'react'
import styled from 'styled-components'
import gradient from 'assets/image/gradient.png'

const Container = styled.div`
  width: 100%;
  height: 933px;
  background-image: url('${({ isBg }) => (isBg ? gradient : null)}');
`

function Section({ children, isBg }) {
  return <Container isBg={isBg}>{children}</Container>
}

export default Section
