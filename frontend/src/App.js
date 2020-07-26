import React from "react";
import Routes from "./routes";
import firebase from "firebase";

import { fbInit } from "./services/auth";

import "./global.css";

function App() {
  fbInit();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user.getIdToken(true).then(function (idToken) {
        localStorage.setItem("token", idToken);
      });
    } else {
    }
  });

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
