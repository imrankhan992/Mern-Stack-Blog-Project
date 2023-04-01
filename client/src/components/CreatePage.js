import React, { useState } from 'react'
import ReactQuill from 'react-quill'


import "react-quill/dist/quill.snow.css"
import { Navigate } from 'react-router-dom';
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]
export default function CreatePage() {
  const [title, settitle] = useState("")
  const [summary, setsummary] = useState("")
  const [content, setcontent] = useState("")
  const [file, setfile] = useState("")
  const [redirect, setredirect] = useState(false)
  const createNewPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("file",file[0])


    const res = await fetch("http://localhost:4000/createpost", {
      credentials:"include",
      method: "POST",
      body: data,
    });

    if (res.status===200) {
      setredirect(true)
    }
  }

  if (redirect) {
     return <Navigate to={"/"}/>
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="text" name="" id="" placeholder='Title' value={title} onChange={(e) => { settitle(e.target.value) }} />
      <input type="summary" name="" id="" placeholder='Summary' value={summary} onChange={(e) => { setsummary(e.target.value) }} />
      <input type="file" onChange={(e)=>{setfile(e.target.files)}}/>
      <ReactQuill value={content} modules={modules} formats={formats} onChange={(newvalue) => { setcontent(newvalue) }} />
      <button style={{ marginTop: "5px" }}>Create post</button>
    </form>
  )
}
