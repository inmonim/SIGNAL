import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import LetterDetail from './LetterDetail'
import trashcan from 'assets/image/TrashLetter.png'
import AlertModal from '../AlertModal'
import api from 'api/Api'
// import clsx from 'clsx'
// import Box from '@mui/material/Box'

function FromLetter({ handleChangeView, view, handleMenuListItemClick }) {
  const [data, setData] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/letter/to/${sessionStorage.getItem('userSeq')}`).then((res) => {
      console.log(res.data.body)
      setData(res.data.body)
    })
  }, [])

  const columns = [
    {
      headerName: '제목',
      field: 'title',
      width: 500,
    },
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
      read: item.read,
    })
  })
  const handleLetterDetail = (e) => {
    const rowId = e.id
    const nextViewDetail = { ...view, rowId }
    handleChangeView(nextViewDetail.rowId)
    console.log(nextViewDetail.rowId)
  }

  const handleAlert = (e) => {
    setAlertOpen(false)
    handleMenuListItemClick(2)
  }

  const [letterList, setLetterList] = useState([])

  const handleToTrash = () => {
    if (letterList.length > 0) {
      api
        .delete(process.env.REACT_APP_API_URL + `/letter/list?letterSeqList=${JSON.stringify(letterList).slice(1, -1)}`)
        .then((res) => {
          console.log(res.data.body)
          setAlertOpen(true)
        })
    }
  }

  return (
    <>
      {view === 0 ? (
        <div style={{ textAlign: 'left' }}>
          <div className="letter-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'inline-block', fontSize: '44px', fontWeight: 'bold', marginBottom: '26px' }}>
              받은쪽지함
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img onClick={handleToTrash} style={{ cursor: 'pointer' }} src={trashcan} alt="trashcan" />
              <AlertModal open={alertOpen} onClick={handleAlert} msg="삭제하시겠습니까?"></AlertModal>
            </div>
          </div>
          <div>
            <div style={{ height: '487px' }}>
              <DataGrid
                sx={{
                  '& .MuiDataGrid-columnHeaderTitle': { fontSize: '22px', fontWeight: 'bold' },
                  '& .MuiDataGrid-cellContent': { fontSize: '22px', marginLeft: '20px' },
                  '& .MuiDataGrid-columnHeaderTitleContainer': { justifyContent: 'center' },
                  '& .super-read--false': {
                    color: 'red',
                  },
                }}
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableColumnMenu
                disableSelectionOnClick
                onRowClick={handleLetterDetail}
                onSelectionModelChange={(newletterList) => {
                  setLetterList(newletterList)
                }}
                selectionModel={letterList}
                getRowClassName={(params) => `super-read--${params.row.read}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: ' center' }}>
          <LetterDetail
            handleChangeView={handleChangeView}
            view={view}
            fromto="from"
            handleMenuListItemClick={handleMenuListItemClick}
          ></LetterDetail>
        </div>
      )}
    </>
  )
}
export default FromLetter
