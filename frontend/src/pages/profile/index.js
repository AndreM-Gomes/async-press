import React from 'react'

import './styles.css'
import Header from '../../components/header'

export default function Profile(){
  
    return(
      <div className="container">
        <Header/>
          <div className='card profile'>
            <img src='user.jpeg' className='imgMask' alt='user'/>
            <div className='user-info'>
              <h1>IncognitaDev</h1> 
              <button>EDIT PROFILE</button>
              <p>404 bio not found</p>
              <div className='social-links'></div>
            </div>
            <div className='bar'></div>
            <div className='since'>
              <h4>since</h4>
              <h3>04/03/2020</h3>
            </div>
          </div>  
      </div>
    )
  
}