// 라우터 관리
// React-Router
import React from 'react'
import Header from 'components/Layout/Header'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import Regist from 'pages/user/Regist'
import PostingRegister from 'pages/Posting/PostingRegister'
import Notice from 'pages/Notice/Notice'
import NoticeDetail from 'pages/Notice/NoticeDetail'
import NoticeRegist from 'pages/Notice/NoticeRegist'
import NoticeModify from 'pages/Notice/NoticeModify'
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
import KakaoPay from './components/common/KakaoPay'
import PostingDetail from 'pages/Posting/PostingDetail'
import PostingModify from 'pages/Posting/PostingModify'
import Beforemeeting from 'pages/Apply/Beforemeeting'
import ProjectHeader from './pages/Project/ProjectHeader'
import EndProject from './pages/Project/EndProject'
// import TeamMaintain from 'components/Project/TeamMaintain'
// import ProjectMaintain from 'components/Project/ProjectMaintain'
import ScrollTop from 'components/common/ScrollTop'
import SignalList from 'pages/Signal/SignalList'
import Signalregister from 'pages/Signal/Signalregister'
import SignalDetail from 'pages/Signal/SignalDetail'
import SignalHonor from 'pages/Signal/SignalHonor'
import SignalHonorMain from 'pages/Signal/SignalHonorMain'
import SignalHonorList from 'pages/Signal/SignalHonorList'

import AdminBalckList from 'pages/Admin/AdminBlackList'
import AdminProject from 'pages/Admin/AdminProject'
import AdminSignalWeek from 'pages/Admin/AdminSignalWeek'
import OpenprofileDetail from 'pages/Openprofile/OpenprofileDetail'
import ProjectMeeting from 'pages/Project/ProjectMeeting'
import Openprofile from 'pages/Openprofile/Openprofile'
import Footer from 'components/Layout/Footer'

import Fourzerofour from 'pages/fourzerofour'
import PrivateRoute from 'components/Auth/PrivateRoute'
import AdminRoute from 'components/Auth/AuthRoute'
import TeamBung from 'pages/TeamBung'

// const Posting = lazy(() => import('./pages/Posting/Posting'))
// const MyProject = lazy(() => import('./pages/Project/MyProject'))
// const PostingDetail = lazy(() => import('./pages/Posting/PostingDetail'))
// const PostingRegister = lazy(() => import('./pages/Posting/PostingRegister'))
// usenavigate lazy 안되는듯 ?// const Board = lazy(() => import('./pages/Board/Board'))
// const Qna = lazy(() => import('./pages/QnA/Qna'))

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const FooterLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const token = sessionStorage.getItem('accessToken')
const auth = sessionStorage.getItem('admin')

function App() {
  return (
    <div className="root-wrap">
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/regist" element={<Regist />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/project" element={<ProjectHeader />} />
            <Route path="/endproject" element={<EndProject />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/noticeDetail" element={<NoticeDetail />} />
            <Route path="/qna" element={<Qna />} />
            <Route path="/qnaDetail" element={<QnaDetail />} />
            <Route path="/myprofile/kakaoPay/:status" element={<KakaoPay />} />
            <Route path="/signal" element={<SignalList />} />
            <Route path="/signaldetail" element={<SignalDetail />} />
            <Route path="/signal/rank" element={<SignalHonor />} />
            <Route path="/signal/rankMain" element={<SignalHonorMain />} />
            <Route path="/signal/ranklist" element={<SignalHonorList />} />
            <Route path="/openprofile" element={<Openprofile />} />
            <Route path="/openprofiledetail" element={<OpenprofileDetail />} />
            <Route path="/teamBung" element={<TeamBung />} />
            {/* <Route path="/applymodify" element={<ApplyModify />} /> */}
            {/* <Route path="/postingmodify" element={<PostingModify />} /> */}
            {/* <Route path="/applyregister" element={<ApplyRegister />} /> */}
            {/* <Route path="/postingregister" element={<PostingRegister />} /> */}
            {/* <Route path="/posting/:id" element={<PostingDetail />} /> */}
            {/* <Route path="/teamMaintain" element={<TeamMaintain />} /> */}
            {/* <Route path="/projectMaintain" element={<ProjectMaintain />} /> */}
            {/* <Route path="/myproject" element={<MyProject />} /> */}
            {/* <Route path="/noticeRegist" element={<NoticeRegist />} /> */}
            {/* <Route path="/noticeModify" element={<NoticeModify />} /> */}
            {/* <Route path="/qnaRegist" element={<QnaRegist />} /> */}
            {/* <Route path="/qnaModify" element={<QnaModify />} /> */}
            {/* <Route path="/myprofile" element={<MyProfile />} /> */}
            {/* <Route path="/signalregister" element={<Signalregister />} /> */}
            {/* 
            
            
            */}
            {/* 로그인 권한 필요 페이지 */}
            <Route path="/myprofile" element={<PrivateRoute component={<MyProfile />} loginAuthenticated={token} />} />
            <Route path="/myproject" element={<PrivateRoute component={<MyProject />} loginAuthenticated={token} />} />
            <Route
              path="/posting/:id"
              element={<PrivateRoute component={<PostingDetail />} loginAuthenticated={token} />}
            />
            <Route
              path="/postingregister"
              element={<PrivateRoute component={<PostingRegister />} loginAuthenticated={token} />}
            />
            <Route
              path="/postingmodify"
              element={<PrivateRoute component={<PostingModify />} loginAuthenticated={token} />}
            />
            <Route
              path="/signalregister"
              element={<PrivateRoute component={<Signalregister />} loginAuthenticated={token} />}
            />
            <Route
              path="/applyregister"
              element={<PrivateRoute component={<ApplyRegister />} loginAuthenticated={token} />}
            />
            <Route
              path="/applymodify"
              element={<PrivateRoute component={<ApplyModify />} loginAuthenticated={token} />}
            />
            <Route
              path="/applydetail"
              element={<PrivateRoute component={<ApplyDetail />} loginAuthenticated={token} />}
            />
            <Route
              path="/teamBuilding"
              element={<PrivateRoute component={<TeamBuilding />} loginAuthenticated={token} />}
            />
            <Route path="/qnaRegist" element={<PrivateRoute component={<QnaRegist />} loginAuthenticated={token} />} />
            <Route path="/qnaModify" element={<PrivateRoute component={<QnaModify />} loginAuthenticated={token} />} />
            {/*

            */}
            {/* 관리자 권한 필요 페이지 */}
            <Route
              path="/adminproject"
              element={<AdminRoute component={<AdminProject />} loginAuthenticated={token} adminAuthenticated={auth} />}
            />
            <Route
              path="/adminsignalweek"
              element={
                <AdminRoute component={<AdminSignalWeek />} loginAuthenticated={token} adminAuthenticated={auth} />
              }
            />
            <Route
              path="/adminblacklist"
              element={
                <AdminRoute component={<AdminBalckList />} loginAuthenticated={token} adminAuthenticated={auth} />
              }
            />
            <Route
              path="/noticeRegist"
              element={<AdminRoute component={<NoticeRegist />} loginAuthenticated={token} adminAuthenticated={auth} />}
            />
            <Route
              path="/noticeModify"
              element={<AdminRoute component={<NoticeModify />} loginAuthenticated={token} adminAuthenticated={auth} />}
            />

            {/* 
            
            
            */}
            {/* 에러페이지 */}
            <Route path="*" element={<Fourzerofour />} />
          </Route>

          <Route element={<FooterLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/beforemeeting" element={<Beforemeeting />} />
            <Route path="/projectmeeting" element={<ProjectMeeting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
