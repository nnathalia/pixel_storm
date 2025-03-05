/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Render, Body, Put, Param, Delete, HttpCode, BadRequestException, Res, Req} from '@nestjs/common';
import { JogoService } from './jogo.service';
import { JogoDto } from './dto/jogo.dto'; // DTO para validar e tipar os dados do jogo
import { Response} from 'express';
//import { title } from 'process';
//import { STATUS_CODES } from 'http';

@Controller('jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  // Formulário de criação de jogo
  @Get('form')
  @Render('jogo/form')
  async showForm(@Req() req) {
    try{
      const desenvolvedores = await this.jogoService.getDesenvolvedores();
    const generos = await this.jogoService.getGeneros();
    const plataformas = await this.jogoService.getPlataformas();

    return { desenvolvedores, generos, plataformas, title: 'Cadastrar jogo', user: req.user  };
    } catch (error){
      return { error: 'Erro ao carregar o formulário. Tente novamente', title: 'Cadastrar jogo', user: req.user }
    }
  }

  // Formulário de edição de jogo
  @Get('form/:id')
  @Render('jogo/form') // Nome da view Handlebars
  async form(@Param('id') id: string, @Res() res: Response) {
    try {
      const jogo = await this.jogoService.findById(Number(id));
      const desenvolvedores = await this.jogoService.getDesenvolvedores();
      const generos = await this.jogoService.getGeneros();
      const plataformas = await this.jogoService.getPlataformas();
  
      if (!jogo) {
        return res.render('jogo/form', {
          error: 'Jogo não encontrado',
          desenvolvedores,
          generos,
          plataformas,
          title: 'Cadastrar Jogo',
          isEdit: false,
        });
      }
  
      return {
        jogo,
        desenvolvedores,
        generos,
        plataformas,
        title: 'Editar Jogo',
        isEdit: true,
      };
    } catch (error) {
      const desenvolvedores = await this.jogoService.getDesenvolvedores();
      const generos = await this.jogoService.getGeneros();
      const plataformas = await this.jogoService.getPlataformas();
  
      return {
        error: 'Erro ao carregar o jogo para edição. Tente novamente.',
        desenvolvedores,
        generos,
        plataformas,
        title: 'Editar Jogo',
        isEdit: true,
      };
    }
  }

  // Lista os jogos cadastrados
  @Get()
  @Render('jogo/index')
  async listJogos(@Req() req) {
    try{
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
    return { jogos: games, title: 'Lista de jogos',user: req.user   };
    } catch (error) {
      return {error: 'Erro ao listar os jogos. Tente novamente', title: 'Lista de jogos', user: req.user };
    }
  }

  // Cadastro de jogo
  @Post('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createJogo(@Body() jogoDto: JogoDto, @Res() res: Response, @Req() req) {
    try {
      const errors = [];
  
      // Validação de nome
      if (!jogoDto.nome || typeof jogoDto.nome !== 'string' || jogoDto.nome.trim() === '') {
        errors.push('O título do jogo é obrigatório.');
      }
  
      // Validação de preço
      if (!jogoDto.preco || isNaN(jogoDto.preco) || jogoDto.preco <= 0) {
        errors.push('O preço deve ser um número positivo.');
      }
  
      // Validação de data_lanc
      if (!jogoDto.data_lanc || !/^\d{4}-\d{2}-\d{2}$/.test(jogoDto.data_lanc.toString())) {
        errors.push('A data de lançamento deve ser informada.');
      } else {
        const date = new Date(jogoDto.data_lanc);
        if (isNaN(date.getTime())) {
          errors.push('Data de lançamento inválida.');
        } else {
          jogoDto.data_lanc = date;
        }
      }
  
      // Validação de plataformaId
      if (!jogoDto.plataformaId || isNaN(jogoDto.plataformaId) || jogoDto.plataformaId <= 0) {
        errors.push('A plataforma é obrigatória.');
      }
  
      // Validação de desenvolvedorId
      if (!jogoDto.desenvolvedorId || isNaN(jogoDto.desenvolvedorId) || jogoDto.desenvolvedorId <= 0) {
        errors.push('O desenvolvedor é obrigatório.');
      }
  
      // Validação de generoId
      if (!jogoDto.generoId || isNaN(jogoDto.generoId) || jogoDto.generoId <= 0) {
        errors.push('O gênero é obrigatório.');
      }
  
      if (errors.length > 0) {
        const desenvolvedores = await this.jogoService.getDesenvolvedores();
        const generos = await this.jogoService.getGeneros();
        const plataformas = await this.jogoService.getPlataformas();
  
        return res.render('jogo/form', {
          formData: jogoDto,
          desenvolvedores,
          generos,
          plataformas,
          errors: errors,
          title: 'Cadastrar Jogo',
          isEdit: false,
        });
      }
  
      // Converte os campos para os tipos corretos
      jogoDto.preco = parseFloat(jogoDto.preco as unknown as string);
      jogoDto.plataformaId = Number(jogoDto.plataformaId);
      jogoDto.desenvolvedorId = Number(jogoDto.desenvolvedorId);
      jogoDto.generoId = Number(jogoDto.generoId);
  
      await this.jogoService.create(jogoDto);
      return res.redirect('/jogo');
    } catch (error) {
      console.error('Erro ao cadastrar o jogo:', error.message);
      const desenvolvedores = await this.jogoService.getDesenvolvedores();
      const generos = await this.jogoService.getGeneros();
      const plataformas = await this.jogoService.getPlataformas();
  
      return res.render('jogo/form', {
        formData: jogoDto,
        desenvolvedores,
        generos,
        plataformas,
        errors: [error.message || 'Erro inesperado ao cadastrar o jogo. Tente novamente.'],
        title: 'Cadastrar Jogo',
        isEdit: false,
      });
    }
  }

  // Atualização de jogo
  @Put(':id')
async updateJogo(@Param('id') id: string, @Body() jogoDto: JogoDto, @Res() res: Response) {
  try {
    const errors = [];

    if (!jogoDto.nome || typeof jogoDto.nome !== 'string' || jogoDto.nome.trim() === '') {
      errors.push('O título do jogo é obrigatório.');
    }

    // Validação de preço
    if (!jogoDto.preco || isNaN(jogoDto.preco) || jogoDto.preco <= 0) {
      errors.push('O preço deve ser um número positivo.');
    }

    // Validação de data_lanc
    if (!jogoDto.data_lanc || !/^\d{4}-\d{2}-\d{2}$/.test(jogoDto.data_lanc.toString())) {
      errors.push('A data de lançamento deve ser válida');
    } else {
      const date = new Date(jogoDto.data_lanc);
      if (isNaN(date.getTime())) {
        errors.push('Data de lançamento inválida.');
      } else {
        jogoDto.data_lanc = date;
      }
    }

    // Validação de plataformaId
    if (!jogoDto.plataformaId || isNaN(jogoDto.plataformaId) || jogoDto.plataformaId <= 0) {
      errors.push('A plataforma é obrigatória.');
    }

    // Validação de desenvolvedorId
    if (!jogoDto.desenvolvedorId || isNaN(jogoDto.desenvolvedorId) || jogoDto.desenvolvedorId <= 0) {
      errors.push('O desenvolvedor é obrigatório.');
    }

    // Validação de generoId
    if (!jogoDto.generoId || isNaN(jogoDto.generoId) || jogoDto.generoId <= 0) {
      errors.push('O gênero é obrigatório.');
    }

    if (errors.length > 0) {
      const jogo = await this.jogoService.findById(Number(id));
      const desenvolvedores = await this.jogoService.getDesenvolvedores();
      const generos = await this.jogoService.getGeneros();
      const plataformas = await this.jogoService.getPlataformas();

      return res.render('jogo/form', {
        jogo: { ...jogo, ...jogoDto }, // Mantém os dados originais combinados com os enviados
        desenvolvedores,
        generos,
        plataformas,
        errors: errors, // Passa a lista de erros
        title: 'Editar Jogo',
        isEdit: true,
      });
    }

    // Converte os campos para os tipos corretos
    jogoDto.preco = parseFloat(jogoDto.preco as unknown as string);
    jogoDto.data_lanc = new Date(jogoDto.data_lanc);
    jogoDto.plataformaId = Number(jogoDto.plataformaId);
    jogoDto.desenvolvedorId = Number(jogoDto.desenvolvedorId);
    jogoDto.generoId = Number(jogoDto.generoId);

    await this.jogoService.update(Number(id), jogoDto);
    return res.redirect('/jogo');
  } catch (error) {
    console.error('Erro ao atualizar o jogo:', error.message);
    const jogo = await this.jogoService.findById(Number(id));
    const desenvolvedores = await this.jogoService.getDesenvolvedores();
    const generos = await this.jogoService.getGeneros();
    const plataformas = await this.jogoService.getPlataformas();

    return res.render('jogo/form', {
      jogo: { ...jogo, ...jogoDto },
      desenvolvedores,
      generos,
      plataformas,
      error: error.message || 'Erro ao atualizar o jogo. Verifique os dados e tente novamente!',
      title: 'Editar Jogo',
      isEdit: true, //Deixa claro que é uma edição
    });
  }
}


  // Método para deletar um jogo
  @Delete(':id')
  @HttpCode(200)
  async deleteJogo(@Param('id') id: string) {
    try {
      await this.jogoService.delete(Number(id));
      return { message: 'Jogo deletado com sucesso!' };
    } catch (error) {
      console.error('Erro ao deletar o jogo:', error);
      throw new BadRequestException('Erro ao deletar o jogo.');
    }
  }

 
}
  
