import React from 'react';
import Header from './components/header'
import Routes from './routes'

import './global.css'

function App() {
  return (
    <div className='App'>
      <Routes/>
      <Header/>
    </div>
  );
}

export default App;
