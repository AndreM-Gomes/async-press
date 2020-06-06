import { jwtConstants } from './../../src/auth/jwtConstants';
import { MockUserService } from "./user.service.mock"
import { UserCredentials } from "src/user/UserCredentials"
import { JwtService } from "@nestjs/jwt"

export class MockAuthService {
  constructor(
    private userService: MockUserService,
    private jwtService: JwtService
    ){}

  async validateUser(credentials: UserCredentials){
    const user = await this.userService.findCredentialsByUsername(credentials.username)
    if(user && user.password === credentials.password){
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
