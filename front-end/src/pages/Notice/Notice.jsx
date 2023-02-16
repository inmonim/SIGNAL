import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paging from 'components/common/Paging'
import { Link, useNavigate } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/notice.css'
import 'assets/styles/table.css'
import api from 'api/Api.js'

function Notice() {
  const isAdmin = sessionStorage.getItem('admin')
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

  const navigate = useNavigate()

  return (
    <div className="notice-page-container">
      <div className="notice-container">
        <div className="notice-header">
          <div className="notice-header-title">공지사항</div>
          {isAdmin === 'true' ? (
            <div className="notice-header-regist">
              <SignalBtn
                sigwidth="84px"
                sigheight="45px"
                sigfontsize="24px"
                sigborderradius={14}
                sigmargin="0px 0px 5px 0px"
                variant="contained"
                onClick={() => navigate(`/noticeRegist`)}
              >
                등록
              </SignalBtn>
            </div>
          ) : (
            <></>
          )}
        </div>
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
                    {row.title !== ' ' ? (
                      <TableCell align="center">{index + 1}</TableCell>
                    ) : (
                      <TableCell align="center"></TableCell>
                    )}
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
          <Paging page={page || 0} count={count || 0} setPage={handlePageChange} size={size || 0} />
        </div>
      </div>
    </div>
  )
}

export default Notice
