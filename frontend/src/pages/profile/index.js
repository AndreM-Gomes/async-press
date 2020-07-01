import React, {useState, useEffect} from 'react'
import  {useHistory} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'
import api from '../../services/api'

export default function Profile(){
  const [userInfo, setUserInfo] = useState([])

  const history = useHistory()
  
  useEffect(() => {
    api.get('http://localhost:3000/user/profile').then(r => r.json()).then(user => setUserInfo(user))
  })
 
    return(
      <div className="container">
        <Header/>
          <div className='card profile'>
            <img src='user.jpeg' className='imgMask' alt='user'/>
            <div className='user-info'>
              <h1>{userInfo.username}</h1> 
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
    else {
      history.push('/register')
      return null
    }
}