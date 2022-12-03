import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const data = window?.localStorage?.getItem('user')
  return data ? <Navigate to="/" /> : children
}

export default ProtectedRoute
