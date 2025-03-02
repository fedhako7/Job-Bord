import React, { useContext, useRef, useState } from "react";
import { profileMode } from "./Profile";
import axiosInstance from "../../axios/Axios";
import { ClipLoader } from 'react-spinners'
import { childType } from "./childType";


const UpdateProfile = () => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const user_id = parseInt(localStorage.getItem("user_id"))
    const { setChild, profile } = useContext(profileMode)
    const fnameRef = useRef(profile.fname )
    const lnameRef = useRef(profile.lname )
    const emailRef = useRef(profile.email )
    const companyRef = useRef(profile.company )
    const [fieldError, setFieldError] = useState('')
    const [dbError, setDbError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdate = async (e) => {
        setDbError(''), setFieldError('')
        const fname = fnameRef.current.value
        const lname = lnameRef.current.value
        const email = emailRef.current.value
        const company = companyRef?.current?.value || fname
    
        // Check fields
        if (!fname || !lname || !email ){
          return setFieldError('All fields are requered.')
        }else if(company === ''){
          alert("Your company name updated to your first name")

        }else if (profile.fname == fname && profile.lname == lname && profile.email == email && profile.company == company){
            return alert("No update, the same data")
          }
          
          setIsLoading(true)
          try {
            await axiosInstance.post("/users/profile/update", {
              user_id,
              role,
              fname, 
              lname, 
              email, 
              company, 
            }, { headers: {authorization: "Bearer " + token} })

          setIsLoading(false)
          setChild(childType.PROFILE_DATA)
          alert("Profile updated successfully!")
          
        } catch (error) {
          setIsLoading(false)
          setDbError(error.response?.data?.msg || error.message)
          console.log(error)
        }
      }
    
  return (
    <section className="flex w-full flex-grow ">
      <div className="flex flex-col w-5/6 bg-white ml-auto mr-auto mt-4 mb-6 gap-4 p-5 border-2 border-gray-400">
        
        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">First name</label>
          <input type="text" defaultValue={profile.fname} ref={fnameRef} className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Last name</label>
          <input type="text" defaultValue={profile.lname} ref={lnameRef} className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Email</label>
          <input type="email" defaultValue={profile.email} ref={emailRef} className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>

        {
          role === "Employer" &&
        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Company</label>
          <input className="flex-1 p-2 border-2 border-gray-400 ml-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" type="text" defaultValue={profile.company} ref={companyRef} />
        </div>
        }

        {fieldError && <p className='text-center italic bold text-red-600'>{fieldError}</p>}
        {dbError && <p className='text-center italic bold text-red-600'>{dbError}</p>}

        <div className="flex gap-4 justify-around">
          <button onClick={handleUpdate} disabled={isLoading} className="w-36 h-12 bg-blue-800 rounded-md"> 
            {
              isLoading ? <> <ClipLoader size={20} /> Please wait...</> : <> Update </>
            }
          </button>
          <button onClick={ () => { setChild( childType.PROFILE_DATA )} } className="w-36 h-12 bg-blue-800 rounded-md"> Cancel </button>
        </div>

      </div>
    </section>
  );
};

export default UpdateProfile;
