import { UserEntity } from './../user/UserEntity';
import { Column, ManyToOne, Generated, CreateDateColumn, Index, AfterInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    length: 75
  })
  title: string

  @Column({
    type: 'tinyint',
    nullable: false
  })
  minsToRead: number

  @Column({
    type: 'text',
    nullable: false
  })
  content: string

  @Index()
  @Column()
  likesNumber: number

  @Index()
  @CreateDateColumn({ type: 'datetime'})
  createdAt: Date

  @ManyToOne(type => UserEntity, user => user.posts,{onDelete:"CASCADE"})
  user: UserEntity

  @ManyToMany(type => UserEntity, userLiked => userLiked.postsLiked,{onDelete:"CASCADE"})
  @JoinTable()
  usersLiked: UserEntity[]
}