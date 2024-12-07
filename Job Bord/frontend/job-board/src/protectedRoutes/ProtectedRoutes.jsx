import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/Axios'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
  const token = localStorage.getItem("token")
  const [authenticated, setAuthenticated] = useState(null)
  const navigate = useNavigate()

  const checkUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/check', { headers: { authorization: 'Bearer ' + token } })
        setAuthenticated(true)
    } catch (error) {
        console.log(error)
        setAuthenticated(false)
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

  if (authenticated === null){
    return <div>Loading...</div>
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