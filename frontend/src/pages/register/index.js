import React, {Component} from 'react'

import './styles.css'

export default class Register extends Component{
  render(){
    return (
      <div className="container">
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
            <a>Fazer Login</a>
        </div>
      </div>
    )
  }
}