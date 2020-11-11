import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import Home from "./pages/home";
import Write from "./pages/write";
import Login from "./pages/login";
import Register from "./pages/register";
import LoginProvider from "./pages/LoginProviders";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import Post from "./pages/post";
import Page404 from "./pages/page404";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/registerProvider/register",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const SignRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect
          to={{
            pathname: "/registerProvider/register",
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/post/:id" component={Post} />
        <SignRoute path="/login-by/login" component={Login} type='Login'/>
        <SignRoute path="/register-by/register" component={Register} type='Register'/>
        <SignRoute path="/login-by" component={LoginProvider} />
        <SignRoute path="/register-by" component={LoginProvider} />
        <PrivateRoute path="/write" component={Write} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/*" component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}
