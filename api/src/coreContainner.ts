import { createConnection } from 'typeorm';
import bodyParser from 'body-parser'
import jsonwebtoken from 'jsonwebtoken'

import { UserController } from './users/userController'
import { UserService } from './users/UserService'

export class CoreContainner{
  private app: any
  private port: number
  constructor(app: any, port: number){
    this.app = app
    this.port = port
  }
  async start(){
    console.log('Starting server...')
    this.app.use(bodyParser.json())
    const connection = await createConnection()
    const userService = new UserService(connection)
    const authUser = require('./middlewares/attachUser')(userService,jsonwebtoken)

    const userController = new UserController(this.app,userService,authUser)
    userController.init()

    this.app.listen(this.port, async() => {
      console.log(`Server started at http://localhost:${this.port}`)
    })
  }
}