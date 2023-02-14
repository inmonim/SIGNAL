import React, { useState, useEffect } from 'react'
import SignalBtn from 'components/common/SignalBtn'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import 'assets/styles/adminBlackList.css'
import api from 'api/Api'
import BlackListReleaseModal from 'components/Admin/BlackListReleaseModal'
import Paging from 'components/Paging'

function AdminBlackList() {
  const [blackList, setBlackList] = useState([])
  const [disBlackList, setDisBlackList] = useState([])

  const blackListFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + `/admin/user?page=${page}&size=${size}`).then((res) => {
        console.log(res.data.body)
        setBlackList(res.data.body.blackUserList)
        setCount(res.data.body.count)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const [size] = useState(8)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
  }

  useEffect(() => {
    blackListFetch()
  }, [page])

  const rows = []
  Array.from(blackList).forEach((item) => {
    rows.push({
      blackUserSeq: item.blackUserSeq,
      userSeq: item.userSeq,
      email: item.email,
      nickname: item.nickname,
      regDt: item.regDt,
      projectSeq: item.projectSeq,
    })
  })

  const rowLen = rows.length
  if (rowLen !== size && rowLen !== 0) {
    for (let i = 0; i < size - rowLen; i++)
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
                {rows.map((row, index) => (
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
          <Paging page={page} count={count} setPage={handlePageChange} size={size} />
        </div>
      </div>
    </div>
  )
}
export default AdminBlackList
