// 라우터 관리
// React-Router
import React, { lazy } from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import PostingRegister from 'pages/Posting/PostingRegister'
import Application from 'pages/Posting/PostingDetail'
import Notice from 'pages/Notice/Notice'
import NoticeDetail from 'pages/Notice/NoticeDetail'
import Qna from 'pages/QnA/Qna'
import QnaDetail from 'pages/QnA/QnaDetail'
import QnaRegist from 'pages/QnA/QnaRegist'
import QnaModify from 'pages/QnA/QnaModify'

const Posting = lazy(() => import('./pages/Posting/Posting'))
const ApplyRegister = lazy(() => import('./pages/Apply/ApplyRegister'))
const ApplyDetail = lazy(() => import('./pages/Apply/ApplyDetail'))
const ApplyModify = lazy(() => import('./pages/Apply/ApplyModify'))
// const PostingDetail = lazy(() => import('./pages/Posting/PostingDetail'))
// const PostingRegister = lazy(() => import('./pages/Posting/PostingRegister'))
// usenavigate lazy 안되는듯 ?// const Board = lazy(() => import('./pages/Board/Board'))
// const Qna = lazy(() => import('./pages/QnA/Qna'))

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/postingregister" element={<PostingRegister />} />
          <Route path="/posting/:id" element={<Application />} />
          <Route path="/applyregister" element={<ApplyRegister />} />
          <Route path="/applymodify" element={<ApplyModify />} />
          <Route path="/applydetail" element={<ApplyDetail />} />
          <Route path="*" element={<div style={{ fontSize: '300px' }}>주소 똑바로 쳐라 ^^7</div>} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/noticeDetail" element={<NoticeDetail />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/qnaDetail" element={<QnaDetail />} />
          <Route path="/qnaRegist" element={<QnaRegist />} />
          <Route path="/qnaModify" element={<QnaModify />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
