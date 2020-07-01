import React, {useState, useEffect} from 'react';
import Header from '../../components/header'
import api from '../../services/api'
import firebase from 'firebase/app'
import {FiMessageSquare, FiHeart, FiArchive, FiList, FiMic, FiVideo, FiTag} from 'react-icons/fi'

import './styles.css';
import Sidebar from '../../components/sidebar';

export default function Home() {
  const [buttonClass, setButtonClass] = useState('feed-button')
  const [postList, setPostList] = useState([])
  const [firstPost, setFirstPost] = useState([])
  const [user, setUser] = useState(null)

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
      setUser(user)
      // ...
    } else {
      // User is signed out.
      // ...
    }
  })

  useEffect(()=>{
      api.get('/post/latest').then(response => {setPostList(response.data)})
  })

  function handleClick(e){
    
  }
  return(
    <div className='container'>
        <Header/>
        <Sidebar/><section className='leftList'>
          <ul>
            <li className='item user'>
            {user && <>
              <img src={user.photoURL} alt="User" className="imgMask"/>
              <div>
                <strong>{user.displayName}</strong>
                <p>@incognitadev</p>
              </div>
            </>}
            </li>   
            <li className='item'><FiArchive size={18} className='icon'/>Reading list<span className="notify"></span></li>
            <li className='item'><FiList size={18} className='icon'/>Listings<span className="notify"></span></li>
            <li className='item'><FiMic size={18} className='icon'/>Podcasts<span className="notify"></span></li>
            <li className='item'><FiVideo size={18} className='icon'/>Videos<span className="notify"></span></li>
            <li className='item'><FiTag size={18} className='icon'/>Tags<span className="notify"></span></li>
            <li className='item'>more...</li>
          </ul>
        </section>
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
        <section className="stories">
          <h4>Stories</h4>
           <ul>
            <ul className="storie-item"><li >Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>
            <ul className="storie-item"><li >Lorem ipsum dolor sit amet consectetur adipisicing elit. sjkdasdjhhdshfjdkshfsjdkfhjkdshf jfhsdkjfh sdjf </li></ul>
            <ul className="storie-item"><li >Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>
            <ul className="storie-item"><li >Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>
            <ul className="storie-item"><li >Lorem ipsum dolor sit amet consectetur adipisicing elit.</li></ul>
           </ul>
           <div>
           <button className='main'>Share Your Project</button>
           </div>
           <div>
           <button className='secundary'>See All Posts</button>
           </div>
        </section>
      </div>
  )
}