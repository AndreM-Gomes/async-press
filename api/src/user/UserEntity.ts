import { PostEntity } from './../post/PostEntity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany} from "typeorm";

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

    @OneToMany(type => PostEntity, post => post.user)
    posts: PostEntity[]

    @ManyToMany(type => PostEntity, postsLiked => postsLiked.usersLiked)
    postsLiked: PostEntity[]
}