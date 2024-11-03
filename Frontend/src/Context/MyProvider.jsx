import React, { useState } from 'react'
import { createContext } from 'react'

export const MyContext = createContext();

export default function MyProvider({children}) {

    const [loginredirect, setLoginredirect] = useState(false);
    const [userid, setUserId] = useState(localStorage.getItem("id") || null);
    const [redirect, setRedirect] = useState(localStorage.getItem("redirect") || null);
    const [profile, setProfile] = useState(localStorage.getItem("profile") || null);

  return (
    <MyContext.Provider value={{loginredirect,setLoginredirect,redirect,setRedirect, profile, setProfile,userid, setUserId}}>{children}</MyContext.Provider>
  )
}
