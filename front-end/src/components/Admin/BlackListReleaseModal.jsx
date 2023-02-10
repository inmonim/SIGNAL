import { Modal, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import closeBtn from 'assets/image/x.png'
import SignalBtn from 'components/common/SignalBtn'

import React from 'react'

function BlackListReleaseModal(props) {
  return (
    <>
      <Modal open={props.open}>
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
              onClick={props.onClose}
            />
          </div>
          <div className="black-list-modal-main">
            <div className="black-list-modal-title">블랙리스트를 해지하시겠습니까</div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">번호</TableCell>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell align="center">닉네임</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </TableContainer>
            <SignalBtn sigwidth="60px" sigheight="40px" sigfontsize="20px" sigborderradius={15}>
              확인
            </SignalBtn>
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default BlackListReleaseModal

const style = {
  width: 727,
  height: 800,
  bgcolor: 'background.paper',
  borderRadius: 20,
  border: 'none',
  boxShadow: 24,
  p: 4,
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
}
