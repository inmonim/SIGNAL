import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminProject.css'
// import api from 'api/Api'

function AdminProject() {
  const projectList = [
    {
      state: '프로젝트상태',
      email: '주제1',
      nickname: 'nayu',
      regDt: '2024.00.00',
      projectCnt: 2,
    },
  ]
  return (
    // const [projectList, setProjectList] = useState([])

    // const projectListFetch = async () => {
    //   try {
    //     await api.get('').then((res) => setProjectList(res.data.body))
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    <div className="admin-project-container">
      <div className="admin-project-width">
        <div className="admin-project-header">
          <div className="admin-project-title">프로젝트 관리</div>
        </div>
        <div className="admin-project-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-tabl e-head">
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
                    <TableCell align="center">{row.state}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.nickname}</TableCell>
                    <TableCell align="center">{row.regDt}</TableCell>
                    <TableCell align="center">{row.projectCnt}</TableCell>
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
