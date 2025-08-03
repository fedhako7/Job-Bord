import React, { createContext, useEffect, useState } from 'react'
export const frequentDatas = createContext('')

function ContextProvider({ children }) {

  const [user_id, setUserId] = useState(() => localStorage.getItem("user_d") || null);
  const [isRoleSet, setIsRoleSet] = useState(undefined)
  const val = { user_id, setUserId, isRoleSet, setIsRoleSet}
  
  // use effect to set user_id to local storage
  useEffect(() => {
    const stored_user_id = localStorage.getItem("user_id");
    if (stored_user_id) setUserId(stored_user_id);
  }, []);

  return <frequentDatas.Provider value={val} >{children}</frequentDatas.Provider>
}

export default ContextProvider