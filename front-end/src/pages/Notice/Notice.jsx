import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paging from 'components/Paging'
import { Link } from 'react-router-dom'
import 'assets/styles/notice.css'

function Notice() {
  const [data, setData] = useState([])

  const [size] = useState(7)
  const [page, setPage] = useState(1)
  const [count] = useState(50)

  const handlePageChange = (page) => {
    setPage(page)
    console.log(page)
  }
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/board/notice?page=${page}&size=${size}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.body.noticeList)
        setData(res.body.noticeList)
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

  // const [selectedRow, setSelectedRow] = useState({})
  // console.log(selectedRow.id)
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
                {rows.map((row) => (
                  <TableRow key={row.id}>
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
          <Paging page={page} count={count} setPage={handlePageChange} />
        </div>
      </div>
    </div>
  )
}

export default Notice
