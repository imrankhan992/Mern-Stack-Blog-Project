import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./userContext";

export default function Header() {
  const {userinfo,setuserinfo}=useContext(userContext)
  const fetchCookie = async () => {
    const res = await fetch("http://localhost:4000/profile", {
      credentials: "include"
    });
    const data = await res.json();
    setuserinfo(data)
   
  }
  useEffect(() => {
    fetchCookie();
  }, [])
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include"
      });
      setuserinfo(null)
      // console.log(userinfo);
      
    } catch (error) {
      console.log(error);
    }
  }
  const username=userinfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {
          username && (
            <>
            <a style={{cursor:"pointer"}}>Hello: <span>{userinfo.username}</span></a>
              <Link to="/createpost" className="createnewPost">Create new post</Link>
              <a onClick={logout} style={{cursor:"pointer",color:"red"}}>Logout</a>
              <div > <i className="fa-regular fa-user"></i><Link to="/myprofile" style={{marginLeft:"5px",cursor:"pointer"}}>My Profile</Link></div>
             
            </>
          )

        }
        {

          !username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )

        }

      </nav>
    </header>
  );
}
