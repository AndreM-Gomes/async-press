import { PostEntity } from './../entity/PostEntity';
import { UserEntity } from './../entity/UserEntity';
import { Connection, getConnection } from 'typeorm';
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
}