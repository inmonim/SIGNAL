import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Paging from 'components/Paging'
import { useNavigate } from 'react-router-dom'
import SignalBtn from 'components/common/SignalBtn'
import 'assets/styles/signal.css'
import SignalItem from 'components/Signal/SignalItem'
import api from 'api/Api.js'
import { Box } from '@mui/material'
import signaltitle from 'assets/lottie/signaltitle.json'
import Lottie from 'react-lottie'
import moment from 'moment'
function SignalList() {
  // const [data, setData] = useState([])

  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [size] = useState(16)
  const [count, setCount] = useState(20)
  const [signalList, setSignalList] = useState([])

  const [signalweekDate, setSignalweekDate] = useState('')
  const handlePageChange = (page) => {
    setPage(page)
  }
  const signalListAxios = async () => {
    try {
      await api.get(process.env.REACT_APP_API_URL + `/signalweek?page=${page}&size=${size}`).then((res) => {
        setSignalList(res.data.body.signalweekList)
        setCount(res.data.body.signalweekTotalElement)
      })
      await api.get(process.env.REACT_APP_API_URL + `/signalweek/signalweekdate`).then((res) => {
        setSignalweekDate(res.data.body)
      })
    } catch (error) {
      console.log(error)
    }
  }
  // 시그널 위크 분기 구분
  const now = new Date()
  const month = now.getMonth() + 1

  let message = ''
  if (month >= 1 && month <= 3) {
    message = `${now.getFullYear()}년 1분기 시그널위크 프로젝트`
  } else if (month >= 4 && month <= 6) {
    message = `${now.getFullYear()}년 2분기 시그널위크 프로젝트`
  } else if (month >= 7 && month <= 9) {
    message = `${now.getFullYear()}년 3분기 시그널위크 프로젝트`
  } else {
    message = `${now.getFullYear()}년 4분기 시그널위크 프로젝트`
  }
  // 시그널 위크 분기 구분

  // // 날짜 구분을 위해 하루 앞당겨서 계산
  // const validNow = new Date().setDay(new Date().getDate() + 1)
  // console.log('validNow', validNow)

  // 시그널 로티
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signaltitle,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  // 시그널 로티

  useEffect(() => {
    signalListAxios()
  }, [])
  useEffect(() => {
    signalListAxios()
  }, [page])

  return (
    <div className="signal-page-container">
      <div className="signal-container">
        <Box sx={{ width: '100%', height: '60px' }}></Box>
        <div style={{ display: 'flex', alignItems: ' center', justifyContent: 'center' }}>
          <div className="signal-header-title">{message}</div>
          <Lottie
            options={defaultOptions}
            width={'25%'}
            height={'20%'}
            style={{ marginLeft: '1em ', marginRight: '0px' }}
          />
        </div>
        {new Date(signalweekDate.openStartDt) <= new Date(moment(now).format('YYYY-MM-DD')) ? (
          <>
            {console.log('openEndDt', new Date(signalweekDate.openEndDt))}
            {console.log('now', new Date(moment(now).format('YYYY-MM-DD')))}
            {new Date(signalweekDate.openEndDt) >= new Date(moment(now).format('YYYY-MM-DD')) ? (
              <SignalBtn
                sigwidth="84px"
                sigheight="45px"
                sigfontsize="24px"
                sigborderradius={14}
                sigmargin="0px 0px 5px 0px"
                variant="contained"
                onClick={() => navigate(`/signalregister`)}
                style={{ float: 'right' }}
              >
                등록
              </SignalBtn>
            ) : (
              ''
            )}

            <div className="signal-header">
              <div className="signal-header-regist"></div>
            </div>
            <div className="signal-table">
              <Box sx={{ width: '10%', height: '40px' }}></Box>
              <Signal>
                {signalList.map((signal, i) => (
                  <SignalItem key={i} signal={signal} />
                ))}
              </Signal>
              <hr style={{ marginBottom: '30px  ' }} />
              <Paging page={page} count={count} setPage={handlePageChange} size={size} />
            </div>
          </>
        ) : (
          <div className="signal-term-valid-box">
            <div style={{ textAlign: 'center', fontSize: '27px' }}>아직 시그널 위크가 개설되지 않았습니다</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignalList

const Signal = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  gap: 10px;
  justify-content: start;
  &:hover {
    $ .postcard {
      background: cornflowerblue;
      color: white;
      transition: 0.5s;
    }
  }
`
