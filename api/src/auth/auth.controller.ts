import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, UseGuards, Request, Post, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req){
    return this.authService.login(req.user)
  }
}
