import React, { useState, useEffect } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminBlackList.css'
import api from 'api/Api'
import BlackListReleaseModal from 'components/Admin/BlackListReleaseModal'

function AdminBlackList() {
  const [blackList, setBlackList] = useState([])
  const [disBlackList, setDisBlackList] = useState([])

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

  const rows = []
  Array.from(blackList).forEach((item) => {
    rows.push(item)
  })
  const rowLen = rows.length
  if (rowLen !== 8 && rowLen !== 0) {
    for (let i = 0; i < 8 - rowLen; i++)
      rows.push({
        blackUserSeq: ' ',
        userSeq: ' ',
        email: ' ',
        nickname: ' ',
        regDt: ' ',
        projectSeq: ' ',
      })
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    const disBlackListArr = []
    rows.forEach((row, index) => {
      if (checked[index]) {
        disBlackListArr.push(row)
      }
    })
    setDisBlackList(disBlackListArr)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    blackListFetch()
  }, [])

  // 8개 checkbox default false
  const [checked, setChecked] = useState([false, false, false, false, false, false, false, false])

  const handleChecked = (event, index) => {
    const checkedArr = [...checked]
    const temp = checked[index]
    checkedArr.splice(index, 1, !temp)
    setChecked(checkedArr)
  }

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
            <BlackListReleaseModal open={open} onClose={handleClose} rows={disBlackList}></BlackListReleaseModal>
          </div>
        </div>
        <div className="admin-black-list-body">
          <TableContainer>
            <Table>
              <TableHead className="qna-tabl e-head">
                <TableRow>
                  <TableCell align="center">선택</TableCell>
                  <TableCell align="center">이메일</TableCell>
                  <TableCell align="center">닉네임</TableCell>
                  <TableCell align="center">가입일시</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        {row.userSeq === ' ' ? (
                          ''
                        ) : (
                          <Checkbox color="primary" onChange={() => handleChecked(event, index)} />
                        )}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.nickname}</TableCell>
                      <TableCell align="center">{row.regDt}</TableCell>
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
