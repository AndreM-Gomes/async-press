import { FirebaseGuard } from './../guards/firebase.guard';
import { LikeService } from './like.service';
import { Controller, Post, UseGuards, Request, Delete } from '@nestjs/common';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService){}

  @UseGuards(FirebaseGuard)
  @Post()
  async likePost(@Request() req){
    const firebaseUid = req.user
    const postId = Number.parseInt(req.body.postId,10)
    await this.likeService.likePost(firebaseUid,postId)
  }

  @UseGuards(FirebaseGuard)
  @Delete()
  async unlikePost(@Request() req){
    const firebaseUid = req.user
    const postId = Number.parseInt(req.body.postId,10)
    await this.likeService.unlikePost(firebaseUid,postId)
  }
}
