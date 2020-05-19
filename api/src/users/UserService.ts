import { Connection } from 'typeorm';
import argon2 from 'argon2'
import jsonwebtoken from 'jsonwebtoken'
import { UserEntity } from '../entity/UserEntity'


export class UserService{
  private connection: Connection
  constructor(connection: Connection){
    this.connection = connection
  }
  async signUp({id,name,password,email,username}: UserEntity){
    const passwordHashed = await argon2.hash(password)

    const user = new UserEntity();
    user.email = email
    user.name = name
    user.password = passwordHashed
    user.username = username

    await this.connection.manager.save<UserEntity>(user)
      const userRecord = await this.connection.manager.findOne(UserEntity,id)
    return{
      username: userRecord.username,
      token: generateJWT(userRecord)
    }
  }
  async login(username: string, password: string){
    const userRepository = this.connection.getRepository<UserEntity>(UserEntity)

    const userRecord = await userRepository.findOne({where: {username, password}})

    const correctPassword = await argon2.verify(userRecord.password, password)

    if(!correctPassword) throw new Error('Incorrect username or password')
    return {
      user: {
        username: userRecord.username,
        token: generateJWT(userRecord)
      }
    }
  }
}
const generateJWT = (user: UserEntity) => {
  return jsonwebtoken.sign({
    data: {
      _id: user.id,
      username: user.username
    }
  },'MySuP3R_z3kr3t.', { expiresIn: '6h'})
}