import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @ApiProperty({
    description: 'Nombre de Autor',
    example: 'juan perez',
  })
  @IsNotEmpty({ message: 'Nombre no puede ser un valor vacio.' })
  @IsString({ message: 'Nombre debe ser una cadena de texto.' })
  name: string;

  @ApiProperty({
    description: 'Nacionalidad del Autor',
    example: 'boliviano',
  })
  @IsNotEmpty({ message: 'Nacionalidad no puede ser un valor vacio.' })
  @IsString({ message: 'Nacionalidad debe ser una cadena de texto.' })
  nationality: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del Autor',
    example: '1990-01-01',
  })
  @IsDateString({}, { message: 'Fecha de nacimiento deber ser de tipo fecha YYYY-MM-DD' })
  birthDate: Date;
}
