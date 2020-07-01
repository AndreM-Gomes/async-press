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
          <div className="auth-container">
            <h2>Sing in with</h2>
            <button className='Github' onClick={() =>handleSingin(githubProvider)}><span></span>Github</button>
            <button className='Facebook' onClick={() =>handleSingin(facebookProvider)}><span></span>Facebook</button>
            <button className='Google' onClick={() =>handleSingin(googleProvider)}><span></span>Google</button>
            <button className='Email' onClick={() => 'ten'}><span></span>Email</button>
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <div className="container">
        <Header/>
        <div className="card register">
          <h1>Você ja tem nossa confiança!</h1>
          <Link to='/'><button className='main'>Explorar Posts</button></Link>
        </div>
      </div>
    )
  }
}