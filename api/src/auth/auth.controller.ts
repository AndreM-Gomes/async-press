import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, UseGuards, Request, Post, HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() req){
    return this.authService.login(req.user)
  }
}
