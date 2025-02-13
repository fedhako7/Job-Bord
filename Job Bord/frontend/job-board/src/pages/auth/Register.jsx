import React, { useEffect, useRef, useState } from 'react';
import axios from '../../axios/Axios'
import { useNavigate } from 'react-router-dom';
import HeadingComponent from './smallComponents/HeadingComponent';
import FieldComponent from './smallComponents/FieldComponent';
import PassVisibility from './smallComponents/PassVisibility';
import ErrorMessages from './smallComponents/ErrorMessages';
import ButtonComponent from '../landing/smallComponents/ButtonComponent';
import RoleComponent from './smallComponents/RoleComponent';
import roles from './role';

function Register() {
  // Constants and Variables
  const navigate = useNavigate()
  const [fieldError, setFieldError] = useState('')
  const [dbError, setDbError] = useState('')
  const [roleValue, setRoleValue] = useState(null);
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fnameRef = useRef('')
  const lnameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const companyRef = useRef('')

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fname = fnameRef.current.value
    const lname = lnameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const company = companyRef?.current?.value

    // Check fields
    if (!fname || !lname || !email || !password || !roleValue) {
      return setFieldError('All fields are requered.')
    } else if (password && password.length < 8) {
      return setFieldError("Password length can't be less than 8 characters.")
    }

    try {
      setIsLoading(true)
      await axios.post("/auth/register", {
        fname,
        lname,
        email,
        password,
        role: roleValue,
        company,
      })
      setIsLoading(false)
      navigate("/login")

    } catch (error) {
      setIsLoading(false)
      setDbError(error.response?.data?.msg || error.message)
      console.log(error)
    }
  }

  // Return
  return (
    <section className=" flex justify-center p-2 mt-8 ">
      <div className="flex flex-col max-w-full p-8 gap-6 bg-gray-300 rounded-lg">
        {/* Heading */}
        <HeadingComponent
          heading={'Create an Account'}
          paragraph={"Already have an account?"}
          navName={'Login'}
          navTo={'/login'} />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full">
          <FieldComponent
            type={'text'}
            fieldPHolder='First name'
            fieldRef={fnameRef} />

          <FieldComponent
            type={'text'}
            fieldPHolder='Last name'
            fieldRef={lnameRef} />
          <FieldComponent
            type={'Email'}
            fieldRef={emailRef} />

          <div className='flex items-center'>
            <FieldComponent
              type={'Password'}
              fieldRef={passwordRef}
              showPass={showPass} />
            <PassVisibility
              showPass={showPass}
              setShowPass={setShowPass} />
          </div>

          <FieldComponent
            type={'text'}
            fieldPHolder='Company (For Employers only)'
            fieldRef={companyRef}
            disabled={roleValue !== roles.EMPLOYER} />

          <div className=' flex flex-col pl-2 gap-2 text-lg '>
            <p className=' font-medium'>Register As</p>
            <RoleComponent roleName={roles.SEEKER} setRoleValue={setRoleValue} />
            <RoleComponent roleName={roles.EMPLOYER} setRoleValue={setRoleValue} />
          </div>

          {fieldError && <ErrorMessages errorMessage={fieldError} />}
          {dbError && <ErrorMessages errorMessage={dbError} />}

          {/* Submit Button */}
          <ButtonComponent
            type={'submit'}
            isLoading={isLoading}
            buttonName={'Register'} />
        </form>
      </div>
    </section>
  );
}

export default Register;
