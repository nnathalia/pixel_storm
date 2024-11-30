import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('user.controller')
export class UserControllerController {

    @Post()
    create(): string {
        return 'Esta ação adiciona um novo usuário ao sistema';
    }
    
    @Get()
    findAll(): string {
        return 'Esta ação retorna uma consulta dos produtos';
    }

    @Patch()
    update(): string {
        return 'Este método vai ser responsável por atualizar dados do cliente.';
    }

    @Delete()
    remove(): string{
        return 'Este método vai ser responsável por deletar um usuário.'
    }
}
