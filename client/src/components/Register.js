import React, { useState } from 'react'

export default function Register() {
  const [user, setuser] = useState({ username: "", password: "" })
  const inputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value })


  }
  const submitForm = async (e) => {
    e.preventDefault();
    const { username, password } = user;
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json "
      }
    })

    if (res.status === 200) {
      alert("Registration Successfully")
    }else{
      alert("Regestration failed")
    }
  }
  return (
    <form className='register'>
      <h1>Register</h1>
      <input type="text" placeholder='Username' name="username" onChange={inputChange} />
      <input type="password" placeholder='Password' name='password' onChange={inputChange} />
      <button onClick={submitForm}>Register</button>
    </form>
  )
}
