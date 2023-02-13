import { Box, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import closeBtn from 'assets/image/x.png'
import { DatePicker } from '@mui/x-date-pickers'
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

function SignalWeekModal({
  open,
  onClose,
  mode,
  defaultOpenStartDt,
  defaultOpenEndDt,
  defualtVoteStartDt,
  defualtVoteEndDt,
}) {
  const [openStartDt, setOpenStartDt] = useState(defaultOpenStartDt)
  const [openEndDt, setOpenEndDt] = useState(defaultOpenEndDt)
  const [voteStartDt, setVoteStartDt] = useState(defualtVoteStartDt)
  const [voteEndDt, setVoteEndDt] = useState(defualtVoteEndDt)

  const handleSignalWeekRegist = async () => {
    try {
      const date = new Date()
      const year = parseInt(moment(date).format('YYYY'))
      const month = parseInt(moment(date).format('MM'))
      const quarter = getQuarter(month)
      await api.post(process.env.REACT_APP_API_URL + '/admin/signalweek', {
        openEndDt: moment(openEndDt.$d).format('YYYY-MM-DD'),
        openStartDt: moment(openStartDt.$d).format('YYYY-MM-DD'),
        quarter,
        voteEndDt: moment(voteEndDt.$d).format('YYYY-MM-DD'),
        voteStartDt: moment(voteStartDt.$d).format('YYYY-MM-DD'),
        year,
      })
    } catch (error) {
      console.log(error)
    }
  }
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
              <>
                <div>
                  <SignalBtn sigwidth="120px" sigheight="60px" sigfontsize="30px" sigborderradius={25}>
                    수정
                  </SignalBtn>
                  <SignalBtn sigwidth="120px" sigheight="60px" sigfontsize="30px" sigborderradius={25}>
                    삭제
                  </SignalBtn>
                </div>
              </>
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
