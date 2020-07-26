import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import api from "../../../services/api";

import "./styles.css";

function PostPage(props) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const { id } = props.id;
    api.get(`/post/${id}`).then((response) => {
      setPost(response.data);
    });
  });

  return (
    <div className="card post-page">
      <h1>{post.title}</h1>
      <ul className="post-tags ">
        <li>#Pandemy</li>
        <li>#Health</li>
        <li>#Test</li>
      </ul>
      <img src="user.jpeg" alt="" className="imgMask" />
      <ReactMarkdown source={post.content} />
    </div>
  );
}

export default PostPage;
