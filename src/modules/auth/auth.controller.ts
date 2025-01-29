/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Redirect, Res, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    const user = req.user;
    return { id: user.id, nome: user.nome, email: user.email }; // Retorna o nome além do email
  }

  @Post('register')
  @Redirect('/login')
  async register(@Body() body: { nome: string; email: string; senha: string }) {
    return this.authService.register(body.nome, body.email, body.senha);
  }

  @Post('login')
  @Redirect('/')
  async login(@Body() body: { email: string; senha: string }, @Res() res: Response) {
    await this.authService.login(body.email, body.senha, res);
  }



  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt'); 
    res.redirect('/login'); 
  }
}
