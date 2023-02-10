import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paging from 'components/Paging'
import { Link } from 'react-router-dom'
import 'assets/styles/notice.css'
import 'assets/styles/table.css'
import api from 'api/Api.js'

function AdminNotice() {
  const [data, setData] = useState([])

  const [size] = useState(8)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
  }
  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/board/notice?page=${page}&size=${size}`).then((res) => {
      setData(res.data.body.noticeList)
    })
    api.get(process.env.REACT_APP_API_URL + '/board/notice/count').then((res) => {
      setCount(res.data.body.count)
    })
  }, [page])

  const rows = []
  Array.from(data).forEach((item) => {
    rows.push({
      id: item.noticeSeq,
      title: item.title,
      regDt: item.regDt.split(' ', 1),
      view: item.view,
    })
  })
  const rowLen = rows.length
  if (rowLen !== size && rowLen !== 0) {
    for (let i = 0; i < size - rowLen; i++)
      rows.push({
        id: ' ',
        title: ' ',
        regDt: ' ',
        view: ' ',
      })
  }

  console.log(size - rows.length)

  return (
    <div className="notice-page-container">
      <div className="notice-container">
        <div className="notice-header">공지사항</div>
        <div className="notice-table">
          <TableContainer>
            <Table>
              <TableHead className="notice-table-head">
                <TableRow>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center">날짜</TableCell>
                  <TableCell align="center">조회수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="left">
                      <Link to={`/noticeDetail`} state={{ id: row.id }}>
                        {row.title}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{row.regDt}</TableCell>
                    <TableCell align="center">{row.view}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paging page={page} count={count} setPage={handlePageChange} size={size} />
        </div>
      </div>
    </div>
  )
}

export default AdminNotice
