import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './UserEntity';
import { UserService } from './user.service';
import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { UserCredentials } from './UserCredentials';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(AuthGuard('local'))
  @Get()
  async getUser(){
    return this.userService.findOne('coffe')
  }

  @Post()
  async registerUser(@Body() user: UserEntity){
    this.userService.saveUser(user)
  }

  @Post('login')
  async loginUser(@Body() userCredentials: UserCredentials){

  }
}
