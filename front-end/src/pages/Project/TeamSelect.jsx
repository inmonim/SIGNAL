import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import emotion from '@emotion/styled'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'

import '../../assets/styles/teamSelect.css'
import detailButton from '../../assets/image/detail.png'

import MemoModal from '../../components/Memo/MemoModal'
import axios from 'axios'
import Styled from 'styled-components'
import MeetingConfirmModal from 'components/Meeting/MeetingConfirmModal'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Banner = emotion.div`
  width: 100%;
  height: 150px;
  background: linear-gradient(89.98deg, rgba(255, 255, 255, 0) 0.02%, #bcb7d9 99.99%);
  border-radius: 0px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  height: 40,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
    border: '',
  },
}))

const Container = Styled.section`
  padding: 20px 300px;
`

const width = {
  minWidth: '800px',
}

const CommonButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
    border: '',
  },
}))

const ImageButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#574B9F',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: '#342D5F',
    color: '#574B9F',
  },
}))

const Image = {
  width: '15px',
}

function TeamSelect() {
  const postingSeq = 458
  const [applyList, setApplyList] = useState([])

  const applyListFetch = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/project/applyer/' + postingSeq + '?page=1&size=8')
      setApplyList(res.data.body.applyerList)
      console.log(res.data.body)
      console.log(applyList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    applyListFetch()
  }, [])

  return (
    <CssVarsProvider>
      <div>
        <Banner>
          <div>팀 빌딩</div>
        </Banner>
        <Container>
          <div style={width}>
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, height: 570 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"> 닉네임 </TableCell>
                      <TableCell align="center"> 사전미팅참가 </TableCell>
                      <TableCell align="center"> 미팅 예약 시간</TableCell>
                      <TableCell align="center"> 포지션 </TableCell>
                      <TableCell align="center">2/6</TableCell>
                      <TableCell align="center"> 메모 </TableCell>
                      <TableCell align="center"> 상세보기 </TableCell>
                      <TableCell align="center"> 선택 </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applyList &&
                      applyList.map((apply, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{apply.nickname}</TableCell>
                          <TableCell align="center">
                            <MeetingConfirmModal></MeetingConfirmModal>
                          </TableCell>
                          <TableCell align="center">
                            {moment(apply.postingMeeting.meetingDt).format('MM/DD HH')} 시
                          </TableCell>
                          <TableCell align="center">{apply.position.name}</TableCell>
                          <TableCell align="center">seq : {apply.applySeq}</TableCell>
                          <TableCell align="center">
                            <MemoModal applySeq={apply.applySeq}></MemoModal>
                          </TableCell>
                          <TableCell align="center">
                            <Link to={'/applydetail'} state={{ applySeq: apply.applySeq, userSeq: apply.userSeq }}>
                              <ImageButton>
                                <img src={detailButton} alt="memoButton" style={Image} />
                              </ImageButton>
                            </Link>
                          </TableCell>
                          <TableCell align="center">
                            <CommonButton>선택</CommonButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="team-submit">
              <SubmitButton sx={{ px: 3 }}>프로젝트 시작</SubmitButton>
            </div>
          </div>
        </Container>
      </div>
    </CssVarsProvider>
  )
}

export default TeamSelect
