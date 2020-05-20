import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'

export default function Login() {
    return(
      <div className="container">
        <Header/>
        <div className="card login">
            <form>
              <input type='email' placeholder='e-mail'/>
              <input type='password' placeholder='Senha'/>
              <button className='main' type='submit' value='Cadastrar'>Login</button>
            </form>
            <Link to='/register' className='link'>Me cadastar</Link>
        </div>
      </div>
    )
}