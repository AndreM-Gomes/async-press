import { AuthUser }  from './../middlewares/attachUser';
import { PostService } from './PostsService';
import express = require('express')
import { PostFactory } from './PostFactory';
import { UserFactory } from '../users/UserFactory';

export class PostsController{
  app: express.Application
  postsService: PostService
  authMiddleware: any
  constructor(app: express.Application, postsService: PostService, authUser: any){
    this.app = app
    this.authMiddleware = authUser
    this.postsService = postsService
  }
  init(){
    this.app.post('/post',this.authMiddleware, async (req: express.Request, res: express.Response) => {
      try{
        const authenticatedUser = UserFactory(JSON.parse(req.params.user))
        const post = PostFactory(req.body)
        this.postsService.createPost(authenticatedUser,post)
        return res.status(201).end()
      }catch(e){
        return res.json(e).status(500).end()
      }
    })
  }

}