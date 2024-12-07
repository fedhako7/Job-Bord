import React, { createContext, useState } from 'react'
export const frequentDatas = createContext('')

function ContextProvider({children}) {
  const [user_id, setUserId] = useState(null)
  return <frequentDatas.Provider value={{user_id, setUserId}} >{children}</frequentDatas.Provider>
}

export default ContextProvider