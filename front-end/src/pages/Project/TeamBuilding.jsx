import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import '../../assets/styles/teamSelect.css'
import MemoModal from '../../components/Memo/MemoModal'
import MeetingConfirmModal from 'components/Meeting/MeetingConfirmModal'
import { Experimental_CssVarsProvider as CssVarsProviderm, styled } from '@mui/material/styles'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import Paging from 'components/Paging'
import { Button } from '@mui/material'
import SignalBtn from 'components/common/SignalBtn'
import { StateCode } from 'components/common/TeamSelectStateCode'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ProjectInviteConfirm from 'components/Project/ProjectInviteConfirm'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import cancleButton from '../../assets/image/x.png'
import Swal from 'sweetalert2'
import api from 'api/Api.js'

const ImageButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
  },
}))

const ComfirmButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.common.white,
  color: '#574B9F',
  borderColor: '#574B9F',
  border: '1px solid',
  height: 30,
  '&:hover': {
    backgroundColor: '#574B9F',
    color: theme.vars.palette.common.white,
    borderColor: theme.vars.palette.common.white,
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
  const [confirmOpen, setConfirmOpen] = useState(false)

  const navigate = useNavigate()

  const handleConfirmOpen = () => {
    setConfirmOpen(true)
  }

  const handleConfirmClose = () => {
    console.log(false)
    setConfirmOpen(false)
  }

  const handlePageChange = (page) => {
    setPage(page)
    applyListFetch(page)
    console.log(page)
  }

  const applyListFetch = async (param) => {
    try {
      await api
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

      await api.get(process.env.REACT_APP_API_URL + '/apply/writer/count/' + postingSeq).then((res) => {
        setCount(res.data.body.count)
      })

      await api.get(process.env.REACT_APP_API_URL + '/posting/' + postingSeq).then((res) => {
        setTeamTotalCnt(
          res.data.body.postingPositionList.reduce((sum, value) => {
            return sum + value.positionCnt
          }, 0)
        )
      })

      await api.get(process.env.REACT_APP_API_URL + '/apply/writer/count/' + postingSeq).then((res) => {
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

  const projectPost = async () => {
    try {
      const res = await api.post(process.env.REACT_APP_API_URL + '/project', { params: postingSeq })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    handleConfirmClose()
    const timerInterval = () => setInterval(() => {}, 100)
    Swal.fire({
      title: '프로젝트 생성 완료!',
      html: '프로젝트 생성이 완료 되었습니다! 마이 프로젝트를 확인해주세요!',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval()
      },
      willClose: () => {
        clearInterval(timerInterval)
        navigate('/')
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  const stateCodeColor = (stateCode) => {}

  useEffect(() => {
    applyListFetch(1)
  }, [])
  useEffect(() => {}, [applySeqList])

  useEffect(() => {
    checkButtonValid()
  }, [teamTotalCnt, teamCnt])

  useEffect(() => {}, [confirmOpen])

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
                          <ProjectInviteConfirm
                            apply={apply}
                            applySeqList={applySeqList}
                            setapplySeqList={setapplySeqList}
                            valid={valid}
                          ></ProjectInviteConfirm>
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
            <SignalBtn sigwidth="250px" onClick={handleConfirmOpen}>
              프로젝트 시작
            </SignalBtn>
            <Dialog
              open={confirmOpen}
              onClose={handleConfirmClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="cancle-section"
            >
              <div>
                <DialogTitle id="alert-dialog-title" className="cancle-title">
                  프로젝트를 시작하시겠습니까?
                </DialogTitle>
                <img src={cancleButton} alt="cancleButton" className="cancle-button" onClick={handleConfirmClose} />
                <DialogActions className="delete-button">
                  <ComfirmButton onClick={projectPost}>예</ComfirmButton>
                </DialogActions>
              </div>
            </Dialog>
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
