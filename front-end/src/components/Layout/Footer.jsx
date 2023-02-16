import React from 'react'
import 'components/Layout/Footer.css'
import { Link } from 'react-router-dom'
import logo from 'assets/image/Navlogo.png'
import gitlabLogo from 'assets/image/gitlab-logo.png'
import notionLogo from 'assets/image/Notion-logo.png'
import teamlogo from 'assets/image/fish-bread-logo2.png'

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrap">
        <div className="footer-logo">
          <Link to="/">
            <img style={{ height: '55px', width: '112px' }} src={logo} alt="logo" />
          </Link>
        </div>
        <div className="footer-link-wrap">
          <Link to="https://lab.ssafy.com/s08-webmobile1-sub2/S08P12E207" target="_nblank">
            <img className="footer-link-logo" src={gitlabLogo} alt="logo" />
          </Link>
        </div>
        <div className="footer-link-wrap">
          <Link to="https://www.notion.so/2-f929dd7b709a407099007eeeba245589" target="_nblank">
            <img className="footer-link-logo-sm" src={notionLogo} alt="logo" />
          </Link>
        </div>
        <div className="footer-link-wrap">
          <div className="footer-logo">
            <img style={{ height: '54px', width: '94px' }} src={teamlogo} alt="logo" />
          </div>
        </div>

        <div className="footer-copyright-wrap">
          <u className="footer-copyright-title">.Copyright 2023. fishbread All right reserved.</u>
          <p className="footer-copyright-content">
            본 서비스는 1366*768 이상 해상도에 최적화되어 있으며 Google Chrome 브라우저를 권장합니다
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
