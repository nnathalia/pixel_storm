import { Controller, Get, Post, Render } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produto')
export class ProdutosController {
    constructor(private readonly service: ProdutosService) {}

    @Get('lista')
    @Render('produto/lista')
    lista() {
        return {
            produtos: this.service.getAll()};
    }

    @Get('create')
    @Render('produto/create')
    create(){
        return {
            title: 'Cadastro de produtos',
            description: 'Formulário para cadastro de novos produtos.',
        };
    }

    @Post('novo')
    createSave() {
        return{};
    }

    @Get(':id/atualizacao')
    @Render('produto/create')
    updateForm(){
        return{};
    }


}
