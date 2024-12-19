import { Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('produto')
export class ProdutosController {
    constructor(private readonly service: ProdutosService) { }

    @Get('lista')
    @Render('produto/lista')
    lista() {
        return {
            produtos: this.service.getAll()
        };
    }


        @Post('upload')
        @UseInterceptors(FileInterceptor('file'))
        uploadFile(
            @UploadedFile() file: Express.Multer.File)
         {
            console.log(file);

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
            return {};
        }

        @Get(':id/atualizacao')
        @Render('produto/create')
        updateForm(){
            return {};
        }


    }
