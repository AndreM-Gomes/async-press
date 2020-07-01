import React , {useState}from 'react'
import { Link } from 'react-router-dom'
import {FiMessageCircle, FiBell} from  'react-icons/fi'
import firebase from 'firebase/app'


import './styles.css'

const Header = () => {
  const [user, setUser] = useState({})

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setUser(user)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

  return  (
    <div className="headerBar">
      <div className='left-group'>
        <Link to='/' className='logo'><span></span></Link>
        <input className="search-box" placeholder='Search...'/>
      </div>
      <div className='rigth-group'>
        <Link to='/write' className='write'><button className='main btnHeader'>Write a post</button></Link>
        <div>
          <span className='notify'></span>
          <FiMessageCircle size={25} className='icon'/>
        </div>
        <div>
          <span className='notify'></span>
          <FiBell size={25} className='icon'/>
        </div>
        {user &&
        <img src={user.photoURL} alt="" className="imgMask"/>
        }
      </div>
    </div>
  )
}

export default Header