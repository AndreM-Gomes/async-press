import { UserEntity } from './../user/UserEntity';
import { PostEntity } from './../post/PostEntity';
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LikeService],
  controllers: [LikeController],
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])]
})
export class LikeModule {}
