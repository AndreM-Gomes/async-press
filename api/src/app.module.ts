import { UserEntity } from './user/UserEntity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blog',
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
