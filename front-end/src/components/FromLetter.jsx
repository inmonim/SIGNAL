import React, { useEffect, useState } from 'react'
import FromLetterList from './FromLetterList'
// import axios from 'axios'

// const SERVER_URL = 'http://tableminpark.iptime.org:8080'
// const PARAM_URL = `/letter/to/${sessionStorage.getItem('userSeq')}?page=1&size=7`

function FromLetter() {
  // useEffect(() => {
  //   // getLetter()
  //   // axios.get(SERVER_URL + PARAM_URL).then((res) => console.log(res))
  //   fetch(`http://tableminpark.iptime.org:8080/letter/to/${sessionStorage.getItem('userSeq')}?page=1&size=7`, {
  //     method: 'GET',
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(1, res)
  //     })
  // }, [])

  const [data, setData] = useState([])
  // const [title, setTitle] = useState([])
  // const [fromNickname, setFromNickname] = useState([])
  // const [regDt, setRegDt] = useState([])
  useEffect(() => {
    // getLetter()
    // axios.get(SERVER_URL + PARAM_URL).then((res) => console.log(res))
    fetch(`http://tableminpark.iptime.org:8080/letter/to/${sessionStorage.getItem('userSeq')}?page=1&size=7`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.body)
        setData(res.body)
        // const letter = res.body[i]
        // setTitle(res.body[i].title)
        // setFromNickname(res.body[i].fromNickname)
        // setRegDt(res.body[i].regDt)
      })
  }, [])

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'inline-block', fontSize: '44px', fontWeight: 'bold', marginBottom: '26px' }}>
          받은쪽지함
        </div>

        {/* {inputData.map((letter) => (
          <FromLetterList key={letter.userSeq} letter={letter} />
        ))} */}
        <FromLetterList data={data}></FromLetterList>
      </div>
      {/* <getLetter>
        {getLetterList.map((letter, i) => (
          <LetterList letter={letter} key={letter.letterSeq} />
        ))}
      </getLetter> */}
    </>
  )
}
export default FromLetter
