import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateCategoryDto {

  @ApiProperty({
    description: 'Nombre de la Categoria',
    example: 'novela',
  })
  @IsNotEmpty({ message: 'Nombre de la Categoria no puede estar vacio' })
  @IsString({ message: 'Nombre de la Categoria deber ser una cadena de texto' })
  name: string;

  @ApiProperty({
    description: 'Descripcion de la Categoria',
    example: 'Esta categoria ...',
  })
  @IsNotEmpty({ message: 'Descripcion de la Categoria no puede estar vacio ' })
  description: string;

  
}

