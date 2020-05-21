import React from 'react'
import {Link} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'

export default function Register(){
    return (
      <div className="container">
        <Header/>
        <div className="card register">
            <form>
              <input placeholder='Name'/>
              <input type='email' placeholder='e-mail'/>
              <div className='input-group'> 
                <input type='password' placeholder='Senha'/>
                <input type='password' placeholder='Senha'/>
              </div>
              <button className='main' type='submit' value='Cadastrar'>Cadastrar</button>
            </form>
           <Link to='/login' className='link'>Fazer Login</Link>
        </div>
      </div>
    )

}