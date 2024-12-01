import React, { useRef, useState } from 'react';
import axios from '../../axios/Axios'
import { ClipLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [fieldError, setFieldError] = useState('')
  const [termsError, setTermsError] = useState('')
  const [dbError, setDbError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fname = useRef('')
  const lname = useRef('')
  const email = useRef('')
  const password = useRef('')
  const role = useRef('')
  const terms = useRef(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setDbError(''), setFieldError(''), setTermsError('')
    const currFname = fname.current.value
    const currLname = lname.current.value
    const currEmail = email.current.value
    const currPassword = password.current.value
    const currRole = role.current.value
    const currTerms = terms.current.checked

    // Check fields
    if (!currFname || !currLname || !currEmail || !currPassword || !currRole ){
      return setFieldError('All fields are requered.')
    }else if(currPassword && currPassword.length < 8){
      return setFieldError("Password length can't be less than 8 characters.")
    }else if( !currTerms ){
      return setTermsError("Agree to the terms to continue.")
    }


    try {
      setIsLoading(true)
      await axios.post("/auth/register", {
        fname: currFname,
        lname: currLname,
        email: currEmail,
        password: currPassword,
        role: currRole
      })
      setIsLoading(false)
      navigate("/login")

    } catch (error) {
      setIsLoading(false)
      setDbError(error.message)
      console.log(error)
    }
  }

  return (
    <section className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col gap-6 items-center bg-gray-300 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Name Input */}
          <div className="flex gap-3 sm:flex-col">
            <input
              type="text"
              placeholder="First name"
              ref={fname}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              ref={lname}
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          {/* Email and Password */}
          <input
            type="email"
            placeholder="Email"
            ref={email}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {/* Role Selection */}
          <select
            name="role"
            ref={role}
            className="p-2 border rounded-md text-gray-500 focus:ring-2 focus:ring-blue-400 outline-none"
            defaultValue=""
          >
            <option value= "" disabled>
              Register As
            </option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
          {fieldError && <p className='text-center bold italic text-red-600'>{fieldError}</p>}

          {/* Terms and Conditions */}
          <p className="text-sm text-gray-600">
            <input type="checkbox" ref={terms} className="mr-2" />
            I agree to the{' '}
            <Link to="#" className="text-blue-500 hover:underline">
              Terms & Conditions
            </Link>
          </p>
          {termsError && <p className='text-center italic bold text-red-600'>{termsError}</p>}
          {dbError && <p className='text-center italic bold text-red-600'>{dbError}</p>}


          {/* Submit Button */}
          <button
            type="submit"
            className={`h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <><ClipLoader size={20} color='white'/> Please wait...</> : <>Create Account</>}

          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-sm text-gray-500">Or register with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Media Options */}
        <div className="flex gap-4">
          <button className="bg-gray-100 hover:bg-gray-200 flex items-center px-4 py-2 rounded-md">
            <span className="mr-2">🔵</span> Google
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 flex items-center px-4 py-2 rounded-md">
            <span className="mr-2">🍎</span> Apple
          </button>
        </div>
      </div>
    </section>
  );
}

export default Register;
