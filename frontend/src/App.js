import React from 'react';
import Routes from './routes'
import {fbInit} from './services/auth'

import './global.css'

function App() {

  fbInit()
  
  return (
    <div className='App'>
      <Routes/>
    </div>
  );
}

export default App;
