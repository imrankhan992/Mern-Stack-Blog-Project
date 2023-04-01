import React, { useContext, useEffect, useState } from 'react'
import { userContext } from "./userContext";
export default function Myprofile() {
    const { userinfo } = useContext(userContext);
    const [owndata, setowndata] = useState([])
    const getprofiledata = async ()=>{
        const res = await fetch("http://localhost:4000/myprofile",{
            method:"POST",
            credentials:"include",
            body:JSON.stringify({
                username:userinfo.id
            })
        })
        const data = await res.json();
        
        setowndata(data)
        console.log(data);
    }
    useEffect(() => {
      getprofiledata()
    }, [])
    
  return (
    <div>
      <div className='editprofile'>
     <input type='text' value={userinfo.username}/>
     <button type='button'>Edit User name</button>
     <button type='button' className='deletebtn'>Delete Account</button>
    </div>
      <h1>All Your Post</h1>
      {owndata? owndata.map((data, index) => (
      <div key={index} >
        <p className='posts' >
       {index+1 }.{ data.title}
      </p>
      </div>
    )):<p>"No Post Avaliable"</p>}
    
    </div>

  )
}
