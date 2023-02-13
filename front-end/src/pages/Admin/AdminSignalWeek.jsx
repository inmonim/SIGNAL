import React, { useEffect, useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminSignalWeek.css'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import api from 'api/Api'
import SignalWeekModal from 'components/Admin/SingnalWeekModal'

function AdminSignalWeek() {
  const [singalWeekList, setSingalWeekListt] = useState([])

  const singalWeekListFetch = async () => {
    try {
      await api
        .get(process.env.REACT_APP_API_URL + '/admin/signalweek')
        .then((res) => setSingalWeekListt(res.data.body.signalWeekList))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    singalWeekListFetch()
  }, [])

  const [registOpen, setRegistOpen] = useState(false)

  const handleRegistOpen = () => setRegistOpen(true)
  const handleRegistClose = () => setRegistOpen(false)

  return (
    <div className="admin-signal-week-page-container">
      <div className="admin-signal-week-container">
        <div className="admin-signal-week-header">
          <div className="admin-signal-week-title">시그널위크 관리</div>
          <div className="admin-signal-week-release-btn">
            <SignalBtn
              sigheight="45px"
              sigfontsize="24px"
              sigborderradius={14}
              sigmargin="0px 0px 5px 0px"
              onClick={handleRegistOpen}
            >
              등록
            </SignalBtn>
            <SignalWeekModal open={registOpen} onClose={handleRegistClose} mode={true}></SignalWeekModal>
          </div>
        </div>
        <div className="admin-signal-week-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-table-head">
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
                    <TableCell align="center">{row.quarter}</TableCell>
                    <TableCell align="center">
                      {row.openStartDt}~{row.openEndDt}
                    </TableCell>
                    <TableCell align="center">
                      {row.voteStartDt}~{row.voteEndDt}
                    </TableCell>
                    <TableCell align="center">
                      <SignalBtn startIcon={<EditIcon />}>수정</SignalBtn>
                    </TableCell>
                    <TableCell align="center">
                      <SignalBtn startIcon={<SearchIcon />}>프로젝트조회</SignalBtn>
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
export default AdminSignalWeek
