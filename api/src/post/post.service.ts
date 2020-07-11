import { TagEntity } from './../tag/TagEntity';
import { PostDTO } from './PostDTO';
import { Period } from './Period';
import { UserEntity } from './../user/UserEntity';
import { PostEntity } from './PostEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { PostFactory } from './PostFactory';

@Injectable()
export class PostService {
  
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>
  ){}
  private async tagsResolver(tags: string[]) {
    const recordedTags = await this.tagRepository.find({
      title: In(tags)
    })
    const unsavedTags = tags.filter( tag => !recordedTags.some( recordedTag => tag === recordedTag.title))
      
    const unsavedTagsEntity = unsavedTags.map( unsavedTag => {
      const tag = this.tagRepository.create({title: unsavedTag})
      console.log(tag)
      return tag
    })
    const tagsRecord = await this.tagRepository.save(unsavedTagsEntity)
    return tagsRecord
  }
  async createPost(user: UserEntity,postDTO: PostDTO){
    const userRecord = await this.userRepository.findOneOrFail({where:{firebaseUid: user.firebaseUid}})
    const post = PostFactory(postDTO)
    const tags = await this.tagsResolver(postDTO.tags)
    post.tags = tags
    tags.forEach(tag => {
      tag.postsTaged = [post]
    })
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
  async getPostById(postId: number){
    const post = await this.postRepository.findOne({where: {id: postId}})
    if(!post) throw new NotFoundException()
    return post
  }
  private latestPostsQuery(){
    return this.postRepository.createQueryBuilder('post')
    .innerJoinAndSelect('post.user','user')
    .innerJoinAndSelect('post.tags','tag')
    .orderBy('post.createdAt')
  }
  async allUserPosts(username: string){
    const userRecord = await this.userRepository.findOneOrFail({where:{username},relations: ["posts"]})
    return userRecord.posts
  }
  async latestPosts(page: number){
    return this.latestPostsQuery()
    .getMany()

  }
  async latestPostsWithTag(page: number, tagname: string){
    return await this.latestPostsQuery()
    .innerJoinAndSelect('post.tags','tagEntity','tagEntity.title = :tagname',{tagname})
    .getMany()
  }
  private async topPostsQuery(page: number, period?: Period){
    if(!period){
      return this.postRepository.createQueryBuilder('post')
      .innerJoinAndSelect('post.user','user')
      .innerJoinAndSelect('post.tags','tag')
      .orderBy('post.likesNumber',"DESC")
      .take(10)
      .skip(10 * page)
    }
    const inLastDays = period as number
    return this.postRepository.createQueryBuilder('post')
    .innerJoinAndSelect('post.user','user','post.createdAt > NOW() - INTERVAL :period',{period: inLastDays})
    .innerJoinAndSelect('post.tags','tag')
    .orderBy('likesNumber')
    .take(10)
    .skip(10 * page)
  }
  async topPosts(page: number,period?: Period){
    return (await this.topPostsQuery(page,period))
    .getMany()
  }
  async topPostsWithTag(page: number, tagname: string,period?: Period){
    return (await this.topPostsQuery(page,period))
    .innerJoinAndSelect('post.tags','tagEntity','tagEntity.title = :tagname',{tagname})
    .getMany()
  }
}
