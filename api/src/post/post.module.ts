import { UserEntity } from './../user/UserEntity';
import { PostEntity } from './PostEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])]
})
export class PostModule {}
