import React from 'react'


import './styles.css'

const Header = () => {
  return  (
    <div className="headerBar">
      <input className="search-box" placeholder='Search...'/>

      <button className='main btnHeader'>Write a post</button>
      <img src="user.jpeg" alt="" className="imgMask"/>
    </div>
  )
}

export default Header