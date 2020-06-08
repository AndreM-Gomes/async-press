import React from 'react'
import { Link } from 'react-router-dom'
import {FiMessageCircle, FiBell} from  'react-icons/fi'

import './styles.css'


const Header = () => {
  return  (
    <div className="headerBar">
      <div className='left-group'>
        <Link to='/' className='logo'><span></span></Link>
        <input className="search-box" placeholder='Search...'/>
      </div>
      <div className='rigth-group'>
        <Link to='/write' className='write'><button className='main btnHeader'>Write a post</button></Link>
        <FiMessageCircle size={25} className='icon'/>
        <FiBell size={25} className='icon'/>
        <img src="user.jpeg" alt="" className="imgMask"/>
      </div>
    </div>
  )
}

export default Header