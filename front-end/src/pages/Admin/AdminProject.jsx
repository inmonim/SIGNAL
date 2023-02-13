import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminProject.css'
import api from 'api/Api'

function AdminProject() {
  const [projectList, setProjectList] = useState([])

  const projectListFetch = async () => {
    try {
      await api
        .get(process.env.REACT_APP_API_URL + '/admin/project')
        .then((res) => setProjectList(res.data.body.projectList))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    projectListFetch()
  }, [])
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
                {projectList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.code.name}</TableCell>
                    <TableCell align="center">{row.subject}</TableCell>
                    <TableCell align="center">{row.nickname}</TableCell>
                    <TableCell align="center">{row.projectUserCnt}</TableCell>
                    <TableCell align="center">{row.regDt}</TableCell>
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
export default AdminProject
