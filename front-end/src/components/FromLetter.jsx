import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import LetterDetail from './LetterDetail'

function FromLetter() {
  const [data, setData] = useState([])
  const [viewDetail, setViewDetail] = useState('')
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/letter/to/${sessionStorage.getItem('userSeq')}?page=1&size=10`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.body)
        setData(res.body)
      })
  }, [])

  const columns = [
    { headerName: '제목', field: 'title', width: 500 },
    { headerName: '보낸 사람', field: 'fromNickname', width: 130 },
    { headerName: '날짜', field: 'regDt', width: 130 },
  ]
  const rows = []
  Array.from(data).forEach((item) => {
    rows.push({ id: item.letterSeq, title: item.title, fromNickname: item.fromNickname, regDt: item.regDt })
  })
  const handleLetterDetail = (e) => {
    const rowId = e.id
    const nextViewDetail = { ...viewDetail, rowId }
    setViewDetail(nextViewDetail.rowId)
    console.log(nextViewDetail.rowId)
  }
  return (
    <>
      {viewDetail === '' ? (
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-block', fontSize: '44px', fontWeight: 'bold', marginBottom: '26px' }}>
            받은쪽지함
          </div>
          {/* <FromLetterList data={data}></FromLetterList> */}
          <div>
            <div style={{ height: '487px' }}>
              <DataGrid
                sx={{
                  '& .MuiDataGrid-columnHeaderTitle': { fontSize: '22px', fontWeight: 'bold' },
                  '& .MuiDataGrid-cellContent': { fontSize: '22px', marginLeft: '20px' },
                  '& .MuiDataGrid-columnHeaderTitleContainer': { justifyContent: 'center' },
                }}
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
                disableColumnMenu
                onRowClick={handleLetterDetail}
                getRowId={(row) => row.id}
              />
            </div>
          </div>
        </div>
      ) : (
        <LetterDetail viewDetail={viewDetail}></LetterDetail>
      )}
    </>
  )
}
export default FromLetter
