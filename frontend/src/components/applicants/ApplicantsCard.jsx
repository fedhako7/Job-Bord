import React, { useState } from 'react'
import axiosInstance from '../../axios/Axios';
import ButtonComponent from '../smallComponents/ButtonComponent'

function ApplicantsCard({ applicant, setRefresh }) {
  const token = localStorage.getItem("token")
  const { fname, lname, email, status, applied_at } = applicant
  const { cover_letter: cv, note, resume, application_id: app_id } = applicant

  const date = new Date(applied_at);
  const month = date.toLocaleString('default', { month: 'short' });
  const formattedDate = `${month}-${date.getDate()}`;
  const [dbError, setDbError] = useState('')
  const [show, setShow] = useState(false)
  const resumePath = `${axiosInstance.defaults.baseURL}/${resume.replace(/\\/g, '/')}`;

  const handleStatus = async (e) => {
    const new_st = e.target.name
    try {
      console.log("app_id", app_id)
      await axiosInstance.put("applications/status", { app_id, status: new_st }, { headers: { authorization: "Bearer " + token } })
      setRefresh((p) => !p)
    } catch (error) {
      console.log(error)
      setDbError(error?.response?.data?.msg || error.message)
    }

  }

  return (
    <section >
      <div
        className={`flex flex-col w-5/6 h-fit bg-white/40 gap-4 ml-auto mr-auto mt-8 p-8
              border-gray-400 border-2 rounded-md text-xl sm:min-w-[420px]
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
        <p> <strong className='pr-3' >Cover letter:</strong> {cv}</p>
        {show && <p> <strong className='pr-3' >Status:</strong> {status}</p>}
        {show && <p> <strong className='pr-3' >Email:</strong> {email}</p>}
        {show && <p> <strong className='pr-3' >Date:</strong> {formattedDate}</p>}
        {show && <p> <strong className='pr-3' >Note:</strong> Note</p>}

        <div className='flex flex-col gap-2 justify-around sm:flex-row '>
          <ButtonComponent
            handleClick={() => { setShow((prev) => !prev) }}
            buttonName={show ? "Show Less" : "Show More"} />
          <ButtonComponent handleClick={handleStatus} data={'Accepted'} buttonName={'Accept'} />
          <ButtonComponent handleClick={handleStatus} data={'Rejected'} buttonName={'Reject'} />
        </div>
      </div>
    </section>
  )
}

export default ApplicantsCard

