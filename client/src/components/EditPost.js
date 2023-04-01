import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'


import "react-quill/dist/quill.snow.css"
import { Navigate, useParams } from 'react-router-dom';
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
export default function EditPost() {
  const [title, settitle] = useState("")
  const [summary, setsummary] = useState("")
  const [content, setcontent] = useState("")
  const [file, setfile] = useState("")
  const { id } = useParams();
  // console.log(id);
  const getAlldata = async () => {
    const res = await fetch("http://localhost:4000/post/" + id)
    const data = await res.json();
    settitle(data.title)
    setsummary(data.summary)

    setcontent(data.content)


  }
  useEffect(() => {
    getAlldata();

  }, [])

  const [redirect, setredirect] = useState(false)
  const updatePost = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("id",id)
    if (file?.[0]) {
      data.set("file", file?.[0])
    }
    await fetch("http://localhost:4000/update",{
      method:"PUT",
      body:data,
      credentials:"include"
    })
    setredirect(true)
  }

  if (redirect) {
    return <Navigate to={"/post/"+id} /> 
  }
  return (
    <form onSubmit={updatePost}>
      <h2>Update Your Post</h2>
      <input type="text" name="" id="" placeholder='Title' value={title} onChange={(e) => { settitle(e.target.value) }} />
      <input type="summary" name="" id="" placeholder='Summary' value={summary} onChange={(e) => { setsummary(e.target.value) }} />
      <input type="file" onChange={(e) => { setfile(e.target.files) }} />
      <ReactQuill value={content} modules={modules} formats={formats} onChange={(newvalue) => { setcontent(newvalue) }} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  )
}
