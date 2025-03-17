import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from '../../axios/Axios'
import { useNavigate } from 'react-router-dom';
import { frequentDatas } from '../../contextProvider/ContextProvider'
import FieldComponent from './smallComponents/FieldComponent';
import ButtonComponent from '../../components/smallComponents/ButtonComponent';
import HeadingComponent from './smallComponents/HeadingComponent';
import ErrorMessages from './smallComponents/ErrorMessages';
import GoogleAuth from './googleAuth/GoogleAuth';

function Login() {
  // Constants and Variables
  const { setUserId } = useContext(frequentDatas)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  // Input change handlers 
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setValues((prev) => ({ ...prev, email: email }))
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email required' }));
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setValues((prev) => ({ ...prev, password: password }))
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password required' }));
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at 6 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault()

    let tempErrors = { ...errors };

    if (!values.email) {
      tempErrors.email = 'Email required';
    }
    if (!values.password) {
      tempErrors.password = 'Password required';
    }
  
    setErrors(tempErrors);
  
    // Ensure we return if there are any errors
    if (tempErrors.email || tempErrors.password) {
      return setErrors((prev) => ({ ...prev, general: 'Please fix the errors before submitting.' }));
    }

    try {
      setIsLoading(true)
      const { data } = await axios.post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      localStorage.setItem("token", data.token)
      localStorage.setItem("user_id", data.user_id)
      localStorage.setItem("role", data.role)
      localStorage.setItem("fname", data.fname)
      setUserId(data.user_id)
      setIsLoading(false)
      navigate("/home")

    } catch (error) {
      setIsLoading(false)
      setErrors((prev) => ({ ...prev, general: error.response?.data?.msg || error.message }));
      console.log(error)
    }
  }


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
          <FieldComponent
            type={'Email'}
            onChange={handleEmailChange}
            value={values.email}
            error={errors.email}
          />
          <FieldComponent
            type={'Password'}
            onChange={handlePasswordChange}
            value={values.password}
            error={errors.password}
          />
          {errors.general && <ErrorMessages errorMessage={errors.general} />}
          {/* Submit Button */}
          <ButtonComponent
            buttonName={'Login'}
            isLoading={isLoading}
            type={'submit'}
            handleClick={handleLogin} />
        </form>
        <GoogleAuth />
      </div>
    </section>
  );
}

export default Login;
