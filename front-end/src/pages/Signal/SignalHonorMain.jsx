import React, { useEffect, useState } from 'react'
import 'assets/styles/signalweekrank.css'
import Lottie from 'react-lottie'
import trophy from 'assets/lottie/trophy.json'
import second from 'assets/lottie/2rd.json'
import third from 'assets/lottie/3rd.json'
import { useNavigate } from 'react-router-dom'
import api from 'api/Api'

function SignalHonorMain() {
  const firstOptions = {
    loop: true,
    autoplay: true,
    animationData: trophy,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const secondOptions = {
    loop: true,
    autoplay: true,
    animationData: second,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const thirdOptions = {
    loop: true,
    autoplay: true,
    animationData: third,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const navigate = useNavigate()

  const handleToList = () => {
    navigate('/signal/ranklist')
  }

  const [year, setYear] = useState(0)
  const [quarter, setQuarter] = useState(0)
  const [winnerList, setWinnerList] = useState([])

  const getHonor = async () => {
    await api.get(process.env.REACT_APP_API_URL + '/signalweek/signalweekschedule').then(async (res) => {
      if (res.data.body) {
        const nowYear = res.data.body[0].year
        const nowQuarter = res.data.body[0].quarter
        setYear(nowYear)
        setQuarter(nowQuarter)

        await api
          .get(process.env.REACT_APP_API_URL + `/signalweek/rank?year=${nowYear}&quarter=${nowQuarter}`)
          .then((res) => {
            setWinnerList(res.data.body)
          })
      }
    })
  }

  useEffect(() => {
    getHonor()
  }, [])

  return (
    <div className="signal-rank-page-container">
      <div className="signal-rank-container">
        <div className="signal-rank-header">
          <div className="signal-rank-header-title">명예의 전당</div>
          <div className="signal-rank-header-sub">
            <div className="signal-rank-header-now">
              {year}년 {quarter}분기 시그널위크 수상작
            </div>
            <div className="signal-rank-header-menu" onClick={handleToList}>
              &gt; 역대 수상작 보러가기
            </div>
          </div>
        </div>
        <div className="signal-rank-img">
          <div className="signal-rank-1st-container">
            <div className="signal-rank-1st-lottie">
              <Lottie options={firstOptions} height={150} width={150} isClickToPauseDisabled={true} />
            </div>
            <div className="signal-rank-1st">
              <div className="signal-rank-1st-img">
                <img
                  className="signal-rank-1st-img-item"
                  src={winnerList[0] ? winnerList[0].projectImageUrl : ''}
                  alt="signal"
                />
              </div>
              <div className="signal-rank-1st-subject">{winnerList[0] ? winnerList[0].subject : ''}</div>
            </div>
          </div>
          <div className="signal-rank-under-container">
            <div className="signal-rank-1st-container">
              <div className="signal-rank-1st-lottie">
                <Lottie options={secondOptions} height={100} width={100} isClickToPauseDisabled={true} />
              </div>
              <div className="signal-rank-1st">
                <div className="signal-rank-1st-img">
                  <img
                    className="signal-rank-1st-img-item"
                    src={winnerList[1] ? winnerList[1].projectImageUrl : ''}
                    alt="signal"
                  />
                </div>
                <div className="signal-rank-1st-subject">{winnerList[1] ? winnerList[1].subject : ''}</div>
              </div>
            </div>
            <div className="signal-rank-1st-container">
              <div className="signal-rank-1st-lottie">
                <Lottie options={thirdOptions} height={100} width={100} isClickToPauseDisabled={true} />
              </div>
              <div className="signal-rank-1st">
                <div className="signal-rank-1st-img">
                  <img
                    className="signal-rank-1st-img-item"
                    src={winnerList[2] ? winnerList[2].projectImageUrl : ''}
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
  )
}

export default SignalHonorMain
