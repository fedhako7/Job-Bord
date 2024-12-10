import React, { useContext, useRef, useState } from "react";
import { profileMode } from "./Profile";
import axiosInstance from "../../axios/Axios";
import { ClipLoader } from 'react-spinners'
import { childType } from "./childType";


const ChangePass = () => {
    const token = localStorage.getItem("token")
    const user_id = parseInt(localStorage.getItem("user_id"))
    const { setChild, profile } = useContext(profileMode)
    const oldRef = useRef('')
    const newRef = useRef('')
    const newRef2 = useRef('')
    const [fieldError, setFieldError] = useState('')
    const [dbError, setDbError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handlePass = async (e) => {
        setDbError(''), setFieldError('')
        const old_pass = oldRef.current.value
        const new_pass = newRef.current.value
        const new_pass2 = newRef2.current.value
    
        // Check fields
        if ( !old_pass || !new_pass || !new_pass2 ){
          return setFieldError('All fields are requered.')
        }else if ( new_pass !== new_pass2 ){
            return alert("Password do not match")
        }else if ( new_pass.length < 8 ){
            return alert("Password length can't be less than 8 characters.")
          }
          
          try {
            setIsLoading(true)
            await axiosInstance.put("/auth/change", {
              user_id,
              new_pass, 
              old_pass, 
            }, { headers: {authorization: "Bearer " + token} })
          setIsLoading(false)
          alert("Password updated successfully!")
          setChild(childType.PROFILE_DATA)
          
        } catch (error) {
          setIsLoading(false)
          setDbError(error.response?.data?.msg || error.message)
          console.log(error)
        }
      }
    
  return (
    <section className="flex w-full flex-grow bg-gray-200">
      <div className="flex flex-col w-5/6 bg-white ml-auto mr-auto mt-4 gap-4 p-5 border-2 border-gray-400">

      <div className=" ">
        <div className='flex h-12 bg-gray-300 justify-center items-center '>
          <label className="text-center text-lg text-red-800 italic font-semibold">Change Password </label>
        </div>
        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Password</label>
          <input className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" type="password" placeholder="Old Password" ref={oldRef} />
        </div>
        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">New Password</label>
          <input className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" type="password" placeholder="New password" ref={newRef} />
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Re-Enter New Password</label>
          <input className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" type="password" placeholder="Re-enter new password" ref={newRef2} />
        </div>
      </div>

        {fieldError && <p className='text-center italic bold text-red-600'>{fieldError}</p>}
        {dbError && <p className='text-center italic bold text-red-600'>{dbError}</p>}

        <div className="flex gap-4 justify-around">

          <button onClick={ handlePass} className="w-36 h-12 bg-blue-800 rounded-md"> 
            Change Password
          </button>
          <button onClick={ () => { setChild(childType.PROFILE_DATA)} } className="w-36 h-12 bg-blue-800 rounded-md"> Cancel </button>
        </div>

      </div>
    </section>
  );
};

export default ChangePass;
