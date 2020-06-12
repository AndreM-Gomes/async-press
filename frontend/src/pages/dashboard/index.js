import React from 'react'
import {useHistory} from 'react-router-dom'

import './styles.css'
import {useAuth} from '../../services/auth'


export default function Dashboard(){

  const history = useHistory()
  const loged = useAuth()
  
  if(loged){
    return(
      <div>
      </div>
    )
  }else{
    history.push('/register')
    return null
  }
}