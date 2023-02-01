import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import '../../assets/styles/teamSelect.css'
import MemoModal from '../../components/Memo/MemoModal'
import axios from 'axios'
import MeetingConfirmModal from 'components/Meeting/MeetingConfirmModal'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Paging from 'components/Paging'
import SignalBtn from 'components/common/SignalBtn'
import StateCode from 'components/common/StateCode'

// const SubmitButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#574B9F',
//   color: theme.vars.palette.common.white,
//   height: 40,
//   '&:hover': {
//     backgroundColor: theme.vars.palette.common.white,
//     color: '#574B9F',
//     border: '',
//   },
// }))

// const Container = Styled.section`
//   padding: 20px 300px;
// `

// const width = {
//   minWidth: '800px',
// }

// const CommonButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#574B9F',
//   color: theme.vars.palette.common.white,
//   height: 30,
//   '&:hover': {
//     backgroundColor: theme.vars.palette.common.white,
//     color: '#574B9F',
//     border: '',
//   },
// }))

// const ImageButton = styled(Button)(({ theme }) => ({
//   backgroundColor: '#574B9F',
//   color: theme.vars.palette.common.white,
//   height: 30,
//   '&:hover': {
//     backgroundColor: '#342D5F',
//     color: '#574B9F',
//   },
// }))

// const Image = {
//   width: '15px',
// }

function TeamSelect() {
  const postingSeq = 458
  const [applyList, setApplyList] = useState([])

  const [size] = useState(8)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
    console.log(page)
  }

  const applyListFetch = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_API_URL + '/apply/writer/' + postingSeq, {
          params: { page, size },
        })
        .then((res) => {
          console.log(res.data.body)
          setApplyList(res.data.body)
        })

      await axios.get(process.env.REACT_APP_API_URL + '/apply/writer/count/' + postingSeq).then((res) => {
        setCount(res.data.body)
      })

      await axios.get(process.env.REACT_APP_API_URL + '/apply/writer/count/' + postingSeq).then((res) => {
        setCount(res.data.body)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const stateCodeColor = (stateCode) => {}

  useEffect(() => {
    applyListFetch()
  }, [])

  return (
    <div className="team-select-container">
      <div className="team-select-banner">
        <div>팀 빌딩</div>
      </div>
      <div className="team-selct-width">
        <div className="team-selct-table">
          <TableContainer>
            <Table>
              <TableHead className="team-select-table-header">
                <TableRow sx={[{ backgroundColor: 'rgba(244, 246, 249, 0.5)' }]}>
                  <TableCell align="center"> 닉네임 </TableCell>
                  <TableCell align="center"> 사전미팅참가 </TableCell>
                  <TableCell align="center"> 미팅 예약 시간</TableCell>
                  <TableCell align="center"> 포지션 </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"> 메모 </TableCell>
                  <TableCell align="center"> 상세보기 </TableCell>
                  <TableCell align="center"> 선택 </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applyList &&
                  applyList.map((apply, index) => (
                    <TableRow
                      key={index}
                      vlaue={apply.applySeq}
                      sx={[
                        {
                          '&:hover': { backgroundColor: 'rgba(221, 219, 236, 0.5)', transition: '0.3s' },
                        },
                      ]}
                    >
                      <TableCell align="center">{apply.nickname}</TableCell>
                      <TableCell align="center">
                        <MeetingConfirmModal></MeetingConfirmModal>
                      </TableCell>
                      <TableCell align="center">{moment(apply.meetingDt).format('MM/DD HH:00')}</TableCell>
                      <TableCell align="center">{apply.positionCode.name}</TableCell>
                      <TableCell align="center">
                        <StateCode color={stateCodeColor(apply.applyCode)} className="team-project-building-state-code">
                          {apply.applyCode.name}
                        </StateCode>
                      </TableCell>
                      <TableCell align="center">
                        <MemoModal applySeq={apply.applySeq}></MemoModal>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={'/applydetail'} state={{ applySeq: apply.applySeq, userSeq: apply.userSeq }}>
                          <button>지원서보기</button>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <button>선택</button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Paging page={page} count={count} setPage={handlePageChange} size={size} />
        <div className="team-select-submit-button">
          <SignalBtn sigwidth="250px">프로젝트 시작</SignalBtn>
        </div>
      </div>
    </div>
  )
}

export default TeamSelect
