import { PostEntity } from './PostEntity';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(type => PostEntity, post => post.user)
    posts: Promise<PostEntity>[]
}
