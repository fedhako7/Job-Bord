import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/Axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Landing from '../pages/landing/Landing'

function ProtectedRoutes({children, allowedRoles = []}) {
  const token = localStorage.getItem("token")
  const user_id = parseInt(localStorage.getItem("user_id"))
  const [authenticated, setAuthenticated] = useState(null)
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  const checkUser = async () => {
    if (!token || !user_id) {
      setAuthenticated(false);
      console.log('[ProtectedRoutes] No token or user ID');
      return;
    }

    try {
      const response = await axiosInstance.get('/auth/check', { params: { user_id }, headers: { authorization: 'Bearer ' + token } })
      setUserRole(response?.data?.role)
      setAuthenticated(true)
    } catch (error) {
      console.log(error)
      setAuthenticated(false)
      navigate("/login")
    }
  }

  useEffect(() => {
    if ([Register, Login, Landing].includes(children?.type)) {
      setAuthenticated(true);
      return;
    }
    if (token) {
      checkUser()
    }
    else {
      setAuthenticated(false)
      navigate('/login')
    }
  }, [token])

  if (authenticated === null) {
    return <div>Loading...</div>
  }

  if (authenticated && !allowedRoles.includes(userRole)) {
    return null;
  }

  return (
    <>
      {
        authenticated ? children : <Navigate to="/login" />
      }
    </>
  )
}

export default ProtectedRoutes
