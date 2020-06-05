import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from './../user/UserCredentials';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ){}

  async validateUser(credentials: UserCredentials){
    const user = await this.userService.findCredentialsByUsername(credentials.username)
    if(user && await argon2.verify(user.password, credentials.password)){
      const {id} = user
      return id
    }
    return null
  }

  async login(credentials){
    console.log(credentials)
    const payload = {credentials} 
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
