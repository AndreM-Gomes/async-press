import React from "react";
import { FiHeart, FiBookmark } from "react-icons/fi";

import Header from "../../components/header";
import PostPage from "../../components/post/PostPage";
import UserPostInfo from "../../components/post/UserPostInfo";
import SuggestionCard from "../../components/post/SuggestionCard";

import "./styles.css";

export default function Post(props) {
  return (
    <div className="container">
      <Header />
      <div className="actions">
        <FiHeart size={30} />
        <FiBookmark size={30} />
      </div>
      <PostPage id={props.match.params.id} />
      <section className="section-post-info">
        <UserPostInfo />
        <SuggestionCard />
      </section>
    </div>
  );
}
