import { UserEntity } from './UserEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as admin from 'firebase-admin'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
    ){}

    async findById(id: number){
      return this.userRepository.findOne({where:{id}})
    }

    async findByUID(uid: string){
      const userRecord = await admin.auth().getUser(uid)
      return userRecord.toJSON()
    }

    async saveUser(user: UserEntity) {
      return this.userRepository.save(user)
    }
}
