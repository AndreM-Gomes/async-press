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

    @Column({select: false})
    password: string

    @OneToMany(type => PostEntity, post => post.user)
    posts: PostEntity[]
}
