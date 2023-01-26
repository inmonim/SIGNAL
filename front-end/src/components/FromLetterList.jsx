import React from 'react'
// import axios from 'axios'

// const SERVER_URL = 'http://tableminpark.iptime.org:8080'
// const PARAM_URL = `/letter/to/${sessionStorage.getItem('userSeq')}?page=1&size=7`

function FromLetterList({ letter }) {
  // const [inputData, setInputData] = useState([
  //   {
  //     title: '',
  //     fromNickname: '',
  //     regDt: '',
  //   },
  // ])
  // useEffect(() => {
  //   // getLetter()
  //   // axios.get(SERVER_URL + PARAM_URL).then((res) => console.log(res))
  //   fetch(`http://tableminpark.iptime.org:8080/letter/to/${sessionStorage.getItem('userSeq')}?page=1&size=7`, {
  //     method: 'GET',
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(1, res)
  //       setInputData(res)
  //     })
  // }, [])
  // const columns = [
  //   { headerName: '제목', field: 'title', width: 500 },
  //   { headerName: '보낸 사람', field: 'fromNickname', width: 130 },
  //   { headerName: '날짜', field: 'regDt', width: 130 },
  // ]

  // const rows = [{ id: 1, title: { letter.title }, fromNickname: '혁근', regDt: '2023-1-27' }]

  return (
    <div>
      <div style={{ height: '487px' }}>
        {/* <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection /> */}
      </div>
    </div>
  )
}

export default FromLetterList
