import React, {useState, useEffect} from 'react';
import Header from '../../components/header'


import './styles.css';
import PostServices from '../../services/PostsServices'

export default function Home() {
  const [postList, setPostList] = useState([])
  const service = new PostServices()

  useEffect(()=>{
    service.getPosts().then(response =>{setPostList(response.posts)})
  })


    return(
      <div className='container'>
        <Header/>
        <section className='leftList'>
          <ul>
            <li className='item user'>
              <img src='user.jpeg' alt="" className="imgMask"/>
              <div>
                <strong>IncognitaDev</strong>
                <p>@incognitadev</p>
              </div>
            </li>
            <li className='item'>Reading list</li>
            <li className='item'>Listings</li>
            <li className='item'>Podcasts</li>
            <li className='item'>Videos </li>
            <li className='item'>Tags</li>
            <li className='item'>more...</li>
          </ul>
        
          <section className='tags' >
            <h5>My Tags</h5>
            <ul>
              <li className="tag-item">#javascript</li>
              <li className="tag-item">#react</li>
              <li className="tag-item">#python</li>
              <li className="tag-item">#css</li>
              <li className="tag-item">#devops</li>
              <li className="tag-item">#opensource</li>
              <li className="tag-item">#linux</li>
              <li className="tag-item">#docker</li>
              <li className="tag-item">#java</li>
              <li className="tag-item">#security</li>
              <li className="tag-item">#git</li>
              <li className="tag-item">#ruby</li>
              <li className="tag-item">#rails</li>
              <li className="tag-item">#vscode</li>
              <li className="tag-item">#sql</li>
              <li className="tag-item">#ubuntu</li>
              <li className="tag-item">#npm</li>
              <li className="tag-item">#bash</li>
            </ul>
            <h5>Other Polular Tags</h5>
            <ul>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
              <li className="tag-item"></li>
            </ul>
          </section>
        </section>

        <nav className='feed-bar'>
            <ul>
              <li ><div className="feed-button selected" id='1' href='#' >FEED</div></li>
              <li>|</li> 
              <li><div className="feed-button" href='#' id='2' >WEEK</div></li>
              <li><div className="feed-button" href='#' id='3' >MONTH</div></li>
              <li><div className="feed-button" href='#' id='4' >YEAR</div></li>
              <li><div className="feed-button" href='#' id='5' >INFINITY</div></li>
              <li>|</li>
              <li><div className="feed-button" href='#' id='6' >LATEST</div></li>
            </ul>
        </nav>
        <div className='postList'>
          {postList.filter(post => post.index === 0).map(postFil =>(
            <div className='card post post_1'>
              <div className='mask'>
              </div>
              <div className='post-content'>
              <h1>{postFil.title}</h1>
              </div>
              <div className='post-footer'>
                <p>Comments</p>
                <button>Save</button>
              </div>
            </div>
          ))}
          {postList.filter(post => post.index !== 0).map(postFil => (
            <div className='card post'>
              <div className='post-content'>
                <h1>{postFil.title}</h1>
              </div>
              <div className='post-footer'>
                <p>Comments</p>
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