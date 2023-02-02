import React from 'react'
import arrow from 'assets/image/arrow.png'
import selecarrow from 'assets/image/selecarrow.png'

const Dot = ({ num, scrollIndex }) => {
  return scrollIndex === num ? (
    <div>
      <img
        src={selecarrow}
        alt=""
        style={{
          width: 90,
          height: 30,
          transitionDuration: 1000,
          transition: 'background-color 0.5s',
          opacity: 0.7,
        }}
      />
    </div>
  ) : (
    <div>
      <img
        src={arrow}
        alt=""
        style={{
          width: 90,
          height: 30,
          transitionDuration: 1000,
          transition: 'background-color 0.5s',
          opacity: 0.6,
        }}
      />
    </div>
  )
}

const Dots = ({ scrollIndex }) => {
  return (
    <div style={{ position: 'fixed', top: '85%', right: '50%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
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
