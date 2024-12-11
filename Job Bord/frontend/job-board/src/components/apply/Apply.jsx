import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from '../../axios/Axios'

function Apply() {
  const token = localStorage.getItem("token")
  const seeker_id = parseInt(localStorage.getItem('user_id'))
  const navigate = useNavigate()
  const [fieldError, setFieldError] = useState('')
  const [dbError, setDbError] = useState('')
  const letterRef = useRef()
  const resumeRef = useRef()
  const location = useLocation()
  const job_id = location?.state?.job_id
  const title = location?.state?.title

const handleSubmit = async (e) => {
  e.preventDefault()
  const letter = letterRef.current.value
  const resume = resumeRef.current.files[0]
  if (!letter){
    return setFieldError("Fill all requered fields.")
  }
  const formData = new FormData();
  formData.append("job_id", job_id);
  formData.append("title", title);
  formData.append("seeker_id", seeker_id);
  formData.append("resume", resume); 
  formData.append("cover_letter", letter);
  try {
    await axiosInstance.post("jobs/apply", formData, {headers: { authorization: "Bearer " + token }})
    setTimeout(() => {
      alert("Application sent successfully!")

    }, 350);
    navigate("/apply/my")

  } catch (error) {
    console.log(error)
    setDbError(error.response?.data?.msg || error.message)
  }
}

  return (
    <form className={` flex flex-col w-3/4 bg-gray-100 ml-auto mr-auto mt-16 p-6 gap-5 items-center border-2 border-gray-400 rounded-xl font-medium lg:text-lg `} onSubmit={handleSubmit}> 
        <p className={`mb-4 text-2xl text-gray-800 `}>You are applying as Fedhasa.</p>
        <p className={` text-red-600 font-medium italic pr-28 lg:text-xl`}>* Requered field</p>
        <div className={`flex `}>
          <span className={`text-red-600 text-xl font-bold `}>*</span>
          <textarea ref={letterRef} className={`w-80 h-32  border-2 border-gray-400 rounded-xl focus:h-40 focus:w-96 lg:w-96`} name="" id="" placeholder='Cover Letter'></textarea></div>
        <div className={`flex flex-col w-80 gap-4 items-center mt-3 lg:w-96 lg:font-semibold `}>
          <label className='mt-4' htmlFor="">Upload Your Resume</label>
          <input ref={resumeRef} name='resume' className={`w-52 mb-12 lg:w-60 `} type="file" />
        </div>
        {fieldError && <p className='text-red-600 italic animate-bounce'>{fieldError}</p>}
        <button className={`w-32 h-10 bg-blue-800 rounded-md `}>Submit</button>
    </form>
  )
}

export default Apply