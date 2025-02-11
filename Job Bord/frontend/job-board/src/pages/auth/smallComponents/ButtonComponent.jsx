import React from 'react'

function ButtonComponent( {isLoading, }) {
  return (
    <div>

      <button
        type="submit"
        className={` flex h-11 bg-blue-500 justify-center items-center text-white rounded-md hover:bg-blue-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={isLoading}
      >
        {isLoading ? <><ClipLoader size={20} /> Please wait...</> : <>Login</>}

      </button>


    </div>
  )
}

export default ButtonComponent