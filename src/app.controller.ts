import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('home')
  home() {
    return {
      title: 'Home',
      description:
        'Explore nossas ofertas e lançamentos de jogos para PC e videogames.',
    };
  }

  @Get('/shop')
  @Render('shop')
  shop() {
    return {
      title: 'Shop',
      description:
        'Nossa loja virtual completa. Navegue por nossa coleção de jogos digitais e encontre seus favoritos.',
    };
  }

  @Get('/shop_item')
  @Render('shop_item')
  shop_item() {
    return {
      title: 'Produto',
      description:
        'Detalhes do produto selecionado. Veja informações, capturas de tela e avaliações antes de comprar.',
    };
  }

  @Get('/cart')
  @Render('cart')
  cart() {
    return {
      title: 'Carrinho',
      description:
        'Revise os itens adicionados ao seu carrinho. Pronto para finalizar a compra?',
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    return {
      title: 'Sobre Nós',
      description:
        'Conheça mais sobre a Pixel Storm. Nossa missão, visão e a equipe por trás da loja.',
    };
  }

  @Get('/login')
  @Render('auth/login')
  login() {
    return {
      title: 'Login',
      description: 'Acesse sua conta na Pixel Storm.',
    };
  }

  @Get('/cadastro')
  @Render('auth/cadastro')
  cadastro() {
    return {
      title: 'Cadastro',
      description:
        'Crie uma nova conta na Pixel Storm e aproveite todas as vantagens de ser nosso cliente.',
    };
  }

  @Get('/create')
  @Render('produto/create')
  create() {
    return {
      title: 'Cadastro de produtos',
      description: 'Formulário para cadastro de novos produtos.',
    };
  }

  @Get('/lista')
  @Render('produto/lista')
  lista() {
    return {
      title: 'Lista de produtos',
      description: 'Lista de produtos cadastrados.',
    };
  }
}
