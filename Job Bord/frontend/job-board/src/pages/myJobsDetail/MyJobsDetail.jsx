import React from 'react'
import ApplicantsList from '../../components/applicants/ApplicantsList'
import { useLocation } from 'react-router-dom'

function MyJobsDetail() {
    const location = useLocation()
    const title = location?.state?.title
  return (
    <div>
        <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
            <p className='w-full text-center pr-6 text-4xl'> My Job Posts: { title }</p>
        </div>
        <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4'/>
        <ApplicantsList />
    </div>
  )
}

export default MyJobsDetail