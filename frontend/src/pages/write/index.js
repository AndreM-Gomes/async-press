import React from 'react'
import {useHistory} from 'react-router-dom'

import './styles.css'
import Header from '../../components/header'

export default function Write()  {

    const history = useHistory()

    const [loged] = useAuth()

    if(!loged){
      return(
        <div>
          <Header/>
          <div className='write-page'>
            <imput></imput>
          </div>
        </div>
      )
    }
    else {
      history.push('/register')
      return null
    }
}