import React from "react"
import { ClipLoader } from "react-spinners"

const ButtonComponent = ({ buttonName, data, handleClick, has_applied, isLoading, type, navTo, role, toDo }) => {
  return (
    <div className="flex mt-4 justify-center ">
      <button
        data-role={role}
        data-navto={navTo}
        data-todo={toDo}
        name={data}
        type={type}
        onClick={handleClick}
        disabled={isLoading}
        className={`bg-[#00563B] ${has_applied ? 'text-gray-300/50' : 'text-white'} h-10 px-6 w-full max-w-[250px]  rounded-md  truncate md:max-w-[300px] text-sm sm:text-base md:text-lg xl:text-xl `}>
        {isLoading ? <><ClipLoader size={20} /> Please wait...</> : <> {buttonName} </>}
      </button>
    </div>
  )
}

export default ButtonComponent
