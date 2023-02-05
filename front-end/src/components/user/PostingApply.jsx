import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paging from 'components/Paging'
import api from 'api/Api'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/table.css'

function PostingApply() {
  const userSeq = sessionStorage.getItem('userSeq')
  const [data, setData] = useState([])

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + '/apply/applyer/count/' + userSeq).then((res) => {
      setCount(res.data.body.count)
    })
    api
      .get(process.env.REACT_APP_API_URL + '/apply/applyer/' + userSeq + '?page=' + page + '&size=' + size)
      .then((res) => {
        setData(res.data.body)
      })
  }, [])
  const [size] = useState(6)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
    console.log(page)
  }

  const rows = []
  Array.from(data).forEach((item) => {
    rows.push({
      state: item.applyCode.name,
      subject: item.subject,
      meetingDt: item.meetingDt.split(' ', 1),
    })
  })
  if (rows.length !== size && rows.length !== 0) {
    for (let i = 0; i < size - rows.length; i++)
      rows.push({
        state: ' ',
        subject: ' ',
        meetingDt: ' ',
      })
  }

  const [tab, setTab] = useState(0)

  return (
    <div className="my-posting-apply">
      <div className="my-profile-tab-list">
        <div className={`my-profile-tab ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>
          지원한 공고
        </div>
        <div className={`my-profile-tab ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
          작성한 공고
        </div>
      </div>
      <div className="my-profile-table">
        {tab === 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead className="my-profile-table-head">
                  <TableRow>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">지원한 공고</TableCell>
                    <TableCell align="center">사전미팅참가</TableCell>
                    <TableCell align="center">사전미팅시간</TableCell>
                    <TableCell align="center">수정</TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} className="my-profile-table">
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="center">{row.subject !== ' ' ? <SignalBtn>참가</SignalBtn> : ' '}</TableCell>
                      <TableCell align="center">{row.meetingDt}</TableCell>
                      <TableCell align="center">{row.subject !== ' ' ? <SignalBtn>수정</SignalBtn> : ' '}</TableCell>
                      <TableCell align="center">{row.subject !== ' ' ? <SignalBtn>삭제</SignalBtn> : ' '}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paging page={page} count={count} setPage={handlePageChange} size={size} />
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead className="qna-table-head">
                  <TableRow>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">작성한 공고</TableCell>
                    <TableCell align="center">팀 구성</TableCell>
                    <TableCell align="center">수정</TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} className="my-profile-table">
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="center">
                        {row.subject !== ' ' ? <SignalBtn>팀원선택</SignalBtn> : ' '}
                      </TableCell>
                      <TableCell align="center">{row.subject !== ' ' ? <SignalBtn>수정</SignalBtn> : ' '}</TableCell>
                      <TableCell align="center">{row.subject !== ' ' ? <SignalBtn>삭제</SignalBtn> : ' '}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paging page={page} count={count} setPage={handlePageChange} size={size} />
          </>
        )}
      </div>
    </div>
  )
}

export default PostingApply
