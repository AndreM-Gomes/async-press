import { PostEntity } from './../post/PostEntity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";

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
}