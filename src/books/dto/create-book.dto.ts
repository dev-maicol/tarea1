import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateBookDto {

  @ApiProperty({
    description: 'Titulo del Libro',
    example: 'boliviano',
  })
  @IsNotEmpty({ message: 'Titulo no puede estar vacio' })
  @IsString({ message: 'Titulo deber ser una cadena de texto' })
  title: string;

  @ApiProperty({
    description: 'ISBN del Libro',
    example: '1234567890',
  })
  @IsNotEmpty({ message: 'ISBN no puede estar vacio ' })
  isbn: string;

  @ApiProperty({
    description: 'Editorial del Libro',
    example: 'Santillana',
  })
  @IsNotEmpty({ message: 'Editorial no puede estar vacio' })
  @IsString({ message: 'Editorial deber ser una cadena de texto' })
  publisher: string;

  @ApiProperty({
    description: 'Anio de Publicacion del Libro',
    example: 2020,
  })
  @IsNumber({}, { message: 'Anio de publicacion deber ser un valor numerico' })
  @Min(1900)
  publicationYear: number;

  @ApiProperty({
    description: 'Genero Literario del Libro',
    example: 'Novela',
  })
  @IsNotEmpty({ message: 'Genero literario no puede estar vacio' })
  @IsString({ message: 'Genero literario deber ser una cadena de texto' })
  genre: string;

  @ApiProperty({
    description: 'Id de Autor del Libro',
    example: 1,
  })
  @IsNumber({}, { message: "Id de Autor debe ser un valor numérico" })
  @IsPositive({ message: "Id de Autor debe ser un número entero positivo" })
  authorId: number;
}
