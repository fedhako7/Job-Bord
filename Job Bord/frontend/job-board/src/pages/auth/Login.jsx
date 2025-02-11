import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from '../../axios/Axios'
import { useNavigate } from 'react-router-dom';
import { frequentDatas } from '../../contextProvider/ContextProvider'
import FieldComponent from './smallComponents/fieldComponent';
import ButtonComponent from '../landing/smallComponents/ButtonComponent';
import HeadingComponent from './smallComponents/HeadingComponent';
import PassVisibility from './smallComponents/PassVisibility';
import ErrorMessages from './smallComponents/ErrorMessages';

function Login() {
  // Constants and Variables
  const { setUserId } = useContext(frequentDatas)
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [fieldError, setFieldError] = useState('')
  const [dbError, setDbError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef('')
  const passwordRef = useRef('')

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault()
    setDbError(''), setFieldError('')
    const currEmail = emailRef.current.value
    const currPassword = passwordRef.current.value
    if (!currEmail || !currPassword) {
      return setFieldError('All fields are required.')
    } if (currPassword && currPassword.length < 8) {
      return setFieldError("Password length can't be less than 8 characters.")
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post("/auth/login", {
        email: currEmail,
        password: currPassword,
      })
      localStorage.setItem("token", data.token)
      localStorage.setItem("user_id", data.user_id)
      localStorage.setItem("role", data.role)
      localStorage.setItem("fname", data.fname)
      setUserId(data.user_id)
      setIsLoading(false)
      navigate("/")

    } catch (error) {
      setIsLoading(false)
      setDbError(error.response?.data?.msg || error.message)
      console.log(error)
    }
  }


  useEffect(() => 
  console.log(emailRef.current.value)

, [emailRef.current.value])
  // Return
  return (
    <section className=" flex justify-center p-2 mt-14  ">
      <div className="flex flex-col p-8 gap-6 bg-gray-300 rounded-lg ">
        {/* Header */}
        <HeadingComponent
          heading={'Login to your Account'}
          paragraph={"Don't have an account?"}
          navName={'Register'}
          navTo={'/register'} />

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className=" flex flex-col gap-5 ">
          {/* Email and Password */}
          <FieldComponent type={'Email'} fieldRef={emailRef} />
          <div className='flex items-center'>
            <FieldComponent
              type={'Password'}
              fieldRef={passwordRef}
              showPass={showPass} />
            <PassVisibility showPass={showPass} setShowPass={setShowPass} />
          </div>
          {fieldError && <ErrorMessages errorMessage={fieldError} />}
          {dbError && <ErrorMessages errorMessage={dbError} />}
          {/* Submit Button */}
          <ButtonComponent
            buttonName={'Login'}
            isLoading={isLoading}
            type={'submit'}
            handleClick={handleLogin} />
        </form>
      </div>
    </section>
  );
}

export default Login;
