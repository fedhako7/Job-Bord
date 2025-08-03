import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios/Axios'
import JList from '../job/JList'
import PagesHeader from '../pagesHeader/PagesHeader'
import roles from '../../pages/auth/role'
import DataNotFound from '../dataNotFound/DataNotFound'

function Home() {
  const fname = localStorage.getItem("fname")
  const role = localStorage.getItem("role")
  const [empTopJobs, setEmpTopJobs] = useState([])
  const [recentJobs, setRecentJobs] = useState([])
  const [appliedList, setAppliedList] = useState(new Set())
  const token = localStorage.getItem("token")
  const user_id = parseInt(localStorage.getItem('user_id'))
  const [dbError, setDbError] = useState('')
  const [fetching, setFetching] = useState(true)

  const fetchAppliedJobsId = async () => {
    try {
      const res = await axiosInstance.get('/applications/isapplied', { params: { seeker_id: user_id }, headers: { authorization: "Bearer " + token } })
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
      console.log(error.response?.data?.msg || error.message)
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
      console.log(error.response?.data?.msg || error.message)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (role === roles.SEEKER) fetchAppliedJobsId()
  }, [])

  useEffect(() => {
    if (role === roles.EMPLOYER) fetchEmpTopJobs()
    else if (role === roles.SEEKER) fetchRecentJobs()
  }, [])

  return (
    <div className=' pb-8 '>
      <div className='flex w-5/6 ml-auto mr-auto pt-4 font-semibold lg:w-3/4 lg:mt-14'>
        <p className='w-full text-left text-xl underline'>{role.toLocaleUpperCase()}</p>
        <p className='w-full text-right text-xl text-pink-800'>Welcome {fname}!</p>
      </div>

      {role === roles.SEEKER && (
        <div className=' lg:mx-6 '>
          <PagesHeader pageHeader={'Recently Posted Jobs'} />
          {
            recentJobs.length !== 0
              ? <JList jobs={recentJobs} appliedList={appliedList} />
              : <DataNotFound title={'Oops... '} cto={'No jobs found.'} />
          }
        </div>
      )}

      {role === roles.EMPLOYER &&
        (fetching ? (
          <div>Fetching...</div>
        ) : (
          <div>
            <PagesHeader pageHeader={'Your Top Applied Jobs'} />
            <div className=' lg:mx-6 '>
              {empTopJobs.length > 0 ? (
                <JList jobs={empTopJobs} emp={true} />
              ) : (
                <DataNotFound
                  title={'No job postings found'}
                  cto={'Start posting jobs to see them here.'}
                  link={'post job'}
                  to={'/job/post'}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Home
