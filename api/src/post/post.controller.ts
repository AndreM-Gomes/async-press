import { UserEntity } from './../user/UserEntity';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PostService } from './post.service';
import { Controller, UseGuards, Body, Request, Post, Get, Param, Query } from '@nestjs/common';
import { PostFactory } from './PostFactory';
import { Period } from './Period';

@Controller('post')
export class PostController {
  constructor(private postService: PostService){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() body){
    const userId = req.user
    const authenticatedUser = new UserEntity()
    authenticatedUser.id = userId
    const post = PostFactory(body)
    this.postService.createPost(authenticatedUser,post)
  }
  
  @Get('/user/:username')
  async getPostsFromUsername(@Param('username') username){
    return this.postService.allUserPosts(username)
  }

  @Get('latest')
  async latestPosts(@Query('page') page){
    return this.postService.latestPosts(Number.parseInt(page,10))
  }

  @Get('top')
  async topPosts(@Query('page') page,@Query('period') period){
    return this.postService.topPosts(
      Number.parseInt(page,10),
      Period[period as string]
    )
  }
}
