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
import { Experimental_CssVarsProvider as CssVarsProviderm, styled } from '@mui/material/styles'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Paging from 'components/Paging'
import { Button } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
import { StateCode } from 'components/common/TeamSelectStateCode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ProjectTeamSelectConfirmModal from 'components/Project/ProjectInviteConfirmModal'

const ImageButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
  },
}))

function TeamSelect() {
  const postingSeq = 458
  const [applyList, setApplyList] = useState([])
  const [teamTotalCnt, setTeamTotalCnt] = useState(1)
  const [teamCnt, setTeamCnt] = useState(0)

  const [applySeqList, setapplySeqList] = useState([])
  const [size] = useState(8)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const [valid, setValid] = useState('true')

  const handlePageChange = (page) => {
    setPage(page)
    applyListFetch(page)
    console.log(page)
  }

  const applyListFetch = async (param) => {
    try {
      await axios
        .get(process.env.REACT_APP_API_URL + '/apply/writer/' + postingSeq, {
          params: {
            page: param,
            size,
          },
        })
        .then((res) => {
          setApplyList(res.data.body)
          console.log(res.data.body)
        })

      await axios.get(process.env.REACT_APP_API_URL + '/apply/writer/count/' + postingSeq).then((res) => {
        setCount(res.data.body.count)
      })

      await axios.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq).then((res) => {
        setTeamTotalCnt(
          res.data.body.postingPositionList.reduce((sum, value) => {
            return sum + value.positionCnt
          }, 0)
        )
      })

      await axios.get(process.env.REACT_APP_API_URL + '/apply/writer/count/' + postingSeq).then((res) => {
        setTeamCnt(res.data.body.selectCnt)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const checkButtonValid = () => {
    if (teamTotalCnt === teamCnt) setValid('false')
    console.log(teamTotalCnt)
    console.log(teamCnt)
    console.log(valid)
  }

  const handleProjectStart = async () => {
    const config = { 'Content-Type': 'application/json' }
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + '/project', { params: postingSeq }, config)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const stateCodeColor = (stateCode) => {}

  useEffect(() => {
    applyListFetch(1)
  }, [])
  useEffect(() => {}, [applySeqList])
  useEffect(() => {
    checkButtonValid()
  }, [teamTotalCnt, teamCnt])

  return (
    <CssVarsProviderm>
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
                    <TableCell align="center"> 메모 </TableCell>
                    <TableCell align="center"> 상세보기 </TableCell>
                    <TableCell align="center"> 선택 </TableCell>
                    <TableCell align="center">
                      {teamCnt}/{teamTotalCnt}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applyList &&
                    applyList.map((apply, index) => (
                      <TableRow
                        key={index}
                        value={apply.applySeq}
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
                          <MemoModal applySeq={apply.applySeq}></MemoModal>
                        </TableCell>
                        <TableCell align="center">
                          <Link to={'/applydetail'} state={{ applySeq: apply.applySeq, userSeq: apply.userSeq }}>
                            <ImageButton startIcon={<AccountBoxIcon />}>지원서보기</ImageButton>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <ProjectTeamSelectConfirmModal
                            apply={apply}
                            applySeqList={applySeqList}
                            setapplySeqList={setapplySeqList}
                            valid={valid}
                          ></ProjectTeamSelectConfirmModal>
                        </TableCell>
                        <TableCell align="center">
                          <StateCode
                            color={stateCodeColor(apply.applyCode)}
                            className="team-project-building-state-code"
                          >
                            {apply.applyCode.name}
                          </StateCode>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="team-select-submit-button">
            <SignalBtn sigwidth="250px" onClick={handleProjectStart}>
              프로젝트 시작
            </SignalBtn>
          </div>
          <div>
            <Paging page={page} count={count} setPage={handlePageChange} size={size} />
          </div>
        </div>
      </div>
    </CssVarsProviderm>
  )
}

export default TeamSelect
