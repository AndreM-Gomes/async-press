import React from 'react'

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
            <a>Me cadastar</a> 
        </div>
      </div>
    )
}