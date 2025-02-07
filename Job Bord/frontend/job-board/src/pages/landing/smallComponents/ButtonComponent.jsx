import React from "react"

const ButtonComponent = ({ buttonName, data, handleClick, navTo, role, toDo }) => {
  return (
    <div className="flex mt-4 justify-center ">
      <button
        data-role={role || undefined}
        data-navto={navTo || undefined}
        data-todo={toDo || undefined}
        name={data}
        onClick={handleClick}
        className="bg-[#00563B] h-12 px-6 w-full max-w-[250px] text-white rounded-md  truncate md:max-w-[300px] text-sm sm:text-base md:text-lg xl:text-xl ">
        {buttonName}
      </button>
    </div>

  )
}

export default ButtonComponent
