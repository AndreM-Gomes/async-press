import { FirebaseGuard } from '../guards/firebase.guard';
import { UserEntity } from './../user/UserEntity';
import { PostService } from './post.service';
import { Controller, UseGuards, Body, Request, Post, Get, Param, Query, Delete } from '@nestjs/common';
import { PostFactory } from './PostFactory';
import { Period } from './Period';

@Controller('post')
export class PostController {
  constructor(private postService: PostService){}

  @UseGuards(FirebaseGuard)
  @Post()
  async createPost(@Request() req, @Body() body){
    const userFirebaseUid = req.user
    const authenticatedUser = new UserEntity()
    authenticatedUser.firebaseUid = userFirebaseUid
    const post = PostFactory(body)
    this.postService.createPost(authenticatedUser,post)
  }
  
  @UseGuards(FirebaseGuard)
  @Delete(':postId')
  async deletePost(@Request() req,@Param('postId') postIdParameter){
    const userFirebaseUid = req.user
    const postId = Number.parseInt(postIdParameter,10)
    await this.postService.deletePost(userFirebaseUid,postId)
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
