import React, { useEffect, useState } from 'react'
import api from 'api/Api'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import 'assets/styles/signalweekrank.css'

function SignalHonorList() {
  const [honorList, setHonorList] = useState([])
  const getHonorList = async () => {
    await api.get(process.env.REACT_APP_API_URL + '/signalweek/signalweekschedule').then((res) => {
      setHonorList(res.data.body)
    })
  }

  useEffect(() => {
    getHonorList()
  }, [])
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
                      <TableCell align="center">1</TableCell>
                      <TableCell align="left">
                        <Link to={`/signal/rank`} state={{ year: item.year, quarter: item.quarter }}>
                          {item.year}년 {item.quarter}분기 수상작
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default SignalHonorList
