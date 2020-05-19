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
    this.app.post('/user/user-signup', async (req: express.Request, res: express.Response) => {
      try{
        const userReq = req.body
        console.log(`SignUp User: ${req.body}`)
        const { username, token } = await this.userService.signUp(userReq)
        return res.json({ username, token }).status(201).end()
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
    this.app.get('/user/login', async (req: express.Request, res: express.Response) => {
      res.json({ok: true}).end()
    })
  }
}