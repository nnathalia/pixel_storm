/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Render, Body, Redirect, Put, Param, Delete, HttpCode, Res, Req} from '@nestjs/common';
import { JogoService } from './jogo.service';
import  { response, Response } from 'express'
import { JogoValidador } from './jogo.validador';
import { JogoDto } from './dto/jogo.dto'; // DTO para validar e tipar os dados do jogo
import { setFlashErrors, setOld } from 'src/common/helpers/flash-errors';
import { request } from 'http';

@Controller('jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  // Formulário de criação de jogo
  @Get('form')
  @Render('jogo/form')
  async showForm() {
    const desenvolvedores = await this.jogoService.getDesenvolvedores();
    const generos = await this.jogoService.getGeneros();
    const plataformas = await this.jogoService.getPlataformas();

    return { desenvolvedores, generos, plataformas, title: 'Cadastrar jogo'  };
  }

  // Formulário de edição de jogo
  @Get('form/:id')
  @Render('jogo/form') // Nome da view Handlebars
  async form(@Param('id') id: string) {
    const jogo = await this.jogoService.findById(Number(id));
    const desenvolvedores = await this.jogoService.getDesenvolvedores();
    const generos = await this.jogoService.getGeneros();
    const plataformas = await this.jogoService.getPlataformas();

    if (!jogo) {
      return { error: 'Jogo não encontrado', desenvolvedores, generos, plataformas };
    }

    return { jogo, desenvolvedores, generos, plataformas, title: 'Editar jogo' }; // Envia os dados para a view
  }

  // Lista os jogos cadastrados
  @Get()
  @Render('jogo/index')
  async listJogos() {
    const jogos = await this.jogoService.listarJogos();
    const games = jogos.map((jogo) => ({
      id: jogo.id,
      img_url: jogo.img_url,
      nome: jogo.nome,
      descricao: jogo.descricao,
      preco: jogo.preco.toFixed(2),
      dev: jogo.desenvolvedor.nome,
      genero: jogo.genero.nome,
      plataforma: jogo.plataforma.nome,
      lanc: jogo.data_lanc.toISOString().split('T')[0],
    }));
    return { jogos: games, title: 'Lista de jogos'  };
  }

  // Cadastro de jogo
  @Post('')
  @Redirect('/jogo', 302)
  async createJogo(@Body() jogo, @Res() response: Response, @Req() request, JogoDto: JogoDto ) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(JogoDto.data_lanc.toString())) {
      throw new Error('Data de lançamento inválida');
    }

    JogoDto.preco = parseFloat(JogoDto.preco as unknown as string);
    JogoDto.data_lanc = new Date(JogoDto.data_lanc);
    JogoDto.plataformaId = Number(JogoDto.plataformaId);
    JogoDto.desenvolvedorId = Number(JogoDto.desenvolvedorId);
    JogoDto.generoId = Number(JogoDto.generoId);

    try{
      const validador = await new JogoValidador().validate(jogo);

      if(validador.isError) {
        setFlashErrors(request, validador.getErrors);
        setOld(request, jogo);

        return response.redirect('/jogo')
      }
      
      await this.jogoService.create(validador.getData);
    }catch { }

    return response.redirect('/jogo')

    //const novoJogo = await this.jogoService.create(JogoDto);
    //return { message: 'Jogo cadastrado com sucesso', jogo: novoJogo };
  }

  // Atualização de jogo
  @Put(':id')
  @Redirect('/jogo', 302)
  async updateJogo(@Param('id') id: string, @Body() jogoDto: JogoDto) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(jogoDto.data_lanc.toString())) {
      throw new Error('Data de lançamento inválida');
    }
    jogoDto.preco = parseFloat(jogoDto.preco as unknown as string);
    jogoDto.data_lanc = new Date(jogoDto.data_lanc);
    jogoDto.plataformaId = Number(jogoDto.plataformaId);
    jogoDto.desenvolvedorId = Number(jogoDto.desenvolvedorId);
    jogoDto.generoId = Number(jogoDto.generoId);

    await this.jogoService.update(Number(id), jogoDto);
    return { message: 'Jogo atualizado com sucesso' };
  }


  // Método para deletar um jogo
  @Delete(':id')
  @HttpCode(200)
  async deleteJogo(@Param('id') id: string, @Res() res: any) {
    try {
      await this.jogoService.delete(Number(id));
      return res.status(200).send({ message: 'Jogo deletado com sucesso!' });
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao deletar o jogo.', error: error.message });
    }
  }
 
}
  
