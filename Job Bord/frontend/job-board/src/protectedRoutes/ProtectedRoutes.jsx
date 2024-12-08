import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/Axios'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children, allowedRoles = []}) {
  const token = localStorage.getItem("token")
  const user_id = parseInt(localStorage.getItem("user_id"))
  const [authenticated, setAuthenticated] = useState(null)
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  const checkUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/check', { params:{ user_id }, headers: { authorization: 'Bearer ' + token } })
        setUserRole(response?.data?.role)
        setAuthenticated(true)
    } catch (error) {
        console.log(error)
        setAuthenticated(false)
        navigate("/login")
    }
  }

  useEffect(() => {
    if (token) {
        checkUser()
    }
    else {
        setAuthenticated(false)
        navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if ( (authenticated === false) || (authenticated && !allowedRoles.includes(userRole))) {
      navigate("/");
    }
  }, [authenticated, userRole, allowedRoles, navigate]);

  if (authenticated === null){
    return <div>Loading...</div>
  }

  if (authenticated && !allowedRoles.includes(userRole)) {
    return null;
  }

  return ( 
  <>
  {
        authenticated ? children : null
    }
  </>
  )
}

export default ProtectedRoutes