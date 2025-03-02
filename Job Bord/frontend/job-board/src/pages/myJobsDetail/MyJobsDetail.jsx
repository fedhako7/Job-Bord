import React, { useEffect, useState } from 'react'
import ApplicantsList from '../../components/applicants/ApplicantsList'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../../axios/Axios'
import DetailCard from '../../components/job/DetailCard'
import roles from '../auth/role'

function MyJobsDetail() {
  const token = localStorage.getItem("token")
  const location = useLocation()
  const job_id = location?.state?.job_id
  const title = location?.state?.title
  const isRoleEmployer = localStorage.getItem('role') === roles.EMPLOYER

  const [job, setJob] = useState()
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState("")

  const fetchJob = async () => {
    try {
      const res = await axiosInstance.get("jobs/single", {
        params: { job_id },
        headers: { authorization: "Bearer " + token }
      })
      setJob(res?.data?.job)
    } catch (error) {
      console.log(error)
      setDbError(error?.response?.data?.msg || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJob()
  }, [])

  return (
    <div>
      <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14'>
        <p className='w-full pr-6 text-center text-black text-4xl font-bold'> {title} </p>
      </div>
      <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4' />

      {loading ? (
        <p className="text-center text-xl mt-6">Fetching...</p>
      ) : dbError ? (
        <p className="text-center text-xl mt-6 text-red-500">{dbError}</p>
      ) : (
        <DetailCard job={job} from_detail={true} />
      )}

      {
        isRoleEmployer &&
        <>
          <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14'>
            <p className='w-full pr-6 text-center  text-4xl text-black'> Applicants List </p>
          </div>
          <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4' />
          <ApplicantsList />
        </>
      }
    </div>
  )
}

export default MyJobsDetail
