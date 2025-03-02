import React from 'react'

function PagesHeader({ pageHeader }) {
  return (
    <>
      <div className='flex w-11/12 max-w-7xl mx-auto mt-8 justify-center items-center font-semibold lg:mt-12'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-tight text-center'>
          {pageHeader}
        </h1>
      </div>
      <hr className='w-11/12 max-w-7xl mx-auto mt-4 mb-6 h-px bg-gray-800 border-0 lg:mt-6' />
    </>
  )
}

export default PagesHeader