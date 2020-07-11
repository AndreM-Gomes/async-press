import { PostEntity } from './../post/PostEntity';
import { UserEntity } from './../user/UserEntity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class TagEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: true})
  title: string

  @Column({nullable: true})
  description: string

  @Column({nullable: true})
  submissionsGuidelines: string

  @Column({nullable: true})
  about: string

  @ManyToMany(type => UserEntity, userModerator => userModerator.tagsModerated)
  @JoinTable()
  moderators: UserEntity[]

  @ManyToMany(type => PostEntity, postsTaged => postsTaged.tags)
  @JoinTable()
  postsTaged: PostEntity[]
}