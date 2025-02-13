/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JogoService } from './jogo.service';
import { JogoController } from './jogo.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [JogoService, PrismaService],
  controllers: [JogoController],
  exports: [JogoService]
})
export class JogoModule {}
