import React, {useEffect, useState}from 'react'

import './styles.css'

const Sidebar = () => {
  const [hashLikedList, setHashLikedList] = useState([])


  /*useEffect(()=> {
    service.getHash().then(response => setHashLikedList(response.hashs))
  })*/

  return (
      <section className='tags' >
            <h5>My Tags</h5>
            <ul>
              <li className='tag-item'>teste</li>
            </ul>
            <h5>Other Polular Tags</h5>
            <ul>
            </ul>
      </section>
  )
}

export default Sidebar