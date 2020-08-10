import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as firebase from "firebase/app";

import "./styles.css";
import Header from "../../components/header";
import api from "../../services/api";
import Input from "../../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <div className="container">
      <Header />
      <div className="card login">
        <form onSubmit={handleLogin}>
          <Input
            type="Email"
            label="Email"
            value={email}
            placeholder="yourname@provider.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="main" type="submit" value="Login">
            Login
          </button>
        </form>
        <Link to="/register" className="link">
          Me cadastar
        </Link>
      </div>
    </div>
  );
}
