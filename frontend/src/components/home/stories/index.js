import React from "react";

import "./styles.css";

const Stories = () => {
  return (
    <section className="stories">
      <h4>Stories</h4>
      <ul>
        <ul className="storie-item">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
        <ul className="storie-item">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            sjkdasdjhhdshfjdkshfsjdkfhjkdshf jfhsdkjfh sdjf{" "}
          </li>
        </ul>
        <ul className="storie-item">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
        <ul className="storie-item">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
        <ul className="storie-item">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
      </ul>
      <div>
        <button className="main">Share Your Project</button>
      </div>
      <div>
        <button className="secundary">See All Posts</button>
      </div>
    </section>
  );
};

export default Stories;
