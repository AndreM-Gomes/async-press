import { JWTToken } from './../interfaces/JWTToken';
import { UserService } from './../users/UserService';
import jsonwebtoken from 'jsonwebtoken'
import express = require('express')

export function AuthUser(userService: UserService){

  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authorization = req.headers.authorization

    const token = authorization.split(' ')[1]

    if(!token) return res.status(401).end()

    const decodedToken = jsonwebtoken.verify(token, 'hello') as JWTToken

    if(!decodedToken) return res.status(500).send({auth: false, message: 'Failed to authenticate token'}).end()

    const user = await userService.findUserById(decodedToken.data._id)

    if(!user){
      res.status(401).end()
    }

    req.params.user = JSON.stringify(user)
    next()
  }
}