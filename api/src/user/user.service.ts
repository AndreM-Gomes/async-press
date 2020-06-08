import { UserEntity } from './UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
    ){}

    async findCredentialsByUsername(username: string){
      return this.userRepository.findOne({
        where: {username},
        select: ['id','username','password']
      })
    }

    async findById(id: number){
      return this.userRepository.findOne({where:{id}})
    }

    async saveUser(user: UserEntity) {
      const userHashed = new UserEntity()
      userHashed.name = user.name
      userHashed.username = user.username
      userHashed.email = user.email
      userHashed.password = await argon2.hash(user.password)
      return this.userRepository.save(userHashed)
    }
}
