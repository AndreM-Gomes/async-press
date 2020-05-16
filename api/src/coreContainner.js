const bodyParser = require('body-parser')
const { User } = require('./models')

module.exports = class CoreContainner{
  constructor(app, port){
    this.app = app
    this.port = port
  }
  async start(){
    console.log('Starting server...')
    this.app.use(bodyParser.json())

    require('./controllers/userController')(this.app, User)

    this.app.listen(this.port,async() => {
      console.log(`Server started at http://localhost:${this.port}`)
    })
  }
}