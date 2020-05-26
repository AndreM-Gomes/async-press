<<<<<<< HEAD
import React from 'react'
=======
import React, {Component} from 'react'
<<<<<<< HEAD


export default class Register extends Component{
  render(){
    return (
      <div className="container">
        <div className="card login">
            <form>
              <input placeholder='Name'/>
              <input type='email' placeholder='e-mail'/>
              <div> 
                <input type='password' placeholder='Senha'/>
                <input type='password' placeholder='Senha'/>
              </div>
              <button className='main' type='submit' value='Cadastrar'>Login</button>
            </form>
            Fazer Login
        </div>
      </div>
    )
  }
=======
>>>>>>> master
import {Link} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'

export default function Register(){
    return (
      <div className="container">
        <Header/>
        <div className="card register">
            <form>
              <div className='input-group'>
                <input placeholder='Name'/>
                <input type="text" name="username" placeholder='userName'/>
              </div>
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

>>>>>>> a3f79090307b485c2f0ec279a4c281648ed75a80
}