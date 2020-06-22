import { UserEntity } from './../user/UserEntity';
import { PostEntity } from './../post/PostEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}

  async likePost(uid: string, postId: number){
    const post = await this.postRepository.findOne({where: {id: postId},relations: ["usersLiked"]})
    const user = await this.userRepository.findOne({where: {firebaseUid: uid}});
    const isLiked = post.usersLiked.some( userLiked => userLiked.id === user.id)
    if(!isLiked) post.likesNumber++
    post.usersLiked = [user,...post.usersLiked];
    await this.postRepository.save(post);
  }

  async unlikePost(firebaseUid: string,postId: number){
    const post = await this.postRepository.findOne({where: {id: postId},relations: ["usersLiked"]})
    const user = await this.userRepository.findOne({where: {firebaseUid}});
    const isLiked = post.usersLiked.some( userLiked => userLiked.id === user.id)
    if (isLiked) post.likesNumber--
    post.usersLiked = post.usersLiked.filter( userLiked => userLiked.id !== user.id)
    await this.postRepository.save(post)
  }


}
