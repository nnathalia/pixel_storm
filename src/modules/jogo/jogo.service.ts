/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JogoDto } from './dto/jogo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JogoService {
  constructor(private prisma: PrismaService) {}

  async getDesenvolvedores() {
    return this.prisma.desenvolvedor.findMany();
  }

  async getGeneros() {
    return this.prisma.genero.findMany();
  }

  async getPlataformas() {
    return this.prisma.plataforma.findMany();
  }

  async findById(id: number) {
    return this.prisma.jogo.findUnique({
      where: { id },
      include: {
        desenvolvedor: true,
        genero: true,
        plataforma: true,
      },
    });
  }

  async create(data: JogoDto) {
    const dataLanc = new Date(data.data_lanc);
    if (isNaN(dataLanc.getTime())) {
      throw new Error('Data de lançamento inválida');
    }
    const novoJogo = await this.prisma.jogo.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        data_lanc: data.data_lanc,
        img_url: data.img_url || null,
        plataformaId: data.plataformaId,
        desenvolvedorId: data.desenvolvedorId,
        generoId: data.generoId,
      },
    });

    return novoJogo;
  }

  async listarJogos() {
    return this.prisma.jogo.findMany({
      include: {
        desenvolvedor: true,
        genero: true,
        plataforma: true,
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.jogo.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.jogo.delete({
      where: { id },
    });
  }
}
