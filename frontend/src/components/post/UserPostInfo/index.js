import React from "react";

import "./styles.css";

function UserPostInfo() {
  return (
    <div className="user-post-info card">
      <div className="header">
        <img src="user.jpeg" className="imgMask" alt="user" />
        <h4>OIncognita</h4>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sunt,
        cumque fuga adipisci voluptas quam corporis eos animi libero tempora
        quibusdam facilis{" "}
      </p>
      <button className="main">Follow</button>
      <h5>Work</h5>
      <p></p>
      <h5>Location</h5>
      <p></p>
      <h5>Education</h5>
      <p></p>
      <h5>Joined</h5>
      <p></p>
    </div>
  );
}

export default UserPostInfo;
