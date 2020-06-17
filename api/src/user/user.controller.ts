import { FirebaseGuard } from './../auth/guards/firebase.guard';
import { UserEntity } from './UserEntity';
import { UserService } from './user.service';
import { Controller, Get, Body, Post, UseGuards, Request, NotFoundException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @UseGuards(FirebaseGuard)
  @Get('profile')
  async getUser(@Request() req){
    const user = this.userService.findInLocalByUID(req.user)
    if(!user) throw new NotFoundException()
    return user
  }

  @UseGuards(FirebaseGuard)
  @Post()
  async registerUser(@Body() user: UserEntity, @Request() req){
    user.firebaseUid = req.user
    this.userService.saveUser(user)
    return this.userService.findById(user.id)
  }
}
