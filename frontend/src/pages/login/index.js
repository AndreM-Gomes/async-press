import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'
import api from '../../services/api'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    async function handleLogin(e) {
      e.preventDefault()

      const data = {
          email,
          password,
      };

      try {
        await api.post('auth/login', data)
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
              <input type='email' placeholder='e-mail' onChange={e => setEmail(e.target.value)}/>
              <input type='password' placeholder='Senha' onChange={e => setPassword(e.target.value)}/>
              <button className='main' type='submit' value='Login'>Login</button>
            </form>
            <Link to='/register' className='link'>Me cadastar</Link>
        </div>
      </div>
    )
}