/* eslint-disable prettier/prettier */
import {Controller, Get, NotFoundException,Query, Render} from '@nestjs/common';
import { JogoService } from './modules/jogo/jogo.service';


@Controller()
export class AppController {
   constructor(private readonly jogoService: JogoService){}
    
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
  async shop() {
    const jogos = await this.jogoService.listarJogos();
    const games = jogos.map((jogo) => ({
      id: jogo.id,
      img_url: jogo.img_url,
      nome: jogo.nome,
      preco: jogo.preco.toFixed(2),
    }))
    return {
      title: 'Shop',
      description:
        'Nossa loja virtual completa. Navegue por nossa coleção de jogos digitais e encontre seus favoritos.',
      jogos: games,
    };
  }

  @Get('/shop_item')
  @Render('shop_item')
  async shop_item(@Query('id') id: string) {
    const jogo = await this.jogoService.findById(Number(id));
    if(!jogo){
      throw new NotFoundException('Jogo não encontrado')
    }
    return {
      title: jogo.nome,
      description: `Detalhes sobre o jogo ${jogo.nome}`,
      jogo:{
        id: jogo.id,
        nome: jogo.nome,
        descricao: jogo.descricao,
        img_url: jogo.img_url,
        preco: jogo.preco.toFixed(2),
        desenvolvedor: jogo.desenvolvedor.nome,
        genero: jogo.genero.nome,
        plataforma: jogo.plataforma.nome,
        data_lanc: jogo.data_lanc.toISOString().split('T')[0],
      }
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
}
