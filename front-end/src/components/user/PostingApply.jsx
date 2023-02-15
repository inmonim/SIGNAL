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
import moment from 'moment'

function PostingApply() {
  const navigate = useNavigate()
  const userSeq = sessionStorage.getItem('userSeq')
  // const [data, setData] = useState([])
  // const [rows, setRows] = useState([])

  const [size] = useState(6)
  const [applyPage, setApplyPage] = useState(1)
  const [postingPage, setPostingPage] = useState(1)
  const [applyCount, setApplyCount] = useState(0)
  const [postingCount, setPostingCount] = useState(0)

  const [rowsApplyForm, setRowsApplyForm] = useState([])
  const [rowsPostingForm, setRowsPostingForm] = useState([])

  const [change, setChange] = useState(false)

  const applyListFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/apply/applyer/count/' + userSeq).then((res) => {
        setApplyCount(res.data.body.count)
      })
      await api
        .get(process.env.REACT_APP_API_URL + '/apply/applyer/' + userSeq + '?page=' + applyPage + '&size=' + size)
        .then((res) => {
          // setData(res.data.body)
          // console.log('applyListFetch', res.data.body)
          setRowsApplyForm(res.data.body)
        })
      // console.log('apply', applyCount)
    } catch (error) {
      console.log(error)
    }
  }

  const postingListFetch = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + '/posting/post/count/' + userSeq).then((res) => {
        setPostingCount(res.data.body.count)
        // console.log('posting', postingCount)
      })
      await api
        .get(process.env.REACT_APP_API_URL + '/posting/post/' + userSeq + '?page=' + postingPage + '&size=' + size)
        .then((res) => {
          // setData(res.data.body)
          // console.log('postingListFetch', res.data.body)
          setRowsPostingForm(res.data.body.postingList)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleApplyPageChange = (page) => {
    setApplyPage(page)
  }
  const handlePostingPageChange = (page) => {
    setPostingPage(page)
  }

  const applyRows = []
  Array.from(rowsApplyForm).forEach((item) => {
    applyRows.push({
      // state: item.stateCode.name,
      userSeq: item.userSeq,
      applySeq: item.applySeq,
      state: item.stateCode.name,
      subject: item.subject,
      meetingDt: moment(item.meetingDt).format('YYYY-MM-DD HH:mm'),
    })
  })
  const applyRowLen = applyRows.length
  // console.log(applyRowLen)

  if (applyRowLen !== size && applyRowLen !== 0) {
    for (let i = 0; i < size - applyRowLen; i++)
      applyRows.push({
        applySeq: '',
        state: ' ',
        subject: ' ',
        meetingDt: ' ',
      })
  }

  const postingRows = []
  Array.from(rowsPostingForm).forEach((item) => {
    postingRows.push({
      // state: item.stateCode.name,
      postingSeq: item.postingSeq,
      state: item.postingCode.name,
      subject: item.subject,
    })
  })
  const postingRowLen = postingRows.length
  if (postingRowLen !== size && postingRowLen !== 0) {
    for (let i = 0; i < size - postingRowLen; i++)
      postingRows.push({
        postingSeq: '',
        state: ' ',
        subject: ' ',
      })
  }

  const handleProjectAccept = async (applySeq) => {
    console.log(applySeq)
    try {
      await api.put(process.env.REACT_APP_API_URL + '/posting/member/confirm', {
        applySeq,
        select: true,
      })
      console.log('지원서 확정')
      setChange(!change)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleProjectRefuse = async (applySeq) => {
    console.log(applySeq)

    try {
      await api.put(process.env.REACT_APP_API_URL + '/posting/member/confirm', {
        applySeq,
        select: false,
      })
      console.log('지원서 거절')
      setChange(!change)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // const handleApplyDelete = async (applySeq) => {
  //   try {
  //     await api.delete(process.env.REACT_APP_API_URL + '/apply/' + applySeq)
  //     console.log('지원 취소')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handlePostingDelete = async (postingSeq) => {
    try {
      await api.delete(process.env.REACT_APP_API_URL + '/posting/' + postingSeq)
      // console.log('공고 취소')
    } catch (error) {
      console.log(error)
    }
  }

  const [tab, setTab] = useState(0)

  useEffect(() => {
    applyListFetch()
  }, [applyPage, tab])

  useEffect(() => {
    postingListFetch()
  }, [postingPage, tab])

  return (
    <div className="my-posting-apply">
      <div className="my-profile-tab-list">
        <div
          className={`my-profile-tab ${tab === 0 ? 'active' : ''}`}
          onClick={() => {
            setTab(0)
          }}
        >
          지원한 공고
        </div>
        <div
          className={`my-profile-tab ${tab === 1 ? 'active' : ''}`}
          onClick={() => {
            setTab(1)
          }}
        >
          작성한 공고
        </div>
      </div>
      <div className="my-profile-table">
        {tab === 0 ? (
          applyRowLen === 0 ? (
            <div className="my-profile-no-table-container">
              <div className="my-profile-no-table">지원한 공고가 없습니다.</div>
            </div>
          ) : (
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
                      <TableCell align="center">지원서</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applyRows.map((row, index) => (
                      <TableRow key={index} className="my-profile-table">
                        <TableCell align="center">{row.state}</TableCell>
                        <TableCell align="left">{row.subject}</TableCell>
                        <TableCell align="center">
                          {row.state === '심사중' ? (
                            // 필요한 파라미터 : nickname, 팀장인지 아닌지(owner[팀장 true, 팀원 false]), applySeq
                            // 프로필에서 입장은 지원자
                            <SignalBtn
                              onClick={() =>
                                window.open(
                                  `/beforemeeting?nickname=${sessionStorage.getItem(
                                    'nickname'
                                  )}&owner=${false}&applySeq=${row.applySeq}`,
                                  '_blank'
                                )
                              }
                            >
                              참가
                            </SignalBtn>
                          ) : (
                            ' '
                          )}
                        </TableCell>
                        <TableCell align="center">{row.meetingDt}</TableCell>
                        <TableCell align="center">
                          {row.state === '선발' ? (
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
                                navigate('/applydetail', { state: { applySeq: row.applySeq, stateCode: row.state } })
                              }}
                            >
                              조회
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
              <Paging page={applyPage} count={applyCount} setPage={handleApplyPageChange} size={size} />
            </>
          )
        ) : postingRowLen === 0 ? (
          <div className="my-profile-no-table-container">
            <div className="my-profile-no-table">작성한 공고가 없습니다.</div>
          </div>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead className="my-profile-table-head">
                  <TableRow>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">작성한 공고</TableCell>
                    <TableCell align="center">팀 구성</TableCell>
                    <TableCell align="center">수정</TableCell>
                    <TableCell align="center">삭제</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {postingRows.map((row, index) => (
                    <TableRow key={index} className="my-profile-table">
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="left">{row.subject}</TableCell>
                      <TableCell align="center">
                        {row.state === '모집 중' ? (
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
                        {row.state === '모집 중' ? (
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
                        {row.subject === ' ' || row.state === '모집 취소' || row.state === '모집 마감' ? (
                          ''
                        ) : (
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
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paging page={postingPage} count={postingCount} setPage={handlePostingPageChange} size={size} />
          </>
        )}
      </div>
    </div>
  )
}

export default PostingApply
