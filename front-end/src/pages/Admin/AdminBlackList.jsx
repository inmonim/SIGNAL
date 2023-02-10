import React, { useState, useEffect } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminBlackList.css'
import api from 'api/Api'
import BlackListReleaseModal from 'components/Admin/BlackListReleaseModal'

function AdminBlackList() {
  const [blackList, setBlackList] = useState([])

  const blackListFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/admin/user').then((res) => {
        console.log(res.data.body)
        setBlackList(res.data.body.userList)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    blackListFetch()
  }, [])

  return (
    <div className="admin-black-list-page-container">
      <div className="admin-black-list-container">
        <div className="admin-black-list-header">
          <div className="admin-black-list-title">블랙리스트 관리</div>
          <div className="admin-black-list-release-btn">
            <SignalBtn
              sigheight="45px"
              sigfontsize="24px"
              sigborderradius={14}
              sigmargin="0px 0px 5px 0px"
              onClick={handleOpen}
            >
              블랙리스트 해제
            </SignalBtn>
            <BlackListReleaseModal open={open} onClose={handleClose}></BlackListReleaseModal>
          </div>
        </div>
        <div className="admin-black-list-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-tabl e-head">
                <TableRow>
                  <TableCell align="center">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center">닉네임</TableCell>
                  <TableCell align="center">가입일시</TableCell>
                  <TableCell align="center">프로젝트</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blackList &&
                  blackList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.nickname}</TableCell>
                      <TableCell align="center">{row.regDt}</TableCell>
                      <TableCell align="center">{row.projectCnt}</TableCell>
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
export default AdminBlackList
