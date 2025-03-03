import React, { useContext, useEffect, useState } from "react";
import { profileMode } from "./Profile";
import axiosInstance from "../../axios/Axios";
import { childType } from "./childType";
import ButtonComponent from "../smallComponents/ButtonComponent";

const ProfileData = () => {
  const { child, setChild, profile, setProfile } = useContext(profileMode)
  const token = localStorage.getItem("token")
  const user_id = parseInt(localStorage.getItem("user_id"))
  const role = parseInt(localStorage.getItem("role"))
  const [dbError, setDbError] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/users/profile", {
        params: { user_id },
        headers: { authorization: "Bearer " + token }
      })
      setProfile(response?.data?.user)
      setIsFetching(false)

    } catch (error) {
      setIsFetching(false)
      setDbError(error.response?.data?.msg || error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [child])
  return (
    <section className="flex w-full flex-grow ">
      <div className="flex flex-col w-5/6 bg-white ml-auto mr-auto mt-4 mb-6 gap-4 p-5 border-2 border-gray-400">

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">First name</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{profile.fname}</p>
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Last name</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{profile.lname}</p>
        </div>

        <div className='flex flex-col'>
          <label className="text-lg text-gray-800 font-semibold">Email</label>
          <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{profile.email}</p>
        </div>

        {
          role === "Employer" &&
          <div className='flex flex-col'>
            <label className="text-lg text-gray-800 font-semibold">Company</label>
            <p className="pl-3 mt-2 text-lg text-blue-800 font-sarif font-medium">{profile.company}</p>
          </div>
        }

        <div className="flex gap-4 justify-around">
          <ButtonComponent
            handleClick={() => { setChild(childType.UPDATE_PROFILE) }}
            buttonName={'Update Profile'}
          />
          <ButtonComponent
            handleClick={() => { setChild(childType.UPDATE_PROFILE) }}
            buttonName={'Change Password'}
          />
        </div>

      </div>
    </section>
  );
};

export default ProfileData;
