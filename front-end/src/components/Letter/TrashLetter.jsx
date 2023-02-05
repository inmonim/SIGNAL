import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import LetterDetail from './LetterDetail'
import api from 'api/Api'

function TrashLetter({ handleChangeView, view }) {
  const [data, setData] = useState([])
  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/letter/trash/${sessionStorage.getItem('userSeq')}`).then((res) => {
      console.log(res.data.body)
      setData(res.data.body)
    })
  }, [])

  const columns = [
    { headerName: '제목', field: 'title', width: 500 },
    { headerName: '보낸 사람', field: 'fromNickname', width: 130 },
    { headerName: '날짜', field: 'regDt', width: 200 },
  ]
  const rows = []
  Array.from(data).forEach((item) => {
    rows.push({
      id: item.letterSeq,
      title: item.title,
      fromNickname: item.fromNickname,
      regDt: item.regDt.split(' ', 1),
    })
  })
  const handleLetterDetail = (e) => {
    const rowId = e.id
    const nextViewDetail = { ...view, rowId }
    handleChangeView(nextViewDetail.rowId)
    console.log(nextViewDetail.rowId)
  }
  return (
    <>
      {view === 0 ? (
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-block', fontSize: '44px', fontWeight: 'bold', marginBottom: '26px' }}>
            휴지통
          </div>
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
                disableColumnMenu
                disableSelectionOnClick
                onRowClick={handleLetterDetail}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: ' center' }}>
          <LetterDetail view={view}></LetterDetail>
        </div>
      )}
    </>
  )
}
export default TrashLetter
