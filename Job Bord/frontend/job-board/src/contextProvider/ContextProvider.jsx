import React, { createContext, useEffect, useState } from 'react'
export const frequentDatas = createContext('')

function ContextProvider({ children }) {

  const [user_id, setUserId] = useState(() => localStorage.getItem("user_d") || null);
  useEffect(() => {
    const stored_user_id = localStorage.getItem("user_id");
    if (stored_user_id) setUserId(stored_user_id);
  }, []);

  return <frequentDatas.Provider value={{ user_id, setUserId }} >{children}</frequentDatas.Provider>
}

export default ContextProvider