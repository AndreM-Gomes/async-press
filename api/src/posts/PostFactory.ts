import { UserEntity } from './../entity/UserEntity';
import { PostEntity } from './../entity/PostEntity';
export function PostFactory({id, title, minsToRead, content, likesNumber, user}: PostEntity){
  const post = new PostEntity()
  post.id = id
  post.title = title
  post.minsToRead = minsToRead
  post.content = content
  post.likesNumber = likesNumber
  post.user = user
  return post
}