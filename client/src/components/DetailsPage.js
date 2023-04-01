import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loading from "../loading.gif";
import { userContext } from "./userContext";
export default function DetailsPage() {
  const [postinfo, setpostinfo] = useState(null);
  const [loadingBar, setloadingBar] = useState(false);
  const { userinfo } = useContext(userContext);

  const { id } = useParams();
  console.log(id);
  const getPageDetails = async () => {
    setloadingBar(true);
    const res = await fetch("http://localhost:4000/post/" + id);
    const data = await res.json();
    setpostinfo(data);
    setloadingBar(false);
  };
  useEffect(() => {
    getPageDetails();
  }, []);
  if (!postinfo) {
    return <img src={loading} alt="" className="loaderimage" />;
  }
  return (
    <div className="post-page">
      <h1>{postinfo.title}</h1>
      <time>{format(new Date(postinfo.createdAt), "yyyy-MM-dd")}</time>
      <div className="author">by @{postinfo.author.username}</div>
      {userinfo.id === postinfo.author._id && (
        <div className="edit-row">
          <Link to={"/post/edit/"+postinfo._id} className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit This Post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${postinfo.cover}`} />
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postinfo.content }}
      />
    </div>
  );
}
