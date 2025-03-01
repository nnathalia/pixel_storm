/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemPedido, Jogo, Pagamento, Pedido, Usuario } from '@prisma/client';

@Injectable()
export class PedidoService {

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<(Pedido & { 
    usuario: Usuario; 
    itens: (ItemPedido & { jogo: Jogo })[]; 
    pagamentos: Pagamento[]; 
  }) | null> {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        usuario: true,  // Garante que os dados do usuário sejam retornados
        itens: {
          include: {
            jogo: true  // Garante que os jogos dentro dos itens sejam retornados
          }
        },
        pagamentos: true  // Inclui os pagamentos relacionados
      }
    });
  }

  async criarPedido(data: any) {
    try {
      console.log('📌 Dados recebidos para criar pedido:', JSON.stringify(data, null, 2));

      const pedido = await this.prisma.pedido.create({
        data: {
          usuarioId: data.usuarioId,
          status: data.status,
          total: Number(data.total), // Convertendo para número
          itens: {
            create: data.itens.create.map((item: any) => ({
              jogoId: Number(item.jogoId), // Convertendo para número
              quantidade: Number(item.quantidade),
              preco: Number(item.preco),
            })),
          },
          pagamentos: {
            create: {
              metodoPagamento: data.pagamentos.create.metodoPagamento,
              valor: Number(data.pagamentos.create.valor), // Convertendo para número
              status: data.pagamentos.create.status,
            },
          },
        },
        include: {
          itens: true,
          pagamentos: true,
        },
      });

      console.log('✅ Pedido criado com sucesso:', pedido);
      return pedido;
    } catch (error) {
      console.error('🚨 Erro ao criar pedido:', error);
      throw new BadRequestException('Erro ao criar pedido.');
    }
  }

  async finalizarPedido(usuarioId: number) {
    const carrinho = await this.prisma.carrinho.findMany({ where: { usuarioId } });

    if (!carrinho.length) {
      throw new BadRequestException('Carrinho vazio.');
    }

    const pedido = await this.prisma.pedido.create({
      data: {
        usuarioId, 
        status: 'Confirmado', 
        total: carrinho.reduce((sum, item) => sum + Number(item.preco) * Number(item.quantidade), 0),
        itens: {
          create: carrinho.map(item => ({
            jogoId: Number(item.jogoId), // Convertendo para número
            quantidade: Number(item.quantidade),
            preco: Number(item.preco),
          })),
        },
      },
    });

    await this.prisma.carrinho.deleteMany({ where: { usuarioId } });

    return pedido;
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getPagamentos() {
    return this.prisma.pagamento.findMany();
  }

  async getItens() {
    return this.prisma.pagamento.findMany();
  }

  async listarPedidos() {
    return this.prisma.pedido.findMany({
      include: {
        usuario: true,
      },
    });
  }
}
