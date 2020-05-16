const bodyParser = require('body-parser')
const { User } = require('./models')
const jwt = require('jsonwebtoken')

module.exports = class CoreContainner{
  constructor(app, port){
    this.app = app
    this.port = port
  }
  async start(){
    console.log('Starting server...')
    this.app.use(bodyParser.json())

    const UserService = require('./services/userService')(User)


    const authUser = require('./middlewares/attachUser')(UserService,jwt)
    
    require('./controllers/userController')(this.app, UserService, authUser)

    this.app.listen(this.port, async() => {
      console.log(`Server started at http://localhost:${this.port}`)
    })
  }
}