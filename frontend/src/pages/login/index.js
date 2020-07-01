import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import * as firebase from 'firebase/app'

import './styles.css'
import Header from '../../components/header'
import api from '../../services/api'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    async function handleLogin(e) {
      e.preventDefault()

      const data = {
          username,
          password,
      };

      try {
        const token = await api.post('auth/login', data).then(response =>  response.data)
        login(token)
        history.push('/')
      }
      catch (err) {
        alert('login ou senha incorretos')
      }

    }

    return(
      <div className="container">
        <Header/>
        <div className="card login">
            <form onSubmit={handleLogin}>
              <input type='text' placeholder='username' onChange={e => setUsername(e.target.value)}/>
              <input type='password' placeholder='Senha' onChange={e => setPassword(e.target.value)}/>
              <button className='main' type='submit' value='Login'>Login</button>
            </form>
            <Link to='/register' className='link'>Me cadastar</Link>
        </div>
      </div>
    )
}