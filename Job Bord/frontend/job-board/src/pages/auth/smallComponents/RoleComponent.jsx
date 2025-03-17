import React from "react"

const RoleComponent = ({ onChange, value }) => {

  // Return 
  return (
    <>
      <label className='flex pl-4'>
        <input
          onChange={onChange}
          type="radio"
          name="userType"
          value={value}
          className='mr-2 scale-150' /> {value}
      </label>
    </>
  )
}

export default RoleComponent
