import { Controller, Get, Patch, Post } from '@nestjs/common';
//import { ProdutoControllerController } from './produto.controller.controller.spec';

@Controller('produto.controller')
export class ProdutoController {

    @Post()
    create(): string {
        return 'Esta ação adiciona um novo produto a base';
    }


    @Get()
    findAll(): string {
        return 'Esta ação retorna uma consulta uma lista de todos os produtos que estão cadastrados.';
    }


    @Patch()
    update(): string {
        return 'Este método vai ser responsável por atualizar os dados do cliente.';
    }

}


