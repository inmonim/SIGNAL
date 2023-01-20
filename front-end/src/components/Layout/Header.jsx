import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'assets/image/Nav-logo.png'
import 'components/Layout/Header.css'
import useDetectClose from 'hooks/useDetectClose'
import * as D from './DropDownStyle'
// import BasicMenu from './BasicMenu'

function Header() {
  const [postingIsOpen, postingRef, postingHandler] = useDetectClose(false)
  const [signalWeekIsOpen, signalWeekRef, signalWeekHandler] = useDetectClose(false)
  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <div className="header-logo">
            <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
              <img style={{ height: '95px', width: '188.26px' }} src={logo} alt="logo" />
            </Link>
          </div>
          <ul>
            <li>
              <D.DropdownContainer>
                <D.NavBtn onClick={postingHandler} ref={postingRef}>
                  팀원 모집
                </D.NavBtn>
                <D.Down isDropped={postingIsOpen}>
                  <D.Ul>
                    <D.Li>
                      <D.LinkWrapper href="/">공고</D.LinkWrapper>
                    </D.Li>
                    <D.Li>
                      <D.LinkWrapper href="/">오픈 프로필</D.LinkWrapper>
                    </D.Li>
                  </D.Ul>
                </D.Down>
              </D.DropdownContainer>
              {/* <Link className="header-nav-item" to="/">
                팀원 모집
              </Link> */}
              {/* <BasicMenu></BasicMenu> */}
            </li>
            <li>
              <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/">
                마이프로젝트
              </Link>
            </li>
            <li>
              <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/">
                공지사항
              </Link>
            </li>
            <li>
              <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/">
                Q & A
              </Link>
            </li>
            <li>
              <D.DropdownContainer>
                <D.NavBtn onClick={signalWeekHandler} ref={signalWeekRef}>
                  시그널위크
                </D.NavBtn>
                <D.Down isDropped={signalWeekIsOpen}>
                  <D.Ul>
                    <D.Li>
                      <D.LinkWrapper href="/">프로젝트 보기</D.LinkWrapper>
                    </D.Li>
                    <D.Li>
                      <D.LinkWrapper href="/">명예의 전당</D.LinkWrapper>
                    </D.Li>
                  </D.Ul>
                </D.Down>
              </D.DropdownContainer>
              {/* <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/">
                시그널위크
              </Link> */}
            </li>
          </ul>
        </div>
        <div className="header-right-wrap">
          <ul>
            <li>
              <Link className="header-nav-item" to="/">
                로그인
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
