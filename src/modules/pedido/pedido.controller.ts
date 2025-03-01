/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Session,
  HttpException,
  HttpStatus,
  Render,
  UseGuards,
  Req,
  Redirect,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  // 🛒 Exibir o pedido do carrinho
  @UseGuards(JwtAuthGuard)
  @Get('order')
  @Render('pedido')
  viewOrder(@Session() session: any, @Req() req) {
    if (!session.cart || session.cart.length === 0) {
      throw new HttpException(
        'Seu carrinho está vazio.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const total = session.cart
      .reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      )
      .toFixed(2);

    return {
      items: session.cart,
      total,
      user: req.user,
      title: 'Pedido',
      description:
        'Confirme as informações do pedido antes de finalizar a compra',
    };
  }

  // ✅ Finalizar pedido
  @UseGuards(JwtAuthGuard)
  @Post('finalizar')
  @Redirect('confirmation', 302)
  async finalizarPedido(
    @Req() req,
    @Body() body: any,
    @Session() session: any,
  ) {
    if (!req.user) {
      throw new HttpException(
        'Usuário não autenticado.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!session.cart || session.cart.length === 0) {
      throw new HttpException('Carrinho está vazio.', HttpStatus.BAD_REQUEST);
    }

    const total = parseFloat(body.total);

    const pedido = await this.pedidoService.criarPedido({
      usuarioId: req.user.id,
      status: 'Confirmado',
      total,
      itens: {
        create: session.cart.map((item) => ({
          jogoId: Number(item.id), // Convertendo para número
          quantidade: Number(item.quantity),
          preco: Number(item.price),
        })),
      },
      pagamentos: {
        create: {
          metodoPagamento: body.paymentMethod || 'Desconhecido',
          valor: Number(total),
          status: 'Confirmado',
        },
      },
    });

    // 🛑 Limpa o carrinho após finalizar o pedido
    session.cart = [];

    return {
      success: true,
      message: 'Pedido finalizado com sucesso!',
      pedido,
      user: req.user,
    };
  }

  // ✅ Página de confirmação da compra
  @Get('confirmation')
  @Render('confirmation')
  confirmationPage(@Req() req) {
    return { message: 'Compra realizada com sucesso!', user: req.user };
  }

  @Get()
  @Render('pedido/index')
  async listJogos(@Req() req) {
    const pedidos = await this.pedidoService.listarPedidos();
    return { pedido: pedidos, title: 'Lista de pedidos', user: req.user };
  }

  @Get('detalhes')
  @Render('pedido/detalhes')
  async shop_item(@Query('id') id: string, @Req() req) {
    const pedido = await this.pedidoService.findById(Number(id));
  
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
  
    return {
      title: `Pedido #${pedido.id}`,
      pedido: {
        id: pedido.id,
        dataPedido: pedido.dataPedido.toISOString().split('T')[0],
        status: pedido.status,
        total: pedido.total.toFixed(2),
        usuario: {
          nome: pedido.usuario.nome,
          email: pedido.usuario.email
        },
        itens: pedido.itens.map(item => ({
          jogo: {
            nome: item.jogo.nome,
            preco: item.jogo.preco.toFixed(2)
          }
        })),
        pagamentos: pedido.pagamentos.map(pagamento => ({
          metodo: pagamento.metodoPagamento,
          valor: pagamento.valor.toFixed(2),
          data: pagamento.dataPagamento.toISOString().split('T')[0],
          status: pagamento.status
        }))
      },
      user: req.user
    };
  }
}
