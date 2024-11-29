import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('home')
  home() {
    return { title: 'Home' };
  }

  @Get('/shop')
  @Render('shop')
  shop() {
    return { title: 'Shop' };
  }

  @Get('/shop_item')
  @Render('shop_item')
  shop_item() {
    return { title: 'Produto' };
  }

  @Get('/cart')
  @Render('cart')
  cart() {
    return { title: 'Carrinho' };
  }

  @Get('/about')
  @Render('about')
  about() {
    return { title: 'Sobre Nós' };
  }

  @Get('/login')
  @Render('auth/login')
  login() {
    return { title: 'Login' };
  }

  @Get('/cadastro')
  @Render('auth/cadastro')
  cadastro() {
    return { title: 'Cadastro' };
  }
}
