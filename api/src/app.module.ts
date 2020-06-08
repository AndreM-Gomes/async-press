import { UserEntity } from './user/UserEntity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number.parseInt(process.env.DATABASE_PORT,10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule,
  ],
  providers: [AppService],
  controllers: [AppController],
  exports: [AppModule]
})
export class AppModule {}
