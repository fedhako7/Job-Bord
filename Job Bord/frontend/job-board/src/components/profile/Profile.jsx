import React, { createContext, useState } from "react";
import ProfileData from "./ProfileData";
import UpdateProfile from "./UpdateProfile";
import ChangePass from "./ChangePass";
import { childType } from "./childType";
import PagesHeader from "../pagesHeader/PagesHeader";
export const profileMode = createContext('')

const Profile = () => {
  const [child, setChild] = useState(childType.PROFILE_DATA)
  const [profile, setProfile] = useState('')

  return (
    <section >
      <PagesHeader 
        pageHeader={
          child === childType.UPDATE_PROFILE ? 'Update Profile' :
          child === childType.PROFILE_DATA ? 'Your Profile' : 'Change Password'
        }
      />

      <profileMode.Provider value={{ child, setChild, profile, setProfile }}>
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
