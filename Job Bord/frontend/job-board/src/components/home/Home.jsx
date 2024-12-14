import React, { useEffect, useState } from 'react'
import JobList from '../job/JobList'
import JobCard from '../job/JobCard'
import axiosInstance from '../../axios/Axios'

function Home() {
  const fname = localStorage.getItem("fname")
  const role = localStorage.getItem("role")
  const [empTopJobs, setEmpTopJobs] = useState([])
  const [recentJobs, setRecentJobs] = useState([])
  const [appliedList, setAppliedList ] = useState(new Set())
  const token = localStorage.getItem("token")
  const user_id = parseInt(localStorage.getItem('user_id'))
  const [dbError, setDbError] = useState('')
  const [fetching, setFetching] = useState(true)


  const fetchAppliedJobsId = async () => {
    try {
         const res = await axiosInstance.get('/applications/isapplied', {params: { seeker_id: user_id }, headers: {authorization: "Bearer " + token}})
         const appliedIds = new Set(res?.data?.applied_ids || [])
         setAppliedList(appliedIds)
    } catch (error) {
     console.log(error)
    }
 }

  const fetchEmpTopJobs = async () => {
    try {
      setFetching(true)
      // /myposts/top
      const response = await axiosInstance.get("/jobs/myposts/top", {
        params: { employee_id: user_id },
        headers: { authorization: "Bearer " + token },
      })
      setEmpTopJobs(response?.data?.user_jobs)
    } catch (error) {
      setDbError(error.response?.data?.msg || error.message)
    } finally {
      setFetching(false)
    }
  }
 
 const fetchRecentJobs = async () => {
   try {
     setFetching(true)
     
     const response = await axiosInstance.get("/jobs/recent", {
       headers: { authorization: "Bearer " + token },
      })
      setRecentJobs(response?.data?.user_jobs)
    } catch (error) {
      setDbError(error.response?.data?.msg || error.message)
    } finally {
      setFetching(false)
    }
  }
  
  
  useEffect(() => {
    if (role === "Job Seeker") fetchAppliedJobsId()
  }, [])

  useEffect(() => {
    if (role === "Employer") fetchEmpTopJobs()
      else if (role === "Job Seeker") fetchRecentJobs()
  }, [])

return (
    <div>
      <div className='flex w-5/6 ml-auto mr-auto mt-5 font-semibold lg:w-3/4 lg:mt-14'>
        <p className='w-full text-left text-xl underline'>{role.toLocaleUpperCase()}</p>
        <p className='w-full text-right text-xl text-pink-800'>Welcome {fname}!</p>
      </div>

      {role === "Job Seeker" && (
        <div>
          <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14'>
            <p className='w-full text-center pr-6 text-4xl'>Recently Posted Jobs</p>
          </div>
          <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4' />

          {

                recentJobs.map((job) =>
                <JobCard job={job} key={job.job_id} has_applied={appliedList.has(job.job_id)} />)


          }

        </div>
      )}

      {role === "Employer" &&
        (fetching ? (
          <div>Fetching...</div>
        ) : (
          <div>
            <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14'>
              <p className='w-full text-center pr-6 text-4xl'>Your Top Applied Jobs</p>
            </div>
            <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4' />
            <div>
              {dbError && <div>Error: {dbError}</div>}
              {empTopJobs.length > 0 ? (
                empTopJobs.map((job) => <JobCard job={job} key={job.job_id} emp={true} />)
              ) : (
                <div>No jobs available</div>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Home
