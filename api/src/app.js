const express = require('express')
const app = express()
const { User } = require('./models')

const userService = require('./services/userService')(User)
