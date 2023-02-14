import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ loginAuthenticated, component: Component }) => {
  //   return loginAuthenticated ? Component : <Navigate to="/" {...alert('로그인이 필요합니다.')}></Navigate>
  return loginAuthenticated ? Component : <Navigate to="/"></Navigate>
}

export default PrivateRoute
