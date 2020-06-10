import React, {useState} from 'react'

import {Link, useHistory} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'
import api from  '../../services/api'

export default function Register(){
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const history = useHistory()

  async function handleRegister(e){
    e.preventDefault()

    const data = {
      name,
      email,
      password,
      username,
    };

    try {
      await api.post('user', data)
      history.push('/')
    }
    catch (err){
      console.log('error')
    }
  }

    return (
      <div className="container">
        <Header/>
        <div className="card register">
            <form onSubmit={handleRegister}>
              <input placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
              <input type="text"  placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
              <input type='email' placeholder='e-mail' value={email} onChange={e => setEmail(e.target.value)}/>
              <div className='input-group'> 
                <input type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
                <input type='password' placeholder='Senha'/>
              </div>
              <button className='main' type='submit'>Cadastrar</button>
            </form>
           <Link to='/login' className='link'>Fazer Login</Link>
        </div>
      </div>
    )

}