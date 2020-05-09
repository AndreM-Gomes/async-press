const express = require('express')
const app = express()
const userService = require('./services/usersService')
const postsService = require('./services/postsService')

require('./routes/posts')(app,userService(database))
require('./routes/users')(app,postsService(database))
