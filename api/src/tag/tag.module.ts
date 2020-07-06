import { TagEntity } from './TagEntity';
import { UserEntity } from './../user/UserEntity';
import { PostEntity } from './../post/PostEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';

@Module({
  controllers: [TagController],
  providers: [],
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, TagEntity])],
  exports: []
})
export class TagModule {}
