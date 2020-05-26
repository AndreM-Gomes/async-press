import React from 'react'


export default class TagsService {
  async getHash() {
    const response = await this.hash()
    return response 
  }


  hash(){
    return {
      hashs: [ 
            {
              title: "#javascript" 
            },
            {
              title: "#react" 
            },
            {
              title: "#python" 
            },
            {
              title: "#css" 
            },
            {
              title: "#devops" 
            },
            {
              title: "#opensource" 
            },
            {
              title: "#linux" 
            },
            {
              title: "#docker" 
            },
            {
              title: "#java" 
            },
            {
              title: "#security" 
            },
            {
              title: "#ruby"
            },
            {
              title: "#rails"
            },
            {
              title: "#vscode"
            },
            {
              title: "#sql"
            },
            {
              title: "#ubuntu"
            },
            {
              title: "#npm"
            },
            {
              title: "#bash"
            },
            

      ]
    }
  }
}