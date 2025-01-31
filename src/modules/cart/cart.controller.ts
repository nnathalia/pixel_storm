/* eslint-disable prettier/prettier */
import {
  Controller, Post, Get, Body, Param, Session, Redirect, Render, Req,
  UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';



@Controller('cart')
export class CartController {

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @Redirect('/cart')
  addToCart(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
    @Session() session: any,
  ) {
    if (!session.cart) {
      session.cart = [];
    }

    const existingItem = session.cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity; // Atualiza a quantidade se o item já existir
    } else {
      session.cart.push({ id, name, price, quantity }); // Adiciona um novo item ao carrinho
    }
  }

  @Post('update/:id')
  @Redirect('/cart')
  updateCart(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
    @Session() session: any,
  ) {
    const item = session.cart?.find((item) => item.id === id);

    if (item) {
      item.quantity = quantity;
    }
  }

  @Post('remove/:id')
  @Redirect('/cart')
  removeFromCart(@Param('id') id: string, @Session() session: any) {
    session.cart = session.cart?.filter((item) => item.id !== id) || [];
  }

  @Get()
  @Render('cart')
  viewCart(@Session() session: any, @Req() req) {
    // Calcula o total para cada item
    const items = (session.cart || []).map((item) => ({
      ...item,
      total: (item.price * item.quantity).toFixed(2), // Calcula e formata o total do item
    }));

    // Calcula o total geral do carrinho
    const total = items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    return { items, total, title: 'Carrinho', user: req.user };
  }
}
