import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './UserEntity';
import { UserService } from './user.service';
import { Controller, Get, Body, Post, UseGuards, Request } from '@nestjs/common';
import { UserCredentials } from './UserCredentials';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@Request() req){
    console.log(process.env.DATABASE_PORT)
    return this.userService.findById(req.user)
  }

  @Post()
  async registerUser(@Body() user: UserEntity){
    this.userService.saveUser(user)
  }
}
