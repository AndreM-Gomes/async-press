import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

import "./styles.css";
import Header from "../../components/header";
import api from "../../services/api";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const {type} = props.type

  const history = useHistory();

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GoogleAuthProvider();

  function handleSignIn(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        setEmail(result.user.email);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .then(() => verifyNewUser())
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  function verifyNewUser() {
    const data = {
      email,
    };
    api
      .get("/login", data)
      .then(history.push("/"))
      .catch(history.push("register/complete-user"));
  }

  return (
    <div className="container">
      <Header />
      <div className="card register">
        <div className="auth-container">
          <h2>Sing in with</h2>
          <button
            className="Github"
            onClick={() => handleSignIn(githubProvider)}
          >
            <span></span>Github
          </button>
          <button
            className="Facebook"
            onClick={() => handleSignIn(facebookProvider)}
          >
            <span></span>Facebook
          </button>
          <button
            className="Google"
            onClick={() => handleSignIn(googleProvider)}
          >
            <span></span>Google
          </button>
          <button
            className="Email"
            onClick={() => history.push(`${type}-by\${type}`)}
          >
            <span></span>Email
          </button>
        </div>
      </div>
    </div>
  );
}
