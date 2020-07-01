import React from 'react'
import {useHistory} from 'react-router-dom'

import './styles.css'


export default function Dashboard(){

  const history = useHistory()
  
    return(
      <div>
      </div>
    )
  }else{
    history.push('/register')
    return null
  }
}