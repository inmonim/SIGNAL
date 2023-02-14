import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import api from 'api/Api'
import closeBtn from 'assets/image/x.png'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/adminBlackList.css'

import React, { useEffect } from 'react'

function BlackListReleaseModal({ open, onClose, rows }) {
  const handleDisBan = async () => {
    const req = []
    rows.forEach((row) => {
      req.push(parseInt(row.blackUserSeq))
    })

    console.log(req)
    try {
      await api.delete(process.env.REACT_APP_API_URL + '/admin/user', { data: req })
    } catch (error) {
      console.log(error)
    }
    location.reload()
  }

  useEffect(() => {}, [rows])

  return (
    <>
      <Modal open={open}>
        <Box sx={style}>
          <div className="close">
            <img
              className="closeimg"
              style={{
                cursor: 'pointer',
                display: 'inline-block',
                position: 'absolute',
                left: '90%',
                bottom: '90%',
                transform: 'translate(-50%, 0%)',
              }}
              src={closeBtn}
              alt="closeBtn"
              onClick={onClose}
            />
          </div>
          <div className="black-list-modal-main">
            <div className="black-list-modal-title">블랙리스트를 해지하시겠습니까</div>
            <TableContainer sx={{ minWidth: 600, height: 400 }} className="blackList-modal-container">
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">번호</TableCell>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell align="center">닉네임</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="black-list-modal-table">
                  {rows.map((row, index) => (
                    <TableRow key={index} className="blackList-modal-tr">
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.nickname}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="black-list-modal-submit-btn">
              <SignalBtn
                sigwidth="120px"
                sigheight="60px"
                sigfontsize="30px"
                sigborderradius={25}
                onClick={handleDisBan}
              >
                확인
              </SignalBtn>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default BlackListReleaseModal

const style = {
  width: 727,
  height: 700,
  bgcolor: '#ffffff',
  borderRadius: 20,
  border: 'none',
  boxShadow:
    '0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)',
  p: 4,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
}
