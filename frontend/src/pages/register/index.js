import React, {useState} from 'react'

import {Link, useHistory} from 'react-router-dom'
import firebase from 'firebase/app'

import './styles.css'
import Header from '../../components/header'
import api from  '../../services/api'

export default function Register(){
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [user, setUser] = useState(null)
  
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
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  const facebookProvider = new firebase.auth.FacebookAuthProvider()
  const githubProvider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      setUser({displayName,email,emailVerified,photoURL,isAnonymous,uid,providerData})
      // ...
    } else {
      // User is signed out.
      // ...
    }
    catch (err){
      console.log('error')
  });
  

 function handleSingin(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).then(verifyNewUser()).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  function verifyNewUser(){
    const data = {
      email
    }
    api.get('/user', data).then(history.push('/')).catch(history.push('/complete-user'))
  }

  async function handleRegister(e){
    e.preventDefault()

    firebase.auth().createUserWithEmailAndPassword(email, password).then(history.push('/complete-user')).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });


  }

  if(user == null){
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