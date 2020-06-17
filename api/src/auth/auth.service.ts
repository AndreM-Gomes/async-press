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


  async login(credentials){
    console.log(credentials)
    const payload = {credentials} 
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
