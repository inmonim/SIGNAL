import React, { useEffect, useState } from 'react'
import 'assets/styles/signalweekrank.css'
import Lottie from 'react-lottie'
import confetti from 'assets/lottie/confetti.json'
import winner from 'assets/image/wMedal.PNG'
import second from 'assets/image/sMedal.PNG'
import third from 'assets/image/tMedal.png'
import { useNavigate, useLocation } from 'react-router-dom'
import api from 'api/Api'

function SignalHonor() {
  const confettiOptions = {
    loop: true,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const navigate = useNavigate()

  const handleToList = () => {
    navigate('/signal/ranklist')
  }

  const location = useLocation()
  const [year, setYear] = useState(0)
  const [quarter, setQuarter] = useState(0)
  const [winnerList, setWinnerList] = useState([])

  const getHonor = async () => {
    const nowYear = location.state.year
    const nowQuarter = location.state.quarter
    setYear(nowYear)
    setQuarter(nowQuarter)
    await api
      .get(process.env.REACT_APP_API_URL + `/signalweek/rank?year=${nowYear}&quarter=${nowQuarter}`)
      .then((res) => {
        setWinnerList(res.data.body)
      })
  }

  useEffect(() => {
    getHonor()
  }, [])

  return (
    <div className="signal-rank-page-container">
      <div className="back-lottie-left">
        <Lottie options={confettiOptions} height="100%" width={380} isClickToPauseDisabled={true} />
      </div>
      <div className="signal-rank-back">
        <div className="signal-rank-container">
          <div className="signal-rank-header">
            <div className="signal-rank-header-title">시그널위크 수상작</div>
            <div className="signal-rank-header-sub">
              <div className="signal-rank-header-now">
                {year}년 {quarter}분기
              </div>
              <div className="signal-rank-header-menu" onClick={handleToList}>
                &gt; 역대 수상작 보러가기
              </div>
            </div>
          </div>
          <div className="signal-rank-img">
            <div className="signal-rank-1st-container">
              <div className="signal-rank-1st-lottie">
                <img src={winner} alt="" style={{ width: '150px', height: '140px' }} />
              </div>
              <div className="signal-rank-1st">
                <div className="signal-rank-1st-img">
                  <img
                    className="signal-rank-1st-img-item"
                    src={winnerList[0] ? process.env.REACT_APP_API_URL + winnerList[0].projectImageUrl : ''}
                    alt="signal"
                  />
                </div>
                <div className="signal-rank-1st-subject">{winnerList[0] ? winnerList[0].subject : ''}</div>
              </div>
            </div>
            <div className="signal-rank-under-container">
              <div className="signal-rank-1st-container">
                <div className="signal-rank-1st-lottie">
                  <img src={second} alt="" style={{ width: '130px', height: '130px' }} />
                </div>
                <div className="signal-rank-1st">
                  <div className="signal-rank-1st-img">
                    <img
                      className="signal-rank-1st-img-item"
                      src={winnerList[1] ? process.env.REACT_APP_API_URL + winnerList[1].projectImageUrl : ''}
                      alt="signal"
                    />
                  </div>
                  <div className="signal-rank-1st-subject">{winnerList[1] ? winnerList[1].subject : ''}</div>
                </div>
              </div>
              <div className="signal-rank-1st-container">
                <div className="signal-rank-1st-lottie">
                  <img src={third} alt="" style={{ width: '120px', height: '130px' }} />
                </div>
                <div className="signal-rank-1st">
                  <div className="signal-rank-1st-img">
                    <img
                      className="signal-rank-1st-img-item"
                      src={winnerList[2] ? process.env.REACT_APP_API_URL + winnerList[2].projectImageUrl : ''}
                      alt="signal"
                    />
                  </div>
                  <div className="signal-rank-1st-subject">{winnerList[2] ? winnerList[2].subject : ''}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="back-lottie-right">
        <Lottie options={confettiOptions} height="100%" width={380} isClickToPauseDisabled={true} />
      </div>
    </div>
  )
}

export default SignalHonor
