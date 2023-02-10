import React, { useState } from 'react'
import grass from 'assets/image/grass.gif'
import useInterval from 'hooks/useInterval'

function fourzerofour() {
  const odungUrl = 'odung.gif'
  const odungUrl2 = 'odung2.gif'
  const [dung, setDung] = useState(process.env.REACT_APP_API_URL + `/static/media/${odungUrl}`)
  const [flag, setFlag] = useState(false)

  useInterval(() => {
    if (!flag) {
      setDung(process.env.REACT_APP_API_URL + `/static/media/${odungUrl}`)
      setFlag(true)
    } else {
      setDung(process.env.REACT_APP_API_URL + `/static/media/${odungUrl2}`)
      setFlag(false)
    }
  }, 3000)
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
        }}
      >
        <img
          src={grass}
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
          }}
          alt=""
        />
        <div
          style={{
            color: '#9A93C5',
            position: 'absolute',
            fontSize: '100px',
            textShadow: '-2px 0 #574B9F, 0 2px #574B9F, 2px 0 #574B9F, 0 -2px #574B9F',
            bottom: '50px',
            zIndex: '1',
          }}
        >
          응 돌아가 ~ :P
        </div>
        <img src={dung} alt="" style={{ width: '800px', height: '800px', position: 'absolute' }} />
      </div>
    </div>
  )
}

export default fourzerofour
