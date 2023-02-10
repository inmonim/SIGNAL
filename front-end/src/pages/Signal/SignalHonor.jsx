import React from 'react'
import 'assets/styles/signalweekrank.css'
import Lottie from 'react-lottie'
import trophy from 'assets/lottie/trophy.json'
import second from 'assets/lottie/2rd.json'
import third from 'assets/lottie/3rd.json'

function SignalHonor(props) {
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
  return (
    <div className="signal-rank-page-container">
      <div className="signal-rank-container">
        <div className="signal-rank-header">
          <div className="signal-rank-header-title">명예의 전당</div>
        </div>
        <div className="signal-rank-img">
          <Lottie options={firstOptions} height={600} width={600} isClickToPauseDisabled={true} />
          <Lottie options={secondOptions} height={600} width={600} isClickToPauseDisabled={true} />
          <Lottie options={thirdOptions} height={600} width={600} isClickToPauseDisabled={true} />
        </div>
      </div>
    </div>
  )
}

export default SignalHonor
