/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsInt, Min, IsUrl, IsDate } from 'class-validator';

export class JogoDto {
  @IsString()
  nome: string; 

  @IsString()
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
