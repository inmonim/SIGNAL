import React from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminSignalWeek.css'
// import api from 'api/Api'

function AdminSignalWeek() {
  // const [singalWeekList, setSingalWeekListt] = useState([])

  // const singalWeekList = async () => {
  //   try {
  //     await api.get('').then((res) => setSingalWeekListt(res.data.body))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const singalWeekList = [
    {
      year: '2023',
      quater: '1',
      applyPeriod: '2023.03.02',
      votePeriod: '2024.00.00',
    },
  ]
  return (
    <div className="admin-signal-week-container">
      <div className="admin-signal-week-width">
        <div className="admin-signal-week-header">
          <div className="admin-signal-week-title">시그널위크 관리</div>
          <div className="admin-signal-week-release-btn">
            <SignalBtn>등록</SignalBtn>
          </div>
        </div>
        <div className="admin-signal-week-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-tabl e-head">
                <TableRow>
                  <TableCell align="center">년도</TableCell>
                  <TableCell align="center">분기</TableCell>
                  <TableCell align="center">신청기간</TableCell>
                  <TableCell align="center">투표기간</TableCell>
                  <TableCell align="center">수정</TableCell>
                  <TableCell align="center">프로젝트보기</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singalWeekList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.year}</TableCell>
                    <TableCell align="center">{row.quater}</TableCell>
                    <TableCell align="center">{row.applyPeriod}</TableCell>
                    <TableCell align="center">{row.votePeriod}</TableCell>
                    <TableCell align="center">수정버튼</TableCell>
                    <TableCell align="center">프로젝트조회버튼</TableCell>
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
export default AdminSignalWeek
