// 라우터 관리
// React-Router
import React, { lazy } from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'

const Posting = lazy(() => import('./pages/Posting/Posting'))
const PostingDetail = lazy(() => import('./pages/Posting/PostingDetail'))

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/posting/:postingSeq" element={<PostingDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
