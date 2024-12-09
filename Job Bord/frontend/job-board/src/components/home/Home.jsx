import React from 'react'
import JobList from '../job/JobList'

function Home() {
  const fname = localStorage.getItem("fname")
  const role = localStorage.getItem("role")

  return (
    <>
     <div>
      <div className='flex w-5/6 ml-auto mr-auto mt-5 font-semibold lg:w-3/4 lg:mt-14 '>
        <p className='w-full text-left text-xl underline'> {role.toLocaleUpperCase()} </p>
        <p className='w-full text-right text-xl text-pink-800'> Welcome {fname}! </p>
      </div>

      {role === "Job Seeker"  &&
      <>
        <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
          <p className='w-full text-center pr-6 text-4xl'> Recently Posted Jobs </p>
        </div>
        <hr className='h-1 w-5/6 ml-auto mr-auto mt-3 mb-3 bg-black lg:w-3/4'/>
        <JobList />
      </>
      }
    </div>
    </>
  )
}

export default Home