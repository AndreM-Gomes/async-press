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
import { Repository } from 'typeorm';


describe('AppController (e2e)',() => {
  let app: INestApplication;

  beforeAll(async () => {
    const users: UserEntity[] = [
      {
        id: 1,
        email: 'coffe@latte',
        name: 'Mr Coffe',
        password: 'coffe',
        username: 'coffe'
      },
      {
        id: 2,
        email: 'latte@latte',
        name: 'Mrs Latte',
        password: 'latte',
        username: 'latte'
      },
      {
        id: 3,
        email: 'chai@chai',
        name: 'Mr Chai',
        password: 'chai',
        username: 'chai'
      }
    ]

    const mockUser = new MockUserService(users)
    const mockAuth = new MockAuthService(mockUser,new JwtService({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1h'}
      })
    )
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    })
    .overrideProvider(UserService).useValue(mockUser)
    .overrideProvider(AuthService).useValue(mockAuth)
    .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should create user -> /user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        username: 'latte',
        name: 'latte',
        password: 'latte',
        email: 'latte@machiato'
      })
      .expect(201)
  });
  it('Should login and get user profile', (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        id: 1,
        email: 'coffe@latte',
        name: 'Mr Coffe',
        password: 'coffe',
        username: 'coffe'
      })
      .expect(200)
      .then( response => {
        request(app.getHttpServer())
          .get('/user/profile')
          .set('Authorization',`Bearer ${response.body.accessToken}`)
          .expect(200)
          .expect({
            id: 1,
            email: 'coffe@latte',
            name: 'Mr Coffe',
            username: 'coffe'
          })
        done()
      })
  })

  it('Shouldn\'t have allow unauthenticated user on protected routes', () => {
    return request(app.getHttpServer())
    .get('/user/profile')
    .expect(401)
  })

  afterAll(async () => {
    await app.close()
  })
});
