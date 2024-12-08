import React, { createContext, useState } from "react";
import ProfileData from "./ProfileData";
import UpdateProfile from "./UpdateProfile";
export const profileMode = createContext('')

const Profile = () => {
  const [updateMode, setUpdateMode] = useState(false)
  const [profile, setProfile] = useState('')
  const prevs = {fname: "Astu", lname: "Tiyya", email: "Astu@gmail.com", company: "Abundance Solutions"}

  return (
    <section >
      <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
          <p className='w-full text-center text-4xl  pr-6'>
            {
              updateMode ? <>Update Profile</> : <>My Profile</>
            }
          </p>
      </div>
      <profileMode.Provider value={{updateMode, setUpdateMode, profile, setProfile}}>
      {
        updateMode ? <UpdateProfile prevs={prevs} /> : <ProfileData />
        }
        </profileMode.Provider>
    </section>
  );
};

export default Profile;
