import { PostsController } from './posts/PostsController';
import { PostService } from './posts/PostsService';
import { AuthUser } from './middlewares/attachUser';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser'
import jsonwebtoken from 'jsonwebtoken'
import cors from 'cors'
import express = require('express')

import { UserController } from './users/userController'
import { UserService } from './users/UserService'

const app = express()
const port = 3000

export async function start(){
  try{
    console.log('Starting server...')
    app.use(bodyParser.json())
    app.use(cors())
    createConnection().then( () => {
      console.log('Starting User endpoints...')
      const userService = new UserService()
      const authMiddleware = AuthUser(userService)
      const userController = new UserController(app,userService,authMiddleware)
      userController.init()
      console.log('User endpoints started...')
      const postService = new PostService()
      const postController = new PostsController(app,postService,authMiddleware)
      postController.init()
    })
    return app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    })
  }catch(e){
    console.log(`Uncaught exception => ${e}`)
  }
}
start()
