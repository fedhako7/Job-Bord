import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios/Axios'
import JobCard from '../../components/job/JobCard'

function MyJobs() {
  const employee_id = parseInt(localStorage.getItem("user_id"))
  const navigate = useNavigate()
  const [myJobs, setMyJobs] = useState([])
  const [fetching, setFetching] = useState(true)
  const [dbError, setDbError] = useState('')

  const fetchMyJobs = async () => {
    try {
        const response = await axiosInstance.get("/jobs/myposts", {params: {employee_id}})
        setMyJobs(response?.data?.user_jobs)
    } catch (error) {
        console.log(error)
        setDbError(error?.response?.data?.msg || error.message)
    } finally {
        setFetching(false)
    }
  }
  
  useEffect(() => {
    fetchMyJobs()
  }, [])

  return (
    <>
     <div>
        <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
            <p className='w-1/2 text-end pr-6 text-4xl'> My Jobs </p>
            <button onClick={() => {navigate('/job/post')}} className='w-28 h-10 bg-blue-800 mr-3 rounded-lg text-2xl lg:w-36 lg:h-12 '> Post Job</button>
        </div>
        <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4'/>
      </div>
      <div>{dbError && {dbError}}</div>

      {
        fetching ? <div>Fetching...</div>:
        <>
        {myJobs?.length === 0 ? <div>Jobs unavailable</div>:
         
         myJobs.map((myJob) => (
            <JobCard job={myJob} key={myJob.job_id} applicant={true}/>
         ))
        }
        </>
      }

    </>
  )
}

export default MyJobs