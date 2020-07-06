import { PostEntity } from './PostEntity';
import { PostDTO } from './PostDTO';
import { TagEntity } from './../tag/TagEntity';
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
  async createPost(@Request() req, @Body() body: PostDTO){
    const userFirebaseUid = req.user
    const authenticatedUser = new UserEntity()
    authenticatedUser.firebaseUid = userFirebaseUid
    this.postService.createPost(authenticatedUser,body)
  }
  
  @UseGuards(FirebaseGuard)
  @Delete(':postId')
  async deletePost(@Request() req,@Param('postId') postIdParameter){
    const userFirebaseUid = req.user
    const postId = Number.parseInt(postIdParameter,10)
    await this.postService.deletePost(userFirebaseUid,postId)
  }

  @Get(':postId')
  async getPostId(@Param('postId') postIdParameter){
    const postId = Number.parseInt(postIdParameter,10)
    return this.postService.getPostById(postId)
  }

  @Get('/user/:username')
  async getPostsFromUsername(@Param('username') username){
    return this.postService.allUserPosts(username)
  }

  @Get('latest')
  async latestPosts(@Query('page') page){
    return (await this.postService.latestPosts(Number.parseInt(page,10)))
    .map(this.toPostDTO);
  }

  @Get('top')
  async topPosts(@Query('page') page,@Query('period') period){
    return (await this.postService.topPosts(
      Number.parseInt(page,10),
      Period[period as string]
    )).map(this.toPostDTO);
  }

  @Get('/tag/:tagname/latest')
  async latestPostsTag(@Query('page') page, @Param('tagname')tagname){
    return (await this.postService.latestPostsWithTag(Number.parseInt(page,10),tagname))
    .map(this.toPostDTO);
  }

  @Get('/tag/:tagname/top')
  async topPostsTag(@Query('page') page,@Query('period') period,@Param('tagname')tagname: string ){
    return (await this.postService.topPostsWithTag(
      Number.parseInt(page,10),
      tagname,
      Period[period as string]
    )).map(this.toPostDTO);
  }
  private toPostDTO({content,createdAt,id,likesNumber,minsToRead,tags,title,user}: PostEntity): PostDTO{
    const post:PostDTO = {
      content,
      id,
      likesNumber,
      minsToRead,
      tags: tags.map(tag => tag.title),
      title,
      user
    }
    return post
  }
}
