import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function DataNotFound({ title, cto, link, to }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center text-center py-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-100">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18m-9 8h9m-9 4h6" />
      </svg>
      <p className="mt-4 text-lg font-semibold text-gray-700">{title}</p>
      <p className="mt-1 text-sm text-gray-700">
        {cto} &nbsp;
        {
          (link && to) &&
          <Link to={to} className=' underline text-blue-800'>
            {link}
          </Link>
        }
      </p>
    </div>
  )
}

export default DataNotFound
