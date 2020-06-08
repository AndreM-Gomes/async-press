import { UserEntity } from './../../src/user/UserEntity';
export class MockUserService {
  private users
  constructor(users: UserEntity[]){
    this.users = users
  }
    async findCredentialsByUsername(username: string){
      return this.users.find( user => user.username === username)
    }

    async findById(id: number){
      return this.users.find( user => user.id === id)
    }

    async saveUser(user: UserEntity) {
      this.users.push(user)
      return user
    }
  }