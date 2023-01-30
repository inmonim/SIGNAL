import * as React from 'react'
import { Button } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import Container from '@mui/material/Container'
import emotion from '@emotion/styled'
import { Experimental_CssVarsProvider as CssVarsProvider, styled } from '@mui/material/styles'

import '../../assets/styles/teamSelect.css'

import memoButton from '../../assets/image/memo.png'
import detailButton from '../../assets/image/detail.png'

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
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#574B9F',
    border: '',
  },
}))

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

const MeetingButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF4242',
  color: theme.vars.palette.common.white,
  height: 30,
  '&:hover': {
    backgroundColor: theme.vars.palette.common.white,
    color: '#FF4242',
  },
}))

const Image = {
  width: '15px',
}

function createData(name, meetingTime, position, isSelect) {
  return { name, meetingTime, position, isSelect }
}

const rows = [createData('나유진', '01/17 3:00', 'Front-End', '선택완료')]

export default function BasicTable() {
  return (
    <CssVarsProvider>
      <div>
        <Banner>
          <div>팀 빌딩</div>
        </Banner>
        <Container>
          <div className="team-building-section">
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
                    {rows.map((row) => (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          <MeetingButton>사전미팅참가</MeetingButton>
                        </TableCell>
                        <TableCell align="center">{row.meetingTime}</TableCell>
                        <TableCell align="center">{row.position}</TableCell>
                        <TableCell align="center">{row.isSelect}</TableCell>
                        <TableCell align="center">
                          <ImageButton>
                            <img src={memoButton} alt="memoButton" style={Image} />
                          </ImageButton>
                        </TableCell>
                        <TableCell align="center">
                          <ImageButton>
                            <img src={detailButton} alt="detailButton" style={Image} />
                          </ImageButton>
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
