/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(nome: string, email: string, senha: string) {
    const hashedPassword = await bcrypt.hash(senha, 10);

    await this.prisma.usuario.create({
      data: { nome, email, senha: hashedPassword },
    });

    return { message: 'Usuário cadastrado com sucesso!' };
  }



  async login(email: string, senha: string, res: Response) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
  
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) throw new UnauthorizedException('Credenciais inválidas');
  
    const token = this.jwtService.sign({ id: user.id, nome: user.nome });
  
    res.cookie('jwt', token, { httpOnly: true });
  }  

}
