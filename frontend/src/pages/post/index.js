import React , {useState, useEffect, useReducer}from 'react'
import ReactMarkdown from  'react-markdown'

import api from '../../services/api'
import Header from '../../components/header'
import './styles.css'
import { FiHeart, FiBookmark } from 'react-icons/fi'

export default function Post(){
  const [post, setPost] = useState([])
  const [title, setTitle] = useState('Esse é um teste')
  const [content, setContent] = useState("## Esse é so um Teste") 

  useEffect(()=>{
    api.get(`/post/` ).then(response => {setPost(response.data)})
  })

  return (
    <div className="container">
      <Header/>
      <div className='actions'>
        <FiHeart size={30}/>
        <FiBookmark size={30}/>
      </div>
      <div className="card post">
      <h1>{title}</h1>
      <ul className="post-tags ">
        <li>#Pandemy</li>
        <li>#Health</li>
        <li>#Test</li>
      </ul>
      <img src="user.jpeg" alt="" className='imgMask'/>
      <ReactMarkdown
        source={content}
      />
      </div>
      <section>

        <div className="user-post-info card">
          <div className='header'>
            <img src='user.jpeg' className='imgMask'/>
            <h4>OIncognita</h4>
          </div>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sunt, cumque fuga adipisci voluptas quam corporis eos animi libero tempora quibusdam facilis </p>
          <button className='main'>Follow</button>
          <h5>Work</h5>
          <p></p>
          <h5>Location</h5>
          <p></p>
          <h5>Education</h5>
          <p></p>
          <h5>Joined</h5>
          <p></p>
        </div>
        <div className='sugestion card'>
          <div className='header'>
            <h2>More from OIcognita</h2>
          </div>
        </div>
      </section>
    </div>
  )

}