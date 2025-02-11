import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


function HeadingComponent( {heading, paragraph, navName, navTo}) {
  return (
    <div>
      <h1 className=" text-2xl font-bold lg:text-3xl ">{heading}</h1>
      <p
        className=" text-gray-600 lg:text-xl">
        {paragraph}{' '}
        <Link
          to={navTo}
          className="text-blue-500 font-serif hover:underline">
          {navName}
        </Link>
      </p>
      <hr className='mt-1 border-black'/>
    </div>
  )
}

export default HeadingComponent