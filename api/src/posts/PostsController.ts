import { Period } from './Period';
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
        post.likesNumber = 0
        this.postsService.createPost(authenticatedUser,post)
        return res.status(201).end()
      }catch(e){
        return res.json(e).status(500).end()
      }
    })
    this.app.get('/post/user/:username',async (req: express.Request, res: express.Response) => {
      try{
        const username = req.params.username
      const posts = await this.postsService.allUserPosts(username)
      return res.status(200).json(posts)
      }catch(e){
        return res.json(e).status(500).end()
      }
    })
    this.app.get('/post/latest', async (req: express.Request, res: express.Response) => {
      try{
        const page = Number.parseInt(req.query.page as string,10)
        const posts = await this.postsService.latestPosts(page)
        console.log(posts)
        return res.status(200).json(posts)
      }catch(e){
        return res.json(e).status(500).end()
      }
    })
    this.app.get('/post/top', async (req: express.Request, res: express.Response) => {
      try{
        const page = Number.parseInt(req.query.page as string,10)
        const posts = await this.postsService.topPosts(page,Period[req.query.period as string])
        return res.status(200).json(posts)
      }catch(e){
        return res.json(e).status(500).end()
      }
    })

  }

}