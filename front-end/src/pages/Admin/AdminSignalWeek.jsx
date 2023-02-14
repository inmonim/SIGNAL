import React, { useEffect, useState } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminSignalWeek.css'
import EditIcon from '@mui/icons-material/Edit'
import api from 'api/Api'
import SignalWeekModal from 'components/Admin/SingnalWeekModal'
import Paging from 'components/Paging'
import moment from 'moment'

function AdminSignalWeek() {
  const [singalWeekList, setSingalWeekListt] = useState([])

  const [size] = useState(8)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const [signalweekScheduleSeq, setSignalweekScheduleSeq] = useState(0)

  useEffect(() => {
    api.get(process.env.REACT_APP_API_URL + `/admin/signalweek?page=${page}&size=${size}`).then((res) => {
      setSingalWeekListt(res.data.body.signalweekList)
      setCount(res.data.body.count)
    })
  }, [page])

  const rows = []
  Array.from(singalWeekList).forEach((item) => {
    rows.push({
      year: item.year,
      quarter: item.quarter,
      openStartDt: item.openStartDt,
      openEndDt: item.openEndDt,
      voteStartDt: item.voteStartDt,
      voteEndDt: item.voteEndDt,
      signalweekScheduleSeq: item.signalweekScheduleSeq,
    })
  })
  const rowLen = rows.length
  if (rowLen !== size && rowLen !== 0) {
    for (let i = 0; i < size - rowLen; i++)
      rows.push({
        year: '',
        quarter: '',
        openStartDt: '',
        openEndDt: '',
        voteStartDt: '',
        voteEndDt: '',
        signalweekScheduleSeq: '',
      })
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [mode, setMode] = useState(true)

  const [defaultData, setDefaultData] = useState({})

  const handleModifyOpen = (row) => {
    setDefaultData({
      defaultOpenStartDt: row.openStartDt,
      defaultOpenEndDt: row.openEndDt,
      defualtVoteStartDt: row.voteStartDt,
      defualtVoteEndDt: row.voteEndDt,
    })
    setSignalweekScheduleSeq(row.signalweekScheduleSeq)
    setMode(false)
    handleOpen()
  }

  const handleRegistOpen = () => {
    const presentDate = moment(new Date()).format('YYYY-MM-DD')
    setSignalweekScheduleSeq(null)
    setDefaultData({
      defaultOpenStartDt: presentDate,
      defaultOpenEndDt: presentDate,
      defualtVoteStartDt: presentDate,
      defualtVoteEndDt: presentDate,
    })
    setMode(true)
    handleOpen()
  }

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
            <SignalWeekModal
              open={open}
              onClose={handleClose}
              mode={mode}
              defaultData={defaultData}
              signalweekScheduleSeq={signalweekScheduleSeq}
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
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.year}</TableCell>
                    <TableCell align="center">{row.quarter}</TableCell>
                    <TableCell align="center">
                      {row.year !== '' ? (
                        <>
                          {row.openStartDt}~{row.openEndDt}
                        </>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.year !== '' ? (
                        <>
                          {row.voteStartDt}~{row.voteEndDt}
                        </>
                      ) : (
                        ''
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.year !== '' ? (
                        <>
                          <SignalBtn startIcon={<EditIcon />} onClick={() => handleModifyOpen(row)}>
                            수정
                          </SignalBtn>
                        </>
                      ) : (
                        ''
                      )}
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
export default AdminSignalWeek
