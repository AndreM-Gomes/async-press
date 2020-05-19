import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import './styles.css'

export default function Login() {
    return(
      <div className="container">
        <div className="card login">
            <form>
              <input type='email' placeholder='e-mail'/>
              <input type='password' placeholder='Senha'/>
              <button className='main' type='submit' value='Cadastrar'>Login</button>
            </form>
            >Me cadastar
        </div>
      </div>
    )
}