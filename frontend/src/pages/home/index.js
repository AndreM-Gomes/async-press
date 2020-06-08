import React, {useState, useEffect} from 'react';
import Header from '../../components/header'
import {FiMessageSquare, FiHeart, FiArchive, FiList, FiMic, FiVideo, FiTag} from 'react-icons/fi'
import api from '../../services/api'


import './styles.css';
import PostServices from '../../services/posts/PostsServices'
import TagsServices from '../../services/TagsService'
import Sidebar from '../../components/sidebar';

export default function Home() {
  const [buttonClass, setButtonClass] = useState('feed-button')
  const [postList, setPostList] = useState([])
  const [hashList, setHashList] = useState([])
  const postservice = new PostServices()
  const tagservice = new TagsServices()


  useEffect(()=>{
    PostServices.getPosts().then(response =>{setPostList(response.posts)})

    // api.get('')
  })

  function handleClick(props){
    console.log(props)
  }


    return(
      
      <div className='container'>
        <Header/>
        <Sidebar/>
        <section className='leftList'>
          <ul>
            <li className='item user'>
              <img src='user.jpeg' alt="" className="imgMask"/>
              <div>
                <strong>IncognitaDev</strong>
                <p>@incognitadev</p>
              </div>
            </li>
            <li className='item'><FiArchive size={18} className='icon'/>Reading list</li>
            <li className='item'><FiList size={18} className='icon'/>Listings</li>
            <li className='item'><FiMic size={18} className='icon'/>Podcasts</li>
            <li className='item'><FiVideo size={18} className='icon'/>Videos </li>
            <li className='item'><FiTag size={18} className='icon'/>Tags</li>
            <li className='item'>more...</li>
          </ul>
        </section>

        <nav className='feed-bar'>
          <h3>POSTS</h3>
            <ul>
              <li><div className={buttonClass} id='1' onClick={()=>handleClick}>FEED</div></li>
              <li><div className={buttonClass} id='2' onClick={()=>handleClick}>WEEK</div></li>
              <li><div className={buttonClass} id='3' onClick={()=>handleClick}>MONTH</div></li>
              <li><div className={buttonClass} id='4' onClick={()=>handleClick}>YEAR</div></li>
              <li><div className={buttonClass} id='5' onClick={()=>handleClick}>INFINITY</div></li>
              <li><div className={buttonClass} id='6' onClick={()=>handleClick}>LATEST</div></li>
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
                    <h6>User Name</h6>
                    <p>01 data</p>
                  </div>
                </div>
              <h1>{postFil.title}</h1>
              </div>
              <div className='post-footer'>
                <div className='action'>
                  <FiHeart size={18}/>
                  <p>Reactions</p>
                  <FiMessageSquare size={18}/>
                  <p>Comments</p>
                </div>
                <button>Save</button>
              </div>
            </div>
          ))}
          {postList.filter(post => post.index !== 0).map(postFil => (
            <div className='card post'>
              <div className='post-content'>
                <div className='post-info'>
                  <img src='user.jpeg' alt='user' className='imgMask'/>
                  <div>
                    <h6>User Name</h6>
                    <p>01 data</p>
                  </div>
                </div>
                <h1>{postFil.title}</h1>
              </div>
              <div className='post-footer'>
                <div className='action'>
                  <FiHeart size={18}/>
                  <p>Reactions</p>
                  <FiMessageSquare size={18}/>
                  <p>Comments</p>
                </div>
                <button>Save</button>
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