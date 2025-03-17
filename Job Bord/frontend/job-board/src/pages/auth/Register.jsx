import React, { useEffect, useRef, useState } from 'react';
import axios from '../../axios/Axios'
import { useNavigate } from 'react-router-dom';
import HeadingComponent from './smallComponents/HeadingComponent';
import FieldComponent from './smallComponents/FieldComponent';
import ErrorMessages from './smallComponents/ErrorMessages';
import ButtonComponent from '../../components/smallComponents/ButtonComponent';
import RoleComponent from './smallComponents/RoleComponent';
import roles from './role';
import GoogleAuth from './googleAuth/GoogleAuth';

function Register() {
  // Constants and Variables
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({ fname: '', lname: '', email: '', password: '', company: '', role: '' });
  const [errors, setErrors] = useState({ fname: '', lname: '', email: '', password: '', role: '', general: '' });

  // Input change handlers 
  const handleFnameChange = (e) => {
    const fname = e.target.value;
    setValues((prev) => ({ ...prev, fname: fname }))
    if (!fname) {
      setErrors((prev) => ({ ...prev, fname: 'First name required' }));
    } else if (!/^[A-Za-z]+$/.test(fname)) {
      setErrors((prev) => ({ ...prev, fname: 'Only letters (A-Z, a-z) are allowed' }));
    } else if (fname.length < 2) {
      setErrors((prev) => ({ ...prev, fname: 'First name must be at least 2 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, fname: '' }));
    }
  };

  const handleLnameChange = (e) => {
    const lname = e.target.value;
    setValues((prev) => ({ ...prev, lname: lname }))
    if (!lname) {
      setErrors((prev) => ({ ...prev, lname: 'Last name required' }));
    } else if (!/^[A-Za-z]+$/.test(lname)) {
      setErrors((prev) => ({ ...prev, lname: 'Only letters (A-Z, a-z) are allowed' }));
    } else if (lname.length < 2) {
      setErrors((prev) => ({ ...prev, lname: 'Last name must be at least 2 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, lname: '' }));
    }
  };


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

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setValues((prev) => ({ ...prev, role: role }))

    if (role !== roles.EMPLOYER && role !== roles.SEEKER) {
      setErrors((prev) => ({ ...prev, role: "Invalid role" }));
    } else {
      setErrors((prev) => ({ ...prev, role: '' }));
    }

  };

  const handleCompanyChange = (e) => {
    const company = e.target.value;
    setValues((prev) => ({ ...prev, company: company }))
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    let tempErrors = { ...errors };

    if (!values.fname) {
      tempErrors.fname = 'First name required';
    }

    if (!values.lname) {
      tempErrors.lname = 'Last name required';
    }

    if (!values.email) {
      tempErrors.email = 'Email required';
    }

    if (!values.password) {
      tempErrors.password = 'Password required';
    }

    if (!values.role) {
      tempErrors.role = 'Role required';
    }

    setErrors(tempErrors);

    // Ensure we return if there are any errors
    if (tempErrors.fname || tempErrors.lname || tempErrors.email || tempErrors.password || tempErrors.role) {
      return setErrors((prev) => ({ ...prev, general: 'Please fix the errors before submitting.' }));
    }

    try {
      setIsLoading(true)
      await axios.post("/auth/register", {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
        company: values.company,
        role: values.role,
      })
      setIsLoading(false)
      navigate("/login")

    } catch (error) {
      setIsLoading(false)
      setErrors({ ...errors, general: error.response?.data?.msg || error.message })
      console.log(error)
    }
  }

  // Return
  return (
    <section className=" flex justify-center p-2 mt-5 ">
      <div className="flex flex-col max-w-full p-8 pt-6 gap-4 bg-gray-300 rounded-lg">
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
            placeholder='First name'
            onChange={handleFnameChange}
            value={values.fname}
            error={errors.fname}
          />

          <FieldComponent
            type={'text'}
            placeholder='Last name'
            onChange={handleLnameChange}
            value={values.lname}
            error={errors.lname}
          />
          <FieldComponent
            type={'Email'}
            placeholder={'Email'}
            onChange={handleEmailChange}
            value={values.email}
            error={errors.email}
          />

          <FieldComponent
            type={'Password'}
            placeholder={'Password'}
            onChange={handlePasswordChange}
            value={values.password}
            error={errors.password}
          />

          <FieldComponent
            type={'text'}
            placeholder='Company (For Employers only)'
            onChange={handleCompanyChange}
            value={values.company}
            disabled={values.role !== roles.EMPLOYER}
          />

          <div className=' flex flex-col pl-2 gap-2 text-lg '>
            <p className=' font-medium'>Register As</p>
            <RoleComponent value={roles.SEEKER} onChange={handleRoleChange} />
            <RoleComponent value={roles.EMPLOYER} onChange={handleRoleChange} />
            {errors.role && <span className=" -mt-3 italic text-red-500 text-sm">{errors.role}</span>}
          </div>

          {errors.general && <ErrorMessages message={errors.general} />}

          {/* Submit Button */}
          <ButtonComponent
            type={'submit'}
            isLoading={isLoading}
            buttonName={'Register'} />
        </form>
        {/* Google Registration  */}
        <div>
          <GoogleAuth />
        </div>
      </div>
    </section>
  );
}

export default Register;
