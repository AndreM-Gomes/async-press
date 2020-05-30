import { Period } from './Period';
import { PostEntity } from './../entity/PostEntity';
import { UserEntity } from './../entity/UserEntity';
import { Connection, getConnection, CreateDateColumn } from 'typeorm';
export class PostService {
  private connection: Connection
  constructor(){
    this.connection = getConnection()
  }
  async createPost(user: UserEntity,post: PostEntity){
    const userRepository = this.connection.getRepository(UserEntity)
    const userRecord = await userRepository.findOneOrFail(user.id)
    post.user = userRecord
    await this.connection.manager.save(post)
  }
  async allUserPosts(username: string){
    const userRepository = this.connection.getRepository(UserEntity)
    const userRecord = await userRepository.findOneOrFail({where:{username},relations: ["posts"]})
    return userRecord.posts
  }
  async latestPosts(page: number){
    const postRepository = this.connection.getRepository(PostEntity)
    return postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.user','user')
      .orderBy('post.createdAt')
      .getMany()
  }
  async topPosts(page: number,period?: Period){
    const postRepository = this.connection.getRepository(PostEntity);
    if(!period){
      return postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.user','user')
      .orderBy('post.likesNumber')
      .take(10)
      .skip(10 * page)
      .getMany()
    }
    const inLastDays = period as number
    return postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.user','user','post.createdAt > NOW() - INTERVAL :period',{period: inLastDays})
      .orderBy('likesNumber')
      .take(10)
      .skip(10 * page)
      .getMany()
  }
}