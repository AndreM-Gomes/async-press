import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/home'
import Write from './pages/write'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import Dashboard from './pages/dashboard'
import Post from './pages/post'

export default function Routes(){

  return (
    <BrowserRouter>
      <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/write' component={Write}/>
          <Route path='/login' component={Login}/>
          <Route path='/post' component={Post}/>
          <Route path='/register' component={Register}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/profile' component={Profile}/>
      </Switch>
    </BrowserRouter>
  )
}