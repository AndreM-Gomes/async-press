import { jwtConstants } from './../src/auth/jwtConstants';
import { JwtService, JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MockAuthService } from './mocks/auth.service.mock';
import { AuthService } from './../src/auth/auth.service';
import { MockUserService } from './mocks/user.service.mock';
import { UserService } from './../src/user/user.service';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { AuthModule } from './../src/auth/auth.module';
import { UserModule } from './../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserEntity } from '../src/user/UserEntity';
import { Repository, Connection } from 'typeorm';

import { createConnection, EntitySchema } from 'typeorm'
type Entity = Function | string | EntitySchema<any>

export async function createMemDB(entities: Entity[]) {
  return createConnection({
    // name, // let TypeORM manage the connections
    type: 'sqlite',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
    name: 'test'
  })
}

describe('AppController (e2e)',() => {
  let app: INestApplication;
  let connection: Connection
  let userRepository: Repository<UserEntity>

  beforeAll(async () => {
    connection = await createMemDB([UserEntity])
    userRepository = (await connection).getRepository(UserEntity)
    const mockUser = new UserService(userRepository)
    const mockAuth = new AuthService(mockUser,new JwtService({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'}
      })
    )
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        AuthModule,
      ],
    })
    .overrideProvider('UserEntityRepository').useValue(userRepository)
    .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    
  });
  it('Should create user -> /user (POST)', (done) => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        username: 'latte',
        name: 'latte',
        password: 'latte',
        email: 'latte@machiato'
      })
      .expect(201)
      .then(()=> done())
  });
  it('Should login and get user profile', (done) => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        id: 1,
        email: 'coffe@latte',
        name: 'Mr Coffe',
        password: 'coffe',
        username: 'coffe'
      })
      .expect(201)
      .then( response => {
        request(app.getHttpServer())
          .post('/auth/login')
          .expect(200)
            done()
      })
  })

  it('Shouldn\'t have allow unauthenticated user on protected routes', () => {
    return request(app.getHttpServer())
    .get('/user/profile')
    .expect(401)
  })

  afterAll(async (done) => {
    try{
      await connection.close()
      await app.close()
      await done()
    }catch(e){
      console.log(e)
    }
    finally{
      done()
    }
  })
});
