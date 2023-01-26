// 라우터 관리
// React-Router
import React, { lazy } from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'

const Posting = lazy(() => import('./pages/Posting/Posting'))
const Apply = lazy(() => import('./pages/Apply/Apply'))
const Application = lazy(() => import('./pages/Apply/Application'))

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
