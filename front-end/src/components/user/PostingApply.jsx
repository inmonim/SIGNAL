import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paging from 'components/Paging'
import api from 'api/Api'
import SignalBtn from 'components/common/SignalBtn'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useNavigate } from 'react-router-dom'
import 'assets/styles/table.css'
import Swal from 'sweetalert2'

function PostingApply() {
  const navigate = useNavigate()
  const userSeq = sessionStorage.getItem('userSeq')
  // const [data, setData] = useState([])
  const [rows, setRows] = useState([])

  const applyListFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/apply/applyer/count/' + userSeq).then((res) => {
        setCount(res.data.body.count)
      })
      await api
        .get(process.env.REACT_APP_API_URL + '/apply/applyer/' + userSeq + '?page=' + page + '&size=' + size)
        .then((res) => {
          // setData(res.data.body)
          console.log(res.data.body)
          rowsApplyForm(res.data.body)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const postingFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/posting/post/count/' + userSeq).then((res) => {
        setCount(res.data.body.count)
        console.log(res.data.body.count)
      })
      await api
        .get(process.env.REACT_APP_API_URL + '/posting/post/' + userSeq + '?page=' + page + '&size=' + size)
        .then((res) => {
          // setData(res.data.body)
          console.log(res.data.body)
          rowsPostingForm(res.data.body.postingList)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const [size] = useState(6)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const handlePageChange = (page) => {
    setPage(page)
    console.log(page)
  }

  const rowsApplyForm = (data) => {
    const rowsArr = []
    Array.from(data).forEach((item) => {
      rowsArr.push({
        // state: item.stateCode.name,
        applySeq: item.applySeq,
        state: item.stateCode.name,
        subject: item.subject,
        meetingDt: item.meetingDt.split(' ', 1),
      })
    })
    const rowLen = rowsArr.length
    if (rowLen !== size && rowLen !== 0) {
      for (let i = 0; i < size - rowLen; i++)
        rowsArr.push({
          applySeq: '',
          state: ' ',
          subject: ' ',
          meetingDt: ' ',
        })
    }
    setRows(rowsArr)
    console.log(rowsArr)
  }

  const rowsPostingForm = (data) => {
    const rowsArr = []
    Array.from(data).forEach((item) => {
      rowsArr.push({
        // state: item.stateCode.name,
        postingSeq: item.postingSeq,
        state: item.postingCode.name,
        subject: item.subject,
      })
    })
    const rowLen = rowsArr.length
    if (rowLen !== size && rowLen !== 0) {
      for (let i = 0; i < size - rowLen; i++)
        rowsArr.push({
          postingSeq: '',
          state: ' ',
          subject: ' ',
        })
    }
    setRows(rowsArr)
    console.log(rowsArr)
  }

  const handleProjectAccept = async (applySeq) => {
    try {
      await api.put(process.env.REACT_APP_API_URL + '/posting/member/confirm', {
        applySeq,
        select: true,
      })
      console.log('지원서 확정')
    } catch (error) {
      console.log(error)
    }
  }

  const handleProjectRefuse = async (applySeq) => {
    try {
      await api.put(process.env.REACT_APP_API_URL + '/posting/member/confirm', {
        applySeq,
        select: true,
      })
      console.log('지원서 거절')
    } catch (error) {
      console.log(error)
    }
  }

  const handleApplyDelete = async (applySeq) => {
    try {
      await api.delete(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
      console.log('지원 취소')
    } catch (error) {
      console.log(error)
    }
  }

  const handlePostingDelete = async (postingSeq) => {
    try {
      await api.delete(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      console.log('공고 취소')
    } catch (error) {
      console.log(error)
    }
  }

  const [tab, setTab] = useState(0)

  useEffect(() => {
    applyListFetch()
  }, [])

  return (
    <div className="my-posting-apply">
      <div className="my-profile-tab-list">
        <div
          className={`my-profile-tab ${tab === 0 ? 'active' : ''}`}
          onClick={() => {
            setTab(0)
            setPage(1)
            applyListFetch()
          }}
        >
          지원한 공고
        </div>
        <div
          className={`my-profile-tab ${tab === 1 ? 'active' : ''}`}
          onClick={() => {
            setTab(1)
            setPage(1)
            postingFetch()
          }}
        >
          작성한 공고
        </div>
      </div>
      <div className="my-profile-table">
        {tab === 0 ? (
          <>
            <TableContainer>
              <Table>
                <TableHead className="my-profile-table-head">
                  <TableRow>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">지원한 공고</TableCell>
                    <TableCell align="center">사전미팅참가</TableCell>
                    <TableCell align="center">사전미팅시간</TableCell>
                    <TableCell align="center">확정</TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index} className="my-profile-table">
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="center">
                        {row.subject !== ' ' ? (
                          <SignalBtn onClick={() => window.open('/projectmeeting', '_blank')}>참가</SignalBtn>
                        ) : (
                          ' '
                        )}
                      </TableCell>
                      <TableCell align="center">{row.meetingDt}</TableCell>
                      <TableCell align="center">
                        {row.state === '합격' ? (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-evenly',
                            }}
                          >
                            <SignalBtn
                              startIcon={<TaskAltIcon />}
                              onClick={() => {
                                handleProjectAccept(row.applySeq)
                              }}
                            >
                              수락
                            </SignalBtn>
                            <SignalBtn
                              startIcon={<HighlightOffIcon />}
                              onClick={() => {
                                handleProjectRefuse(row.applySeq)
                              }}
                            >
                              거절
                            </SignalBtn>
                          </div>
                        ) : (
                          ' '
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.subject !== ' ' ? (
                          <SignalBtn
                            onClick={() => {
                              const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                  cancelButton: 'btn btn-danger',
                                  confirmButton: 'btn btn-success',
                                },
                                buttonsStyling: true,
                              })

                              swalWithBootstrapButtons
                                .fire({
                                  title: '지원서을 취소하겠습니까?',
                                  text: '삭제한 지원서는 다시 되돌릴 수 없습니다',
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonText: '예',
                                  cancelButtonText: '아니요',
                                })
                                .then((result) => {
                                  if (result.isConfirmed) {
                                    swalWithBootstrapButtons.fire('삭제', '지원이 취소되었습니다', 'success')
                                    handleApplyDelete(row.applySeq)
                                  }
                                })
                            }}
                          >
                            삭제
                          </SignalBtn>
                        ) : (
                          ' '
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paging page={page} count={count} setPage={handlePageChange} size={size} />
          </>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead className="qna-table-head">
                  <TableRow>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">작성한 공고</TableCell>
                    <TableCell align="center">팀 구성</TableCell>
                    <TableCell align="center">수정</TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index} className="my-profile-table">
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="center">
                        {row.subject !== ' ' ? (
                          <SignalBtn
                            onClick={() => {
                              navigate('/teambuilding', { state: { postingSeq: row.postingSeq } })
                            }}
                          >
                            팀원선택
                          </SignalBtn>
                        ) : (
                          ' '
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.subject !== ' ' ? (
                          <SignalBtn
                            onClick={() => {
                              navigate('/postingModify', { state: { postingSeq: row.postingSeq } })
                            }}
                          >
                            수정
                          </SignalBtn>
                        ) : (
                          ' '
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.subject !== ' ' ? (
                          <SignalBtn
                            onClick={() => {
                              const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                  cancelButton: 'btn btn-danger',
                                  confirmButton: 'btn btn-success',
                                },
                                buttonsStyling: true,
                              })

                              swalWithBootstrapButtons
                                .fire({
                                  title: '공고를 삭제하시겠습니까?',
                                  text: '삭제한 공고는 다시 되돌릴 수 없습니다',
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonText: '예',
                                  cancelButtonText: '아니요',
                                })
                                .then((result) => {
                                  if (result.isConfirmed) {
                                    swalWithBootstrapButtons.fire('삭제', '공고가 삭제되었습니다', 'success')
                                    handlePostingDelete(row.postingSeq)
                                  }
                                })
                            }}
                          >
                            삭제
                          </SignalBtn>
                        ) : (
                          ' '
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paging page={page} count={count} setPage={handlePageChange} size={size} />
          </>
        )}
      </div>
    </div>
  )
}

export default PostingApply
