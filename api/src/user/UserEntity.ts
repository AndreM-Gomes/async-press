import { PostEntity } from './../post/PostEntity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { TagEntity } from '../tag/TagEntity';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firebaseUid: string
    
    @Column()
    name: string

    @Column()
    username: string

    @OneToMany(type => PostEntity, post => post.user,{onDelete:"CASCADE"})
    posts: PostEntity[]

    @ManyToMany(type => PostEntity, postsLiked => postsLiked.usersLiked,{onDelete:"CASCADE"})
    postsLiked: PostEntity[]

    @ManyToMany(type => TagEntity, tagsModerated => tagsModerated.moderators )
    tagsModerated: TagEntity[];
}