import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'


const Header = () => {
  return  (
    <div className="headerBar">
      <input className="search-box" placeholder='Search...'/>

      <Link to='/write'><button className='main btnHeader'>Write a post</button></Link>
      <img src="user.jpeg" alt="" className="imgMask"/>
    </div>
  )
}

export default Header