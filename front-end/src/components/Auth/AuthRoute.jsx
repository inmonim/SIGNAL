import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ loginAuthenticated, adminAuthenticated, component: Component }) => {
  return loginAuthenticated && adminAuthenticated ? Component : <Navigate to="/"></Navigate>
}

export default AuthRoute
