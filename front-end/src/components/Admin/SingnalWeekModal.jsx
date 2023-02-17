import { Box, Modal, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import closeBtn from 'assets/image/x.png'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SignalBtn from 'components/common/SignalBtn'
import moment from 'moment'
import api from 'api/Api'

const getQuarter = (month) => {
  if (month >= 1 && month <= 3) return 1
  else if (month >= 4 && month <= 6) return 2
  else if (month >= 7 && month <= 9) return 3
  else return 4
}

function SignalWeekModal({ open, onClose, mode, defaultData, signalweekScheduleSeq }) {
  const [openStartDt, setOpenStartDt] = useState(dayjs(defaultData.defaultOpenStartDt))
  const [openEndDt, setOpenEndDt] = useState(dayjs(defaultData.defaultOpenEndDt))
  const [voteStartDt, setVoteStartDt] = useState(dayjs(defaultData.defualtVoteStartDt))
  const [voteEndDt, setVoteEndDt] = useState(dayjs(defaultData.defualtVoteEndDt))

  const handleSignalWeekRegist = async () => {
    try {
      const year = parseInt(moment(openEndDt.$d).format('YYYY'))
      const month = parseInt(moment(openEndDt.$d).format('MM'))
      const quarter = getQuarter(month)

      const req = {
        openEndDt: moment(openEndDt.$d).format('YYYY-MM-DD'),
        openStartDt: moment(openStartDt.$d).format('YYYY-MM-DD'),
        quarter,
        voteEndDt: moment(voteEndDt.$d).format('YYYY-MM-DD'),
        voteStartDt: moment(voteStartDt.$d).format('YYYY-MM-DD'),
        year,
      }
      await api.post(process.env.REACT_APP_API_URL + '/admin/signalweek', JSON.stringify(req))
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignalWeekModify = async () => {
    try {
      const year = parseInt(moment(openEndDt.$d).format('YYYY'))
      const month = parseInt(moment(openEndDt.$d).format('MM'))
      const quarter = getQuarter(month)
      await api.put(process.env.REACT_APP_API_URL + `/admin/signalweek/${signalweekScheduleSeq}`, {
        openEndDt: moment(openEndDt.$d).format('YYYY-MM-DD'),
        openStartDt: moment(openStartDt.$d).format('YYYY-MM-DD'),
        quarter,
        voteEndDt: moment(voteEndDt.$d).format('YYYY-MM-DD'),
        voteStartDt: moment(voteStartDt.$d).format('YYYY-MM-DD'),
        year,
      })
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  const handleSignalWeekDelete = async () => {
    try {
      await api.delete(process.env.REACT_APP_API_URL + `/admin/signalweek/${signalweekScheduleSeq}`)
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setOpenStartDt(dayjs(defaultData.defaultOpenStartDt))
    setOpenEndDt(dayjs(defaultData.defaultOpenEndDt))
    setVoteStartDt(dayjs(defaultData.defualtVoteStartDt))
    setVoteEndDt(dayjs(defaultData.defualtVoteEndDt))
  }, [open])

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
          <div className="admin-singal-week-modal-body">
            <div className="admin-signal-week-modal-title"> {mode ? '시그널위크 등록' : '시그널위크 수정'}</div>
            <div className="admin-signal-week-modal-form">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="admin-signal-week-modal-openDt">
                  <div className="admin-signal-week-modal-openDt-title">신청 기간</div>
                  <hr />
                  <div className="admin-signal-week-modal-openDt-form">
                    <div className="admin-signal-week-modal-form-label">
                      시작 <br />
                      날짜
                    </div>
                    <div>
                      <DatePicker
                        label="신청 시작날짜"
                        value={openStartDt}
                        inputFormat={'YYYY/MM/DD'}
                        mask={'____/__/__'}
                        onChange={(newValue) => {
                          setOpenStartDt(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div className="admin-signal-week-modal-form-label">
                      종료 <br />
                      날짜
                    </div>
                    <div>
                      <DatePicker
                        label="신청 종료날짜"
                        value={openEndDt}
                        inputFormat={'YYYY/MM/DD'}
                        minDate={openStartDt}
                        mask={'____/__/__'}
                        onChange={(newValue) => {
                          setOpenEndDt(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </div>
                <div className="admin-signal-week-modal-voteDt">
                  <div className="admin-signal-week-modal-voteDt-title">투표 기간</div>
                  <hr />
                  <div className="admin-signal-week-modal-voteDt-form">
                    <div className="admin-signal-week-modal-form-label">
                      시작 <br />
                      날짜
                    </div>
                    <div>
                      <DatePicker
                        label="투표 시작날짜"
                        value={voteStartDt}
                        inputFormat={'YYYY/MM/DD'}
                        mask={'____/__/__'}
                        minDate={openEndDt}
                        onChange={(newValue) => {
                          setVoteStartDt(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div className="admin-signal-week-modal-form-label">
                      종료 <br />
                      날짜
                    </div>
                    <div>
                      <DatePicker
                        label="투표 종료날짜"
                        value={voteEndDt}
                        inputFormat={'YYYY/MM/DD'}
                        mask={'____/__/__'}
                        minDate={voteStartDt}
                        onChange={(newValue) => {
                          setVoteEndDt(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </div>
              </LocalizationProvider>
            </div>
            {mode ? (
              <div className="admin-signal-week-modal-submit-btn">
                <SignalBtn
                  sigwidth="120px"
                  sigheight="60px"
                  sigfontsize="30px"
                  sigborderradius={25}
                  onClick={handleSignalWeekRegist}
                >
                  등록
                </SignalBtn>
              </div>
            ) : (
              <div className="admin-signal-week-modal-modify-btns">
                <div className="admin-signal-week-modal-modify-btns-container">
                  <SignalBtn
                    sigwidth="120px"
                    sigheight="60px"
                    sigfontsize="30px"
                    sigborderradius={25}
                    onClick={handleSignalWeekModify}
                  >
                    수정
                  </SignalBtn>
                  <SignalBtn
                    sigwidth="120px"
                    sigheight="60px"
                    sigfontsize="30px"
                    sigborderradius={25}
                    onClick={handleSignalWeekDelete}
                  >
                    삭제
                  </SignalBtn>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default SignalWeekModal

const style = {
  width: 727,
  height: 800,
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
