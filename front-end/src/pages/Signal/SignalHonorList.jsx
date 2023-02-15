import React, { useEffect, useState } from 'react'
import api from 'api/Api'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import Paging from 'components/Paging'
import 'assets/styles/signalweekrank.css'

function SignalHonorList() {
  const [honorList, setHonorList] = useState([])
  const [size] = useState(6)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const getHonorList = async () => {
    await api
      .get(process.env.REACT_APP_API_URL + `/signalweek/signalweekschedule?page=${page}&size=${size}`)
      .then((res) => {
        setHonorList(res.data.body.signalweekList)
        setCount(res.data.body.count)
      })
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  useEffect(() => {
    getHonorList()
  }, [page])

  const rowLen = honorList.length
  if (rowLen !== size && rowLen !== 0) {
    for (let i = 0; i < size - rowLen; i++)
      honorList.push({
        id: ' ',
        title: ' ',
      })
  }

  return (
    <div className="signal-rank-list-page-container">
      <div className="signal-rank-list-container">
        <div className="signal-rank-list-header">역대 시그널위크 수상작</div>
        <div className="signal-rank-list-table">
          <TableContainer>
            <Table>
              <TableHead className="notice-table-head">
                <TableRow>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {honorList &&
                  honorList.map((item, index) => (
                    <TableRow key={index}>
                      {item.title === ' ' ? <></> : <TableCell align="center">{index + 1}</TableCell>}
                      <TableCell align="left">
                        {item.title === ' ' ? (
                          <></>
                        ) : (
                          <Link to={`/signal/rank`} state={{ year: item.year, quarter: item.quarter }}>
                            {item.year}년 {item.quarter}분기 수상작
                          </Link>
                        )}
                      </TableCell>
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

export default SignalHonorList
