import { PostEntity } from "./PostEntity"
import { PostDTO } from "./PostDTO"

export function PostFactory({id, title, minsToRead, content, likesNumber, user}: PostDTO){
  const post = new PostEntity()
  post.id = id
  post.title = title
  post.minsToRead = minsToRead
  post.content = content
  post.likesNumber = likesNumber
  post.user = user
  return post
}