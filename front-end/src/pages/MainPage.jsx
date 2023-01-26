import React from 'react'
import Section from 'components/Layout/Section'
import 'assets/font/font.css'
import Btn from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import 'pages/Main.css'
import logo from 'assets/image/Mainlogo.png'
import projectimg from 'assets/image/Projectpic.png'
import signalweek from 'assets/image/Signalweek.png'

const SignalBtn = styled(Btn)(({ theme }) => ({
  // fontFamily: 'dohyeon',
  fontColor: theme.palette.getContrastText('#574B9F'),
  backgroundColor: '#574B9F',
  width: '322px',
  height: '121.11px',
  fontSize: '44px',
  border: '1px solid #574B9F',
  borderRadius: 25,
  boxShadow: '0px 4px 7px rgba(0,0,0,0.25)',
  position: 'static',
  '&:hover': {
    backgroundColor: '#fff',
    borderColor: '1px solid #574B9F',
    color: '#574B9F',
  },
}))

function MainPage() {
  return (
    <div className="MainPage">
      <Section isBg={true}>
        <div className="left">
          <div className="text-wrap">
            <div className="text-item">내가 찾던 팀원</div>
            <div className="text-item">시그널에서 만나세요</div>
            <div className="btn-item">
              <SignalBtn variant="contained" href="/posting">
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
              <SignalBtn variant="contained">마이프로젝트</SignalBtn>
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
              <SignalBtn variant="contained">명예의 전당</SignalBtn>
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
