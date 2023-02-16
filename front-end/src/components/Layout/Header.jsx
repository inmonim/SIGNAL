import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from 'assets/image/Navlogo.png'
import 'components/Layout/Header.css'
import useDetectClose from 'hooks/useDetectClose'
import LoginModal from 'components/LoginModal'
import LetterModal from 'components/Letter/LetterModal'
import * as D from './DropDownStyle'
import Badge from '@mui/material/Badge'
import EmailIcon from '@mui/icons-material/Email'
import teamlogo from 'assets/image/fish-bread-logo2.png'
import api from 'api/Api'

function Header() {
  const [postingIsOpen, postingRef, postingHandler] = useDetectClose(false)
  const [signalWeekIsOpen, signalWeekRef, signalWeekHandler] = useDetectClose(false)
  const [nameIsOpen, nameRef, nameHandler] = useDetectClose(false)

  const [open, setOpen] = useState(false) // 로그인
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [letterOpen, setLetterOpen] = useState(false)
  const handleLetterOpen = () => setLetterOpen(true)
  const handleLetterClose = () => setLetterOpen(false)

  const [letterCnt, setLetterCnt] = useState(0)
  const [isLogin, setIsLogin] = useState(false)
  const isAdmin = sessionStorage.getItem('admin')

  useEffect(() => {
    // 로컬 스토리지에 refreshToken 이 존재하고 로그인 상태가 아니면 한번 쫘악 긁어옴 (= 자동로그인 상태)
    if (localStorage.getItem('refreshToken') !== null && sessionStorage.getItem('refreshToken') === null) {
      // 토큰 및 유저 정보 (엑세스 토큰 재발급, 리프래시 토큰만 넣어서 요청)
      api
        .post(
          process.env.REACT_APP_API_URL + '/auth/refresh',
          {},
          {
            headers: {
              RefreshToken: 'Bearer ' + localStorage.getItem('refreshToken'),
            },
          }
        )
        .then((res) => {
          sessionStorage.setItem('accessToken', res.data.body.accessToken)
          sessionStorage.setItem('refreshToken', res.data.body.refreshToken)
          sessionStorage.setItem('userEmail', res.data.body.email)
          sessionStorage.setItem('username', res.data.body.name)
          sessionStorage.setItem('nickname', res.data.body.nickname)
          sessionStorage.setItem('userSeq', res.data.body.userSeq)
          sessionStorage.setItem('admin', res.data.body.admin)
          setIsLogin(true)
        })
        .catch((e) => {
          console.log(e)
          return e.message
        })
    }
    if (sessionStorage.getItem('userSeq') !== null) {
      setIsLogin(true)
      api.get(process.env.REACT_APP_API_URL + '/letter/read/' + sessionStorage.getItem('userSeq')).then((res) => {
        setLetterCnt(res.data.body.count)
      })
    }
  })

  const navigate = useNavigate()

  const onLogout = () => {
    api
      .post(
        process.env.REACT_APP_API_URL + '/auth/logout',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
            RefreshToken: 'Bearer ' + sessionStorage.getItem('refreshToken'),
          },
        }
      )
      .then((data) => {
        console.log('로그아웃 성공')
        console.log(data)
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.removeItem('userEmail')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('nickname')
        sessionStorage.removeItem('userSeq')
        sessionStorage.removeItem('admin')
        localStorage.removeItem('refreshToken')
        setIsLogin(false)
        // setIsAdmin('false')
        navigate(`/`)
      })
      .catch((e) => {
        alert('다시 시도')
        return e.message
      })
  }

  if (window.location.pathname === '/beforemeeting') return null
  else if (window.location.pathname === '/projectmeeting') return null
  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <div className="header-logo">
            <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
              <img style={{ height: '95px', width: '188.26px' }} src={logo} alt="logo" />
            </Link>
          </div>
          {isAdmin === 'false' || isAdmin === null ? (
            // 사용자 헤더
            <ul>
              <li>
                <D.DropdownContainer>
                  <D.NavBtn onClick={postingHandler} ref={postingRef}>
                    팀원 모집
                  </D.NavBtn>
                  <D.Down isDropped={postingIsOpen}>
                    <D.Ul>
                      <D.Li>
                        <D.LinkWrapper href="/posting">공고</D.LinkWrapper>
                      </D.Li>
                      <D.Li>
                        <D.LinkWrapper href="/openprofile">오픈 프로필</D.LinkWrapper>
                      </D.Li>
                    </D.Ul>
                  </D.Down>
                </D.DropdownContainer>
              </li>
              {isLogin ? (
                <li>
                  <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/myproject">
                    마이프로젝트
                  </Link>
                </li>
              ) : (
                <li></li>
              )}
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/notice">
                  공지사항
                </Link>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/qna">
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
                        <D.LinkWrapper href="/signal">프로젝트 보기</D.LinkWrapper>
                      </D.Li>
                      <D.Li>
                        <D.LinkWrapper href="/signal/rankMain">명예의 전당</D.LinkWrapper>
                      </D.Li>
                    </D.Ul>
                  </D.Down>
                </D.DropdownContainer>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/teamBung">
                  <img src={teamlogo} alt="" style={{ width: '50px', height: '30px' }} />
                </Link>
              </li>
            </ul>
          ) : (
            // 관리자 헤더
            <ul>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/adminproject">
                  프로젝트 관리
                </Link>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/adminsignalweek">
                  시그널위크 관리
                </Link>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/adminblacklist">
                  블랙리스트 관리
                </Link>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/notice">
                  공지사항
                </Link>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/qna">
                  Q & A
                </Link>
              </li>
              <li>
                <Link style={{ margin: '0px 20px' }} className="header-nav-item" to="/teamBung">
                  <img src={teamlogo} alt="" style={{ width: '50px', height: '30px' }} />
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="header-right-wrap">
          {isLogin ? (
            <ul>
              <li>
                <div style={{ cursor: 'pointer' }} className="header-nav-item" onClick={handleLetterOpen}>
                  <Badge
                    badgeContent={letterCnt}
                    color="error"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    overlap="circular"
                  >
                    <EmailIcon color="black" sx={{ height: '48px', width: '51px' }} />
                  </Badge>
                </div>
                <LetterModal open={letterOpen} onClose={handleLetterClose}></LetterModal>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <D.DropdownContainer>
                  <D.NavBtn onClick={nameHandler} ref={nameRef}>
                    {sessionStorage.getItem('nickname')}님
                  </D.NavBtn>
                  <D.Down isDropped={nameIsOpen}>
                    <D.Ul>
                      {isAdmin === 'false' || isAdmin === null ? (
                        <D.Li>
                          <D.LinkWrapper href="/myprofile">마이페이지</D.LinkWrapper>
                        </D.Li>
                      ) : (
                        <></>
                      )}
                      <D.Li>
                        <D.LinkWrapper onClick={onLogout}>로그아웃</D.LinkWrapper>
                      </D.Li>
                    </D.Ul>
                  </D.Down>
                </D.DropdownContainer>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <div style={{ cursor: 'pointer' }} className="header-nav-item" onClick={handleOpen}>
                  로그인
                </div>
                <LoginModal open={open} onClose={handleClose}></LoginModal>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
