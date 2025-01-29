/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartService {
  private cart = []; // Armazena os itens do carrinho temporariamente. Para persistência, use um banco de dados.

  constructor(private prisma: PrismaService) {}

  // Adicionar item ao carrinho
  async addItem(product: any) {
    // Buscar mais informações sobre o jogo
    const jogo = await this.prisma.jogo.findUnique({
      where: { id: product.id },
      include: {
        desenvolvedor: true,
        genero: true,
        plataforma: true,
      },
    });

    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
      existingItem.total = existingItem.quantity * existingItem.price;
    } else {
      this.cart.push({
        ...jogo,
        quantity: product.quantity,
        total: product.quantity * product.preco,
      });
    }

    return this.cart;
  }

  // Listar itens do carrinho
  getItems() {
    return this.cart;
  }

  // Atualizar quantidade de um item
  updateItemQuantity(id: number, quantity: number) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      item.total = item.quantity * item.price;
    }
    return this.cart;
  }

  // Remover item do carrinho
  removeItem(id: number) {
    this.cart = this.cart.filter((item) => item.id !== id);
    return this.cart;
  }

  // Calcular o total do carrinho
  getTotal() {
    return this.cart.reduce((total, item) => total + item.total, 0);
  }
}
