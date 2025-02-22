/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsInt, Min, IsUrl, IsDate, IsNotEmpty} from 'class-validator';

export class JogoDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório'})
  nome: string; 

  @IsString()
  @IsNotEmpty({message: 'A descrição é obrigatória'})
  descricao: string; 

  @IsNumber()
  @Min(0) 
  preco: number;

  @Type(() => Date) // Conversão automática para Date
  @IsDate()
  data_lanc: Date;

  @IsOptional() 
  @IsUrl() // Verifica se é uma URL válida
  img_url?: string;

  @IsInt()
  plataformaId: number; 

  @IsInt()
  desenvolvedorId: number; 

  @IsInt()
  generoId: number; 
}

export class JogoUpdateDto extends PartialType(JogoDto) { }
