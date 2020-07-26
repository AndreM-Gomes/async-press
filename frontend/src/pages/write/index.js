import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import "./styles.css";
import Header from "../../components/header";
import api from "../../services/api";

const converter = new Showdown.Converter({
  tables: true,
  simplifieldAutoLink: true,
  striketrough: true,
  tasklist: true,
});

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const history = useHistory();

  function handlePost() {
    api
      .post("user/post", {
        title,
        content,
      })
      .then(history.push("/"));
  }

  return (
    <div className="container">
      <Header />
      <div className="write-page card">
        <form action="submit">
          <input placeholder="title" onChange={setTitle}></input>
          <div className="editor">
            <ReactMde
              value={content}
              onChange={setContent}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          </div>
        </form>
        <div className="action">
          <button className="main" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
