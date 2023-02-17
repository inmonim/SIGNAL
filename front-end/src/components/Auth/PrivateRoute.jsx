import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ loginAuthenticated, component: Component }) => {
  return loginAuthenticated ? Component : <Navigate to="/"></Navigate>
}

export default PrivateRoute
