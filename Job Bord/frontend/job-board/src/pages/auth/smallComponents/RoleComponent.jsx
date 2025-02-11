import React from "react"

const RoleComponent = ({ roleName, setRoleValue }) => {

  // Return 
  return (
    <label className='flex pl-4'>
      <input
        onChange={() => { setRoleValue(roleName) }}
        type="radio"
        name="userType"
        value={roleName}
        className='mr-2 scale-150' /> {roleName === 'Seeker' ? 'Job Seeker' : roleName}
    </label>
  )
}

export default RoleComponent