/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JogoService } from './jogo.service';
import { PrismaService } from 'src/database/prisma.service';
import { JogoController } from './jogo.controller';

@Module({
  providers: [JogoService, PrismaService],
  controllers: [JogoController]
})
export class JogoModule {}
