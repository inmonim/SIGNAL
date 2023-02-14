import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminProject.css'
import api from 'api/Api'
import Paging from 'components/Paging'
import moment from 'moment'

function AdminProject() {
  const [projectList, setProjectList] = useState([])

  const projectListFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + `/admin/project?page=${page}&size=${size}`).then((res) => {
        setProjectList(res.data.body.projectList)
        setCount(res.data.body.count)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [size] = useState(8)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
  }

  const rows = []
  Array.from(projectList).forEach((item) => {
    rows.push({
      code: {
        name: item.code.name,
      },
      subject: item.subject,
      userSeq: item.userSeq,
      nickname: item.nickname,
      projectUserCnt: item.projectUserCnt,
      regDt: item.regDt,
    })
  })
  const rowLen = rows.length
  if (rowLen !== size && rowLen !== 0) {
    for (let i = 0; i < size - rowLen; i++)
      rows.push({
        code: {
          name: '',
        },
        subject: '',
        userSeq: '',
        nickname: '',
        projectUserCnt: '',
        regDt: '',
      })
  }

  useEffect(() => {
    projectListFetch()
  }, [page])
  return (
    <div className="admin-project-page-container">
      <div className="admin-project-container">
        <div className="admin-project-header">
          <div className="admin-project-title">프로젝트 관리</div>
        </div>
        <div className="admin-project-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-table-head">
                <TableRow>
                  <TableCell align="center">상태</TableCell>
                  <TableCell align="center">프로젝트주제</TableCell>
                  <TableCell align="center">팀장</TableCell>
                  <TableCell align="center">팀원</TableCell>
                  <TableCell align="center">생성일시</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.code.name}</TableCell>
                    <TableCell align="center">{row.subject}</TableCell>
                    <TableCell align="center">{row.nickname}</TableCell>
                    <TableCell align="center">{row.projectUserCnt}</TableCell>
                    <TableCell align="center">
                      {row.regDt === '' ? '' : moment(row.regDt).format('YYYY-MM-DD HH:MM')}
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
export default AdminProject
