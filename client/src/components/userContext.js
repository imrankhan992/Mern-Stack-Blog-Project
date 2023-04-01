import React, { createContext, useState } from 'react'
export const userContext = createContext({});
export function UserContextProvider({ children }) {
    const [userinfo, setuserinfo] = useState({})
    return (
        <userContext.Provider value={{ userinfo, setuserinfo }}>
            {children}
        </userContext.Provider>
    )
}
