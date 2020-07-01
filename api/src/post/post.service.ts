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
    const userRecord = await this.userRepository.findOneOrFail({where:{firebaseUid: user.firebaseUid}})
    post.user = userRecord
    post.likesNumber = 0
    await this.postRepository.save(post)
  }
  async deletePost(userFirebaseUid: any, postId: number) {
    const userRecord = await this.userRepository.findOne({where:{firebaseUid: userFirebaseUid},relations:["posts"]})
    await this.postRepository.createQueryBuilder()
    .delete()
    .from(PostEntity)
    .where("id = :postId AND user = :userId",{postId,userId: userRecord.id})
    .execute()
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
      .orderBy('post.likesNumber',"DESC")
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
