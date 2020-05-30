import { UserEntity } from './UserEntity';
import { Column, ManyToOne, Generated, CreateDateColumn, Index, AfterInsert } from 'typeorm';
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
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
  createdAt: Date

  @ManyToOne(type => UserEntity, user => user.posts)
  user: UserEntity

}