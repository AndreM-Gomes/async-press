import React, { useEffect, useState } from "react";

import "./styles.css";

const SidebarTags = () => {
  const [hashLikedList, setHashLikedList] = useState([]);

  useEffect(() => {});

  return (
    <section className="tags">
      <h5>My Tags</h5>
      <ul>
        <li className="tag-item">teste</li>
      </ul>
      <h5>Other Popular Tags</h5>
      <ul></ul>
    </section>
  );
};

export default SidebarTags;
