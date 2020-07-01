import { UserEntity } from "./UserEntity"

export function UserFactory({id, name, username, posts}: UserEntity){
  const user = new UserEntity()
  user.id = id
  user.name = name
  user.username = username
  user.posts = posts
  return user
}