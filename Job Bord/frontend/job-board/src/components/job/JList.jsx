import React, { useEffect, useState } from 'react'
import JCard from './JCard'
import axiosInstance from '../../axios/Axios'

function JList({ job, emp, has_applied, from_detail }) {
  const [testJobs, setTestJobs] = useState([])

  const fetchTestJobs = async () => {
    try {
      const response = await axiosInstance.get("guest/featured")
      setTestJobs(response?.data?.featured_jobs)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchTestJobs()
  }, [])

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-4 my-4 px-4 justify-items-start sm:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] ">
      {testJobs.map((job) => (
        <JCard job={job} key={job.job_id} />
      ))}
    </div>

  )
}

export default JList