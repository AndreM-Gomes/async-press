const express = require('express')
const app = express()
const { User } = require('./models')
User.create({name: 'Andre', username: 'adionildo', email: 'andre.montero702@gmail.com', password: 'root'})
