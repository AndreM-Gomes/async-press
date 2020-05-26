import { UserEntity } from './../entity/UserEntity';
export function UserFactory({id, name, username, email, password, posts}: UserEntity){
  const user = new UserEntity()
  user.id = id
  user.name = name
  user.email = email
  user.username = username
  user.password = password
  user.posts = posts
  return user
}