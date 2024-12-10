import React, { createContext, useState } from "react";
import ProfileData from "./ProfileData";
import UpdateProfile from "./UpdateProfile";
import ChangePass from "./ChangePass";
import { childType } from "./childType";
export const profileMode = createContext('')

const Profile = () => {
  const [child, setChild] = useState(childType.PROFILE_DATA)
  const [profile, setProfile] = useState('')

  return (
    <section >
      <div className='flex w-5/6 ml-auto mr-auto mt-8 justify-between font-semibold lg:w-3/4 lg:mt-14 '>
          <p className='w-full text-center text-4xl  pr-6'>
            {
              child === childType.UPDATE_PROFILE ? <>Update Profile</> :
              <>
              {
                child === childType.PROFILE_DATA ? <>Your Profile</> : <>Change Password</>
              }
              </>
            }
          </p>
      </div>
      
      <profileMode.Provider value={{child, setChild, profile, setProfile}}>
      {
        child === childType.PROFILE_DATA ? <ProfileData /> :
        <>{
          child === childType.UPDATE_PROFILE ?
         <UpdateProfile /> : <ChangePass />
        }</>
      }
        </profileMode.Provider>
    </section>
  );
};

export default Profile;
