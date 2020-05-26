import { UserEntity } from './UserEntity';
import { Column, ManyToOne, Generated, CreateDateColumn, Index, AfterInsert } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class PostEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  minsToRead: number

  @Column('text')
  content: string

  @Column()
  likesNumber: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  createdAt: Date

  @ManyToOne(type => UserEntity, user => user.posts)
  user: UserEntity

}