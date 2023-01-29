// 라우터 관리
// React-Router
import React, { lazy } from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import Board from 'pages/Board/Board'
import Qna from 'pages/QnA/Qna'

const Posting = lazy(() => import('./pages/Posting/Posting'))
const PostingDetail = lazy(() => import('./pages/Posting/PostingDetail'))
const Apply = lazy(() => import('./pages/Apply/Apply'))
const Application = lazy(() => import('./pages/Apply/Application'))
// const Board = lazy(() => import('./pages/Board/Board'))
// const Qna = lazy(() => import('./pages/QnA/Qna'))

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/posting/:postingSeq" element={<PostingDetail />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/application" element={<Application />} />
          <Route path="/board" element={<Board />} />
          <Route path="/qna" element={<Qna />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
