// 라우터 관리
// React-Router
import React from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import PostingRegister from 'pages/Posting/PostingRegister'
import Notice from 'pages/Notice/Notice'
import NoticeDetail from 'pages/Notice/NoticeDetail'
import Qna from 'pages/QnA/Qna'
import QnaDetail from 'pages/QnA/QnaDetail'
import QnaRegist from 'pages/QnA/QnaRegist'
import QnaModify from 'pages/QnA/QnaModify'
import ApplyDetail from 'pages/Apply/ApplyDetail'
import TeamBuilding from 'pages/Project/TeamBuilding'
import ApplyRegister from 'pages/Apply/ApplyRegister'
import MyProfile from 'pages/user/MyProfile'
import ApplyModify from 'pages/Apply/ApplyModify'
import { Posting } from 'pages/Posting/Posting'
import MyProject from './pages/Project/MyProject'
import PostingDetail from 'pages/Posting/PostingDetail'
import PostingModify from 'pages/Posting/PostingModify'
import Beforemeeting from 'pages/Apply/Beforemeeting'
import ProjectDetail from './pages/Project/ProjectDetail'
import TeamMaintain from 'pages/Project/TeamMaintain'

// const Posting = lazy(() => import('./pages/Posting/Posting'))
// const MyProject = lazy(() => import('./pages/Project/MyProject'))
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
          <Route path="/posting/:id" element={<PostingDetail />} />
          <Route path="/postingModify" element={<PostingModify />} />
          <Route path="/applyregister" element={<ApplyRegister />} />
          <Route path="/applymodify" element={<ApplyModify />} />
          <Route path="/applydetail" element={<ApplyDetail />} />
          <Route path="/teambuilding" element={<TeamBuilding />} />
          <Route path="/projectDetail" element={<ProjectDetail />} />
          <Route path="/myproject" element={<MyProject />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/noticeDetail" element={<NoticeDetail />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/qnaDetail" element={<QnaDetail />} />
          <Route path="/qnaRegist" element={<QnaRegist />} />
          <Route path="/qnaModify" element={<QnaModify />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/beforemeeting" element={<Beforemeeting />} />
          <Route path="/TeamMaintain" element={<TeamMaintain />} />
          <Route path="*" element={<div style={{ fontSize: '300px' }}>주소 똑바로 쳐라 ^^7</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
