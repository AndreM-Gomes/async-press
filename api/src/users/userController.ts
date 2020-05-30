import { UserService } from './UserService';
import express = require('express')

export class UserController{
  app: express.Application
  userService: UserService
  authUser: any
  constructor(app: express.Application, userService: UserService, authUser: any){
    this.app = app
    this.userService = userService
    this.authUser = authUser
  }
  init(){
    this.app.post('/user/signup', async (req: express.Request, res: express.Response) => {
      try{
        const userReq = req.body
        const { username, token } = await this.userService.signUp(userReq)
        return res.status(201).json({ username, token }).end()
      }catch(e){
        return res.json(e).status(500).end()
      }
    })
    this.app.post('/user/login', async (req: express.Request, res: express.Response) => {
      try{
        const {username, password} = req.body
        const user = await this.userService.login(username, password)
        console.log(user)
        return res.status(201).json(user).end()
      }catch(e){
        return res.json(e).status(401).end()
      }
    })
  }
}