import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import api from '../../services/api'
import {FiMessageSquare, FiHeart} from 'react-icons/fi'

import './styles.css';
import Header from '../../components/header'
import SidebarTags from '../../components/sidebar-tags';
import SidebarUtils from '../../components/sidebar-utils'
import Stories from '../../components/stories'

export default function Home() {
  const [buttonClass, setButtonClass] = useState('feed-button')
  const [postList, setPostList] = useState([])
  const [firstPost, setFirstPost] = useState([])


  useEffect(()=>{
      api.get('/post/latest').then(response => {setPostList(response.data)})
  })

  function handleClick(e){
    
  }
  return(
    <div className='container'>
        <Header/>
        <SidebarTags/>
        <SidebarUtils/>
        <Stories/>
        <nav className='feed-bar'>
          <h3>Posts</h3>
            <ul>
              <li><div className={buttonClass} value='feed' onClick={e =>handleClick(e.target.value)}>Feed</div></li>
              <li><div className={buttonClass} value='week' onClick={e =>handleClick(e.target.value)}>Week</div></li>
              <li><div className={buttonClass} value='Month' onClick={e =>handleClick(e.target.value)}>Month</div></li>
              <li><div className={buttonClass} value='Year' onClick={e =>handleClick(e.target.value)}>Year</div></li>
              <li><div className={buttonClass} value='Infinty' onClick={e =>handleClick(e.target.value)}>Infinity</div></li>
              <li><div className={buttonClass} value='Latest' onClick={e =>handleClick(e.target.value)}>Latest</div></li>
            </ul>
        </nav>
        <div className='postList'>
          {postList.filter(post => post.index === 0).map(postFil =>(
            <div className='card post post_1'>
              <div className='mask'>
              </div>
              <div className='post-content'>
                <div className='post-info'>
                  <img src='user.jpeg' alt='user' className='imgMask'/>
                  <div>
                    <h6>{postFil.username}</h6>
                    <p>a</p>
                  </div>
                </div>
              <h1>{postFil.title}</h1>
              </div>
              <ul className="post-tags">
                <li>#Pandemy</li>
                <li>#Health</li>
                <li>#Test</li>
              </ul>
              <div className='post-footer'>
                <div className='action'>
                  <FiHeart size={18}/>
                  <p>{postFil.likesNumber} Reactions</p>
                  <FiMessageSquare size={18}/>
                  <p>Comments</p>
                </div>
                <p className='mins'>{postFil.minsToRead} mins to read</p>
                <button>Save</button>
              </div>
            </div>
          ))}
          {postList.filter(post => post.index !== 0).map(postFil => (
            <div className='card post'>
              <div className='post-info'>
                <img src='user.jpeg' alt='user' className='imgMask'/>
                  <div>
                    <h6>{postFil.user.username}</h6>
                    <p>01 data</p>
                  </div>
                </div>
              <div className='post-content'>
                <h1>{postFil.title}</h1>
              <div className="post-tags">
                <p className="tag">#Pandemy</p>
                <p className="tag">#Health</p>
                <p className="tag">#Test</p>
              </div>
              <div className='post-footer'>
                <div className='action'>
                  <FiHeart size={18}/> 
                  <p>{postFil.likesNumber} Reactions</p>
                  <FiMessageSquare size={18}/>
                  <p>Comments</p>
                </div>
                <p className='mins'>{postFil.minsToRead} mins to read</p>
                <button>Save</button>
              </div>
              </div>
            </div>
          ))}
        </div>
        <img src="https://dev-to-uploads.s3.amazonaws.com/i/got2x8dx1fu5xh00wsn8.png" alt="" className="g-image"/>
      </div>
  )
}