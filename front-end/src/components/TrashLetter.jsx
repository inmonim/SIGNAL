import React, { useEffect, useState } from 'react'
import TrashLetterList from './TrashLetterList'

function TrashLetter() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/letter/trash/${sessionStorage.getItem('userSeq')}?page=1&size=10`, {
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
          휴지통
        </div>
        <TrashLetterList data={data}></TrashLetterList>
      </div>
    </>
  )
}
export default TrashLetter
