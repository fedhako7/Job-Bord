import React from 'react'

function buttons({ buttonName }) {
  return (
    <div className="flex mt-5 justify-center">
      <button className="bg-[#00563B] h-8 px-6 w-full max-w-[250px] text-white rounded-lg  truncate md:max-w-[300px] sm:h-9 text-sm sm:text-base md:text-lg xl:text-xl ">
        {buttonName}
      </button>
    </div>

  )
}

export default buttons
