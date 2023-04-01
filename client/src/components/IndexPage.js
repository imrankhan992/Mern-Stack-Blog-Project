import React, { useEffect, useState } from "react";
import loading from "../loading.gif";
import Post from "../components/Post";

export default function IndexPage() {
  const [post, setpost] = useState([]);
  const [loadingBar, setloadingBar] = useState(false);
  const getAllPost = async () => {
    setloadingBar(true);
    const res = await fetch("http://localhost:4000/post", {
      method: "GET",
    });

    // setpost(res.json)
    const data = await res.json();
    setpost(data);
    setloadingBar(false);
  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      {loadingBar ? (
        <img src={loading} alt="" className="loaderimage" />
      ) : (
        post.length > 0 &&
        post.map((posts) => {
          return <Post {...posts} key={posts._id} />;
        })
      )}
    </>
  );
}
