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
      <profileMode.Provider value={{updateMode, setUpdateMode, profile, setProfile}}>
      {
        updateMode ? <UpdateProfile prevs={prevs} /> : <ProfileData />
        }
        </profileMode.Provider>
    </section>
  );
};

export default Profile;
