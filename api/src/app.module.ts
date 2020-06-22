import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';

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
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    PostModule,
    LikeModule,
  ],
  providers: [AppService],
  controllers: [AppController],
  exports: [AppModule]
})
export class AppModule {}
