import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Nav from "../components/Nav";
import Posts from "../components/Posts";
import NullPage from "./NullPage";

const PostPage = ({ socket }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    socket.on("posts", (data) => setPosts(data));
  }, []);

  return (
    <div>
      {localStorage.getItem("_username") ? (
        <>
          <Nav />
          <CreatePost socket={socket} />
          <Posts posts={posts} />
        </>
      ) : (
        <NullPage />
      )}
    </div>
  );
};

export default PostPage;
