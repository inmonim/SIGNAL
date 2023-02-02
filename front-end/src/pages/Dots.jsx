import React from 'react'

const Dot = ({ num, scrollIndex }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: '1px solid #574B9F',
        borderRadius: 999,
        backgroundColor: scrollIndex === num ? '#574B9F' : 'transparent',
        transitionDuration: 1000,
        transition: 'background-color 0.5s',
      }}
    ></div>
  )
}

const Dots = ({ scrollIndex }) => {
  return (
    <div style={{ position: 'fixed', top: '80%', right: '50%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} scrollIndex={scrollIndex}></Dot>
        <Dot num={2} scrollIndex={scrollIndex}></Dot>
        <Dot num={3} scrollIndex={scrollIndex}></Dot>
      </div>
    </div>
  )
}

export default Dots
