import React from 'react'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase'

import './styles.css'


export default function Dashboard(){

  const user = firebase.auth().currentUser
  
  const history = useHistory()
  
  if(user){
    return(
      <div>
      </div>
    )
  }else{
    history.push('/register')
    return null
  }
}