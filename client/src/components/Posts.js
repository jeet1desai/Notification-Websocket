import React from "react";
import { Socket } from "socket.io-client";

const Posts = ({ posts }) => {
  const postLiked = (id) => Socket.emit("postLiked", id);

  return (
    <div className="articles__container">
      <h1>Recent Articles</h1>
      {posts.map((post) => (
        <div className="article" key={post.id}>
          <h2>{post.title}</h2>
          <p className="article__content">{post.content}</p>
          <div className="likeBtn__container">
            <p className="likeBtn" onClick={() => postLiked(post.id)}>
              <span role="img" aria-label="like">
                👍
              </span>
            </p>
            <p>1</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
