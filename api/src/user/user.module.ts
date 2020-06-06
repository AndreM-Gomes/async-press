import { AuthModule } from './../auth/auth.module';
import { UserEntity } from './UserEntity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwtConstants';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UserService]
})
export class UserModule {}
