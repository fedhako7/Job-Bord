import React from 'react'

function ErrorMessages({errorMessage}) {
  return (
    <div>
      <p className='text-center bold italic text-red-600'>
        {errorMessage}
      </p>
    </div>
  )
}

export default ErrorMessages