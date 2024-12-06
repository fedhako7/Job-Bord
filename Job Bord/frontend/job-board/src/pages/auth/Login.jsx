import React, { useRef, useState } from 'react';
import axios from '../../axios/Axios'
import { ClipLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Login() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [fieldError, setFieldError] = useState('')
  const [dbError, setDbError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const email = useRef('')
  const password = useRef('')
  const terms = useRef(false)
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setDbError(''), setFieldError('')
    const currEmail = email.current.value
    const currPassword = password.current.value

    // Check fields
    if (!currEmail || !currPassword ){
      return setFieldError('All fields are requered.')
    }
    if(currPassword && currPassword.length < 8){
      return setFieldError("Password length can't be less than 8 characters.")
    }

    try {
      setIsLoading(true)
      const { data } =  await axios.post("/auth/login", {
        email: currEmail,
        password: currPassword,
      })
      localStorage.setItem("token", data.token)
      localStorage.setItem("user_id", data.user_id)
      setIsLoading(false)
      navigate("/")

    } catch (error) {
      setIsLoading(false)
      setDbError(error.response?.data?.msg || error.message)
      console.log(error)
    }
  }

  const forgotPassword = () => {

  }
  return (
    <section className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col gap-6 items-center bg-gray-300 shadow-lg rounded-lg p-8 h-3/5 max-w-md">
        {/* Header */}
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-800">Login to your Account</h1>
        <p className="text-m lg:text-xl text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          {/* Email and Password */}
          <input
            type="email"
            placeholder="Email"
            ref={email}
            className="h-14 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <div className='flex'>
              <input
              type={ showPass ? "text" : "password"}

              placeholder="Password"
              ref={password}
              className="h-14 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button type="button" onClick={() => {setShowPass(prev => !prev)}} className='-ml-8'>
              { showPass ?
                < VisibilityOutlinedIcon /> : < VisibilityOffOutlinedIcon />
              }
              </button>
            </div>
          {fieldError && <p className='text-center bold italic text-red-600'>{fieldError}</p>}
          {dbError && <p className='text-center italic bold text-red-600'>{dbError}</p>}

          {/* Remember me and Forgot password */}
          <div className='flex items-center gap-4 justify-center'>
            <p className="lg:text-2xl text-gray-600"> <input type="checkbox" ref={terms} className="mr-2" />Remember me </p>
            <button
              onClick={forgotPassword}
              type='button'
              className='w-44 h-10  bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition'>
                Forgot Password
            </button>
            </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <><ClipLoader size={20} color='white'/> Please wait...</> : <>Login</>}

          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
