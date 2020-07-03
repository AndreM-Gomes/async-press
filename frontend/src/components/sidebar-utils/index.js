import React, {useState}from 'react'
import firebase from 'firebase/app'
import {FiArchive, FiList, FiMic, FiVideo, FiTag} from 'react-icons/fi'

import './styles.css'

const SidebarUtils = () => {
  const [user, setUser] = useState(null)

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user)
    } else {

    }
  })

  return (
    <section className='leftList'>
      <ul>
        <li className='item user'>
          {user && <>
            <img src={user.photoURL} alt="User" className="imgMask"/>
            <div>
              <strong>{user.displayName}</strong>
              <p>@incognitadev</p>
            </div>
          </>}
        </li>   
        <li className='item'><FiArchive size={18} className='icon'/>Reading list<span className="notify"></span></li>
        <li className='item'><FiList size={18} className='icon'/>Listings<span className="notify"></span></li>
        <li className='item'><FiMic size={18} className='icon'/>Podcasts<span className="notify"></span></li>
        <li className='item'><FiVideo size={18} className='icon'/>Videos<span className="notify"></span></li>
        <li className='item'><FiTag size={18} className='icon'/>Tags<span className="notify"></span></li>
        <li className='item'>more...</li>
      </ul>
    </section>
  )
}

export default SidebarUtils