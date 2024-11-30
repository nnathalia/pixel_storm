import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('carrinho.controller')
export class CarrinhoController {

    @Post()
    create(): string {
        return 'Esta ação deve fornecer um carinho de compras para cada usuário.';
    }

    @Patch()
    update(): string {
        return 'Esta ação adiciona um novo item a estrutura do carrinho';
    }


    @Get()
    findAll(): string {
        return 'Esta ação retorna uma consulta os produtos que possuem no carrinho de compras de cada usuário';
    }

    @Delete()
    remove(): string{
        return '';
    }
}
