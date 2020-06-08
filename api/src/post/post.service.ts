import { Period } from './Period';
import { UserEntity } from './../user/UserEntity';
import { PostEntity } from './PostEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}
  async createPost(user: UserEntity,post: PostEntity){
    const userRecord = await this.userRepository.findOneOrFail(user.id)
    post.user = userRecord
    await this.postRepository.save(post)
  }
  async allUserPosts(username: string){
    const userRecord = await this.userRepository.findOneOrFail({where:{username},relations: ["posts"]})
    return userRecord.posts
  }
  async latestPosts(page: number){
    return this.postRepository.createQueryBuilder('post')
    .innerJoinAndSelect('post.user','user')
    .orderBy('post.createdAt')
    .getMany()
  }
  async topPosts(page: number,period?: Period){
    if(!period){
      return this.postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.user','user')
      .orderBy('post.likesNumber')
      .take(10)
      .skip(10 * page)
      .getMany()
    }
    const inLastDays = period as number
    return this.postRepository.createQueryBuilder('post')
    .innerJoinAndSelect('post.user','user','post.createdAt > NOW() - INTERVAL :period',{period: inLastDays})
    .orderBy('likesNumber')
    .take(10)
    .skip(10 * page)
    .getMany()
  }
}
