// 라우터 관리
// React-Router
import React, { lazy } from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import PostingRegister from 'pages/Posting/PostingRegister'
import Application from 'pages/Posting/PostingDetail'
import Board from 'pages/Board/Board'
import Qna from 'pages/QnA/Qna'

const Posting = lazy(() => import('./pages/Posting/Posting'))
const ApplyRegister = lazy(() => import('./pages/Apply/ApplyRegister'))
const ApplyDetail = lazy(() => import('./pages/Apply/ApplyDetail'))
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
          <Route path="/applydetail" element={<ApplyDetail />} />
          <Route path="*" element={<div style={{ fontSize: '300px' }}>주소 똑바로 쳐라 ^^7</div>} />
          <Route path="/board" element={<Board />} />
          <Route path="/qna" element={<Qna />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
