import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";

import "./styles.css";
import Header from "../../components/header";

export default function Register() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    if (password === passwordConfirm) {
      setError(null);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(history.push("/complete-user"))
        .catch(function (error) {
          setError({ message: error.message, Code: error.code });
        });
    } else {
      setError({ message: "Senhas não Conferem", Code: "1" });
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="card login">
        <form onSubmit={handleRegister}>
          <input
            type="Email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="field-group">
            <input
              className="field"
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="field"
              type="password"
              placeholder="Confirme a senha"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          {error ? <p>errorMessage</p> : <></>}
          <button className="main" type="submit" value="Login">
            Login
          </button>
        </form>
        <Link to="login-by/login" className="link">
          Fazer Login
        </Link>
      </div>
    </div>
  );
}
