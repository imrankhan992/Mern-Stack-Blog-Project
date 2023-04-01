import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { userContext } from './userContext';

export default function LoginPage() {
  const [User, setUser] = useState({ username: "", password: "" });
  const [redirect, setredirect] = useState(false)
  const {setuserinfo}= useContext(userContext)
  const handleChangeText = async (e) => {

    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...User, [name]: value })
  }
  const LoginfromSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = User;
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });
      if (res.status === 200) {
        const data = await res.json();
       
        setuserinfo(data)
        setredirect(true)
      } else {
        alert("Wrong Credientials")
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />
  }
  return (
    <form className='login' onSubmit={LoginfromSubmit}>
      <h1>Login</h1>
      <input type="text" placeholder='Username' name='username' onChange={handleChangeText} />
      <input type="password" placeholder='Password' name='password' onChange={handleChangeText} />
      <button>Login</button>
    </form>
  )
}
