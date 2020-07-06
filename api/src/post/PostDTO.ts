import { UserEntity } from './../user/UserEntity';
export class PostDTO {
  id: number
  title: string
  minsToRead: number
  content: string
  likesNumber: number
  user: UserEntity
  tags: string[];
}
