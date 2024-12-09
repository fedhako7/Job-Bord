import React from 'react'
import JobList from '../../components/job/JobList'

function MyJobs() {

  return (
    <>
    <div>
        <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
        <p className='w-1/2 text-end pr-6 text-4xl'> My Job Posts </p>
        <button onClick={() => {navigate('/job/post')}} className='w-28 h-10 bg-blue-800 mr-3 rounded-lg text-2xl lg:w-36 lg:h-12 '> Post Job</button>
      </div>
      <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4'/>

        <JobList emp={true} />
    </div>
    </>
  )
}

export default MyJobs