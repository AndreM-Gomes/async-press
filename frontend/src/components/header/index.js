import React from 'react'

import './styles.css'

const Header = () => {
  return  (
    <div className="headerBar">
      <input className="search-box" value="Search..."/>

      <button className='button btnHeader'>Write Post</button>
      <div className='imgMask'>img</div>
    </div>
  )
}

export default Header