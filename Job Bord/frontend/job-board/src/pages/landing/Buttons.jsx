import React from 'react'

function buttons({ buttonName }) {
  return (
    <div className="flex mt-4 justify-center ">
      <button className="bg-[#00563B] h-12 px-6 w-full max-w-[250px] text-white rounded-md  truncate md:max-w-[300px] text-sm sm:text-base md:text-lg xl:text-xl ">
        {buttonName}
      </button>
    </div>

  )
}

export default buttons
