import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

function TrashLetterList({ data }) {
  const columns = [
    { headerName: '제목', field: 'title', width: 500 },
    { headerName: '보낸 사람', field: 'fromNickname', width: 130 },
    { headerName: '날짜', field: 'regDt', width: 130 },
  ]
  const rows = []
  Array.from(data).forEach((item) => {
    rows.push({ id: item.letterSeq, title: item.title, fromNickname: item.fromNickname, regDt: item.regDt })
  })
  return (
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
        />
      </div>
    </div>
  )
}

export default TrashLetterList
