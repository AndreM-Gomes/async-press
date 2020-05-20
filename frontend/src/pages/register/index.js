import React, {Component} from 'react'


export default class Register extends Component{
  render(){
    return (
      <div className="container">
        <div className="card register">
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
}