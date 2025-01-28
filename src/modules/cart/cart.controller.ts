/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Session,
  Redirect,
  Render,
} from '@nestjs/common';


@Controller('cart')
export class CartController {
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
viewCart(@Session() session: any) {
  const items = session.cart || [];
  const total = items.reduce(
    (sum, item) => sum + (item.price * item.quantity), // Multiplicação corrigida
    0
  );

  return { items, total: total.toFixed(2), title: 'Carrinho' };
}

}


