import React from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminBlackList.css'
// import api from 'api/Api'

function AdminBlackList() {
  // const [blackList, setBlackList] = useState([])

  // const blackListFetch = async () => {
  //   try {
  //     await api.get('').then((res) => setBlackList(res.data.body))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const blackList = [
    {
      state: '블랙리스트',
      email: 'nayu@test.com',
      nickname: '나느양',
      regDt: '2024.00.00',
      projectCnt: 2,
    },
  ]
  return (
    <div className="admin-black-list-container">
      <div className="admin-black-list-width">
        <div className="admin-black-list-header">
          <div className="admin-black-list-title">블랙리스트 관리</div>
          <div className="admin-black-list-release-btn">
            <SignalBtn>블랙리스트 해제</SignalBtn>
          </div>
        </div>
        <div className="admin-black-list-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-tabl e-head">
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">상태</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center">닉네임</TableCell>
                  <TableCell align="center">가입일시</TableCell>
                  <TableCell align="center">프로젝트</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blackList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
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
export default AdminBlackList
