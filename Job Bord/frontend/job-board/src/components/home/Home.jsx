import React from 'react'
import JobList from '../job/JobList'

function Home() {
  return (
    <>
    <div>
      <p className='mt-8 text-3xl text-center font-semibold '>Recently Posted Jobs</p>
      <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4'/>
      <JobList />
    </div>
    </>
  )
}

export default Home