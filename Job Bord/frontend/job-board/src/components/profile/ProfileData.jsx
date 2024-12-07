import React, { useContext, useEffect, useState } from "react";
import { profileMode } from "./Profile";
import axiosInstance from "../../axios/Axios";

const ProfileData = () => {
  const { updateMode, setUpdateMode, profile, setProfile } = useContext( profileMode )
  const token = localStorage.getItem("token")
  const user_id = parseInt(localStorage.getItem("user_id"))
  const [dbError, setDbError] = useState('')
  const [isFetching, setIsFetching] = useState(false)


  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile", {
        params: {user_id},
        headers: {authorization: "Bearer " + token} })
        const u = response?.data?.user
        u.company = "Astu tia"
        setProfile(u)
        setIsFetching(false)
        console.log(u)

    } catch (error) {
      setIsFetching(false)
      setDbError(error.response?.data?.msg || error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [updateMode])
  return (
    <section className="flex w-full flex-grow bg-gray-200">
      <div className="flex flex-col w-5/6 bg-white ml-auto mr-auto mt-4 gap-4 p-5 border-2 border-gray-400">

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">First name</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{ profile.fname}</p>
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Last name</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{profile.lname}</p>
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Email</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{ profile.email }</p>
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Company</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{ profile.company }</p>
        </div>

        <div className="flex gap-4 justify-around">
          <button onClick={() => { setUpdateMode((p) => !p)}} className="w-36 h-12 bg-blue-800 rounded-md">
            Update
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProfileData;
