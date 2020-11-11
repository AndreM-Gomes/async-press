import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FiMessageSquare, FiHeart } from "react-icons/fi";

import "./styles.css";
import Header from "../../components/header";
import SidebarTags from "../../components/home/sidebar-tags";
import SidebarUtils from "../../components/home/sidebar-utils";
import Stories from "../../components/home/stories";

export default function Home() {
  const [activeButton, setActiveButton] = useState("Feed");
  const [postList, setPostList] = useState([]);
  const [firstPost, setFirstPost] = useState([]);

  const buttonList = ["Feed", "Week", "Month", "Year", "Infinity", "Latest"];

  useEffect(() => {
    if (activeButton === "Feed") {
      api.get(`/post/${activeButton}`).then((response) => {
        setPostList(response.data);
      });
    } else {
      api.get(`/post/top?period=${activeButton}`).then((response) => {
        setPostList(response.data);
      });
    }
  });

  function handleClick(key) {
    setActiveButton(key);
  }

  return (
    <div className="container">
      <Header />
      <SidebarTags />
      <SidebarUtils />
      <Stories />
      <nav className="feed-bar">
        <h3>Posts</h3>
        <ul>
          {buttonList.map((key) => (
            <li key={key}>
              <div
                className={`feed-button ${
                  activeButton === key ? "selected" : ""
                } `}
                key={key}
                onClick={() => handleClick(key)}
              >
                {key}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="postList">
        {postList
          .filter((post, i) => i === 0)
          .map((postFil) => (
            <div className="card post post_1" key={postFil.id}>
              <div className="mask"></div>
              <div className="post-content">
                <div className="post-info">
                  <img src="user.jpeg" alt="user" className="imgMask" />
                  <div>
                    <h6>{postFil.username}</h6>
                    <p>a</p>
                  </div>
                </div>
                <h1>{postFil.title}</h1>
              </div>
              <ul className="post-tags">
                <li>#Pandemy</li>
                <li>#Health</li>
                <li>#Test</li>
              </ul>
              <div className="post-footer">
                <div className="action">
                  <FiHeart size={18} />
                  <p>{postFil.likesNumber} Reactions</p>
                  <FiMessageSquare size={18} />
                  <p>Comments</p>
                </div>
                <p className="mins">{postFil.minsToRead} mins to read</p>
                <button>Save</button>
              </div>
            </div>
          ))}
        {postList
          .filter((post) => post.index !== 0)
          .map((postFil) => (
            <div className="card post" key={postFil.id}>
              <Link to={`/post/${postFil.id}`}>
                <div className="post-info">
                  <img src="user.jpeg" alt="user" className="imgMask" />
                  <div>
                    <h6>{postFil.user.username}</h6>
                    <p>01 data</p>
                  </div>
                </div>
                <div className="post-content">
                  <h1>{postFil.title}</h1>
                  <div className="post-tags">
                    <p className="tag">#Pandemy</p>
                    <p className="tag">#Health</p>
                    <p className="tag">#Test</p>
                  </div>
                  <div className="post-footer">
                    <div className="action">
                      <FiHeart size={18} />
                      <p>{postFil.likesNumber} Reactions</p>
                      <FiMessageSquare size={18} />
                      <p>Comments</p>
                    </div>
                    <p className="mins">{postFil.minsToRead} mins to read</p>
                    <button>Save</button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
