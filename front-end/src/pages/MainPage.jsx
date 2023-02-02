import React, { useEffect, useRef, useState } from 'react'
import Section from 'components/Layout/Section'
import 'assets/font/font.css'
import 'pages/Main.css'
import logo from 'assets/image/Mainlogo.png'
import projectimg from 'assets/image/Projectpic.png'
import signalweek from 'assets/image/Signalweek.png'
import SignalBtn from 'components/common/SignalBtn'
import Dots from './Dots'

const DIVIDER_HEIGHT = 5

function MainPage() {
  const outerDivRef = useRef()
  const [scrollIndex, setScrollIndex] = useState(1)
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault()
      const { deltaY } = e
      const { scrollTop } = outerDivRef.current
      const pageHeight = window.innerHeight
      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log('1페이지, down')
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(2)
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log('2페이지, down')
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(3)
        } else {
          console.log('현재 3페이지, down')
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(3)
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log('현재 1페이지, up')
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(1)
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log('현재 2페이지, up')
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(1)
        } else {
          console.log('현재 3페이지, up')
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          })
          setScrollIndex(2)
        }
      }
    }
    const outerDivRefCurrent = outerDivRef.current
    outerDivRefCurrent.addEventListener('wheel', wheelHandler)
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler)
    }
  })
  return (
    <div className="MainPage" ref={outerDivRef}>
      <Dots scrollIndex={scrollIndex} />
      <Section isBg={true}>
        <div className="left">
          <div className="text-wrap">
            <div className="text-item">내가 찾던 팀원</div>
            <div className="text-item">시그널에서 만나세요</div>
            <div className="btn-item">
              <SignalBtn sigwidth="322px" sigheight="121px" sigfontsize="44px" sigborderradius={25} href="/posting">
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
      <Section>
        <div className="left">
          <div className="img-wrap">
            <div className="img-item">
              <img style={{ width: '654px', height: '540px' }} src={projectimg} alt="projectimg" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="text-wrap">
            <div className="text-item">프로젝트를</div>
            <div className="text-item">편하게 진행하세요</div>
            <div className="btn-item">
              <SignalBtn sigwidth="322px" sigheight="121px" sigfontsize="44px" sigborderradius={25}>
                마이프로젝트
              </SignalBtn>
            </div>
          </div>
        </div>
      </Section>
      <Section isBg={true}>
        <div className="left">
          <div className="text-wrap">
            <div className="text-item">여러분의 프로젝트를</div>
            <div className="text-item">평가받아보세요</div>
            <div className="btn-item">
              <SignalBtn sigwidth="322px" sigheight="121px" sigfontsize="44px" sigborderradius={25}>
                명예의 전당
              </SignalBtn>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="img-wrap">
            <div className="img-item">
              <img style={{ width: '881px', height: '283px' }} src={signalweek} alt="signalweek" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
export default MainPage
