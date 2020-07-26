import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiBell } from "react-icons/fi";
import firebase from "firebase/app";

import "./styles.css";

const Header = () => {
  const [user, setUser] = useState({});

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
    }
  });

  return (
    <div className="headerBar">
      <div className="left-group">
        <Link to="/" className="logo">
          <span></span>
        </Link>
        <input className="search-box" placeholder="Search..." />
      </div>
      <div className="right-group">
        <Link to="/write" className="write">
          <button className="main btnHeader">Write a post</button>
        </Link>
        <div>
          <span className="notify"></span>
          <FiMessageCircle size={25} className="icon" />
        </div>
        <div>
          <span className="notify"></span>
          <FiBell size={25} className="icon" />
        </div>
        {user ? (
          <div className="dropdown">
            <img src={user.photoURL} alt="" className="imgMask" />
            <div className="dropdown-content">
              <Link to="/profile">{user.displayName}</Link>
            </div>
          </div>
        ) : (
          <div className="dropdown">
            <div className="dropdown-content">
              <Link to="/login-by/">
                <button className="main">Fazer Login</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
