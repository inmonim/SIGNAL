import React, { useEffect, useState } from 'react'
import ToLetterList from './ToLetterList'

function ToLetter() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/letter/from/${sessionStorage.getItem('userSeq')}?page=1&size=10`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.body)
        setData(res.body)
      })
  }, [])

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'inline-block', fontSize: '44px', fontWeight: 'bold', marginBottom: '26px' }}>
          보낸쪽지함
        </div>
        <ToLetterList data={data}></ToLetterList>
      </div>
    </>
  )
}
export default ToLetter
