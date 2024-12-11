import React, { useState } from 'react'
import axiosInstance from '../../axios/Axios';

function ApplicantsCard({ applicant, setRefresh }) {
  const token = localStorage.getItem("token")
  const { fname, lname, email, status, applied_at } = applicant
  const { cover_letter: cv, note, resume, application_id:app_id } = applicant

  const date = new Date(applied_at);
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${month}-${date.getDate()}`;
  const [dbError, setDbError] = useState('')
  const [show, setShow] = useState(false)
  const resumePath  = `${axiosInstance.defaults.baseURL}/${resume.replace(/\\/g, '/')}`;

  const handleStatus = async (e) => {
    const new_st = e.target.name
    try {
      console.log("app_id", app_id)
      await axiosInstance.put("applications/status", { app_id, status: new_st }, {headers: {authorization: "Bearer " + token}})
      setRefresh((p) => !p)
    } catch (error) {
      console.log(error)
      setDbError(error?.response?.data?.msg || error.message)
    }

  }

  return (
    <section >
      <div
        className={`flex flex-col min-w-[420px] w-5/6 h-fit bg-white gap-4 ml-auto mr-auto mt-8 p-8
              border-gray-400 border-2 rounded-md shadow-[1px_1px_0px_blue] text-xl 
              ${show && "rounded-bl-none rounded-br-none border-b-0"} lg:w-3/4`}
      >
          <p> <strong className='pr-3' >Name:</strong> {`${fname} ${lname}`}</p>
          <p> <strong className='pr-3' >Resume:</strong> 
            <a 
              href={resumePath} 
              download 
              className='text-lg text-blue-700 underline hover:text-blue-900'
              target="_blank" 
              rel="noopener noreferrer"
            >
               Download Resume
            </a>
          </p>
          <p> <strong className='pr-3' >Status:</strong> {status}</p>
          <p> <strong className='pr-3' >Email:</strong> {email}</p>
          <p> <strong className='pr-3' >Date:</strong> {formattedDate}</p>
          {show && <p> <strong className='pr-3' >CV:</strong> {cv}</p>}
          {show && <p> <strong className='pr-3' >Note:</strong> Note</p> }

          <div className='flex gap-5 lg:gap-8 lg:pt-8 '>
              <button onClick={() => { setShow((prev) => (!prev)) }} className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>
                  {show ? "Show Less" : "Show More"}
              </button>
              <button onClick={handleStatus} name="Accepted" className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>Accept</button>
              <button onClick={handleStatus} name="Rejected" className=' min-w-28 h-10 bg-blue-800 rounded-md lg:w-36 lg:h-12 '>Reject</button>
          </div>
      </div>
    </section>
  )
}

export default ApplicantsCard

