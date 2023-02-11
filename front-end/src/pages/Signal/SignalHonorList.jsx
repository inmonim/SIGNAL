import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import 'assets/styles/signalweekrank.css'

function SignalHonorList() {
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
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2022년 4분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">2</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2022년 3분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">3</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2022년 2분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">4</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2022년 1분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">5</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2021년 4분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">6</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2021년 3분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">7</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2021년 2분기 수상작</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">8</TableCell>
                  <TableCell align="left">
                    <Link to={`/signal/rank`}>2022년 1분기 수상작</Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default SignalHonorList
