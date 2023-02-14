import React, { useRef, useState } from 'react'
import Section from 'components/Layout/Section'
import 'assets/font/font.css'
import 'pages/Main.css'
import logo from 'assets/image/Mainlogo.png'
// import logo from 'assets/image/Signal.gif'npm i react-lottie
import projectimg from 'assets/image/Projectpic.png'
import signalweek from 'assets/image/Signalweek.png'
import SignalBtn from 'components/common/SignalBtn'
import { FullPage, Slide } from 'react-full-page'
import Lottie from 'react-lottie'
import fanfare from 'assets/lottie/fanfare.json'
import heartbeat from 'assets/lottie/heartbeat.json'
import sparkle from 'assets/lottie/sparkle.json'

function MainPage() {
  const main1 = {
    loop: true,
    autoplay: true,
    animationData: heartbeat,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const main2 = {
    loop: true,
    autoplay: true,
    animationData: fanfare,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const main3 = {
    loop: true,
    autoplay: true,
    animationData: sparkle,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const fullPageRef = useRef()
  const handleChange = ({ from, to }) => {
    if ((from === 0 && to === 1) || (from === 2 && to === 1)) {
      setShow2(true)
    } else {
      setShow2(false)
    }
    if (from === 1 && to === 2) {
      setShow3(true)
    } else {
      setShow3(false)
    }
  }

  return (
    <div className="MainPage">
      <FullPage ref={fullPageRef} afterChange={handleChange} controls controlsProps={{ className: 'slide-navigation' }}>
        <Slide>
          <Section isBg={true}>
            <div className="left">
              <div className="text-wrap">
                <div className="text-item">내가 찾던 팀원</div>
                <div className="text-item">시그널에서 만나세요</div>
                <div className="signal-img">
                  <Lottie options={main1} height={100} width={400} isClickToPauseDisabled={true} />
                </div>
                <div className="btn-item">
                  <SignalBtn
                    sigwidth="322px"
                    sigheight="121px"
                    sigfontsize="44px"
                    sigborderradius={25}
                    sigmargin="30px auto"
                    href="/posting"
                  >
                    지원하러 가기
                  </SignalBtn>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="img-wrap">
                <img style={{ width: '750px', height: '420px' }} src={logo} alt="logo" />
              </div>
            </div>
          </Section>
        </Slide>
        <Slide>
          <Section>
            <div className="left">
              <div className="img-wrap">
                <div className="img-item">
                  {show2 ? (
                    <div className="fanfare-img">
                      <Lottie options={main2} height={600} width={600} isClickToPauseDisabled={true} />
                    </div>
                  ) : (
                    <></>
                  )}
                  <img className="main-2-img" src={projectimg} alt="projectimg" />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="text-wrap">
                <div className="text-item">프로젝트를</div>
                <div className="text-item">편하게 진행하세요</div>
                <div className="btn-item">
                  <SignalBtn
                    sigwidth="322px"
                    sigheight="121px"
                    sigfontsize="44px"
                    sigborderradius={25}
                    sigmargin="50px auto"
                    href="/myproject"
                  >
                    마이프로젝트
                  </SignalBtn>
                </div>
              </div>
            </div>
          </Section>
        </Slide>
        <Slide>
          <Section isBg={true}>
            <div className="left">
              <div className="text-wrap">
                <div className="text-item">여러분의 프로젝트를</div>
                <div className="text-item">평가받아보세요</div>
                <div className="btn-item">
                  <SignalBtn
                    sigwidth="322px"
                    sigheight="121px"
                    sigfontsize="44px"
                    sigborderradius={25}
                    href="/signal/rankMain"
                  >
                    명예의 전당
                  </SignalBtn>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="img-wrap">
                <div className="img-item">
                  {show3 ? (
                    <div className="sparkle-img">
                      <Lottie options={main3} height={700} width={870} isClickToPauseDisabled={true} />
                    </div>
                  ) : (
                    <></>
                  )}
                  <img style={{ width: '881px', height: '283px' }} src={signalweek} alt="signalweek" />
                </div>
              </div>
            </div>
          </Section>
        </Slide>
      </FullPage>
    </div>
  )
}
export default MainPage
