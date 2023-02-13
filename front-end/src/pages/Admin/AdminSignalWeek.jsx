import React, { useEffect, useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminSignalWeek.css'
import EditIcon from '@mui/icons-material/Edit'
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

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
              onClick={handleOpen}
            >
              등록
            </SignalBtn>
            <SignalWeekModal
              open={open}
              onClose={handleClose}
              mode={true}
              defaultOpenStartDt={null}
              defaultOpenEndDt={null}
              defualtVoteStartDt={null}
              defualtVoteEndDt={null}
            ></SignalWeekModal>
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
                      <SignalBtn
                        startIcon={<EditIcon />}
                        open={open}
                        onClose={handleClose}
                        mode={false}
                        defaultOpenStartDt={row.openStartDt}
                        defaultOpenEndDt={row.openEndDt}
                        defualtVoteStartDt={row.voteStartDt}
                        defualtVoteEndDt={row.voteEndDt}
                      >
                        수정
                      </SignalBtn>
                      <SignalWeekModal
                        open={open}
                        onClose={handleClose}
                        mode={false}
                        defaultOpenStartDt={row.openStartDt}
                        defaultOpenEndDt={row.openEndDt}
                        defualtVoteStartDt={row.voteStartDt}
                        defualtVoteEndDt={row.voteEndDt}
                      ></SignalWeekModal>
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
