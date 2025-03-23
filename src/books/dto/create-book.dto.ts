import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateBookDto {

  @IsNotEmpty({ message: 'Titulo no puede estar vacio'})
  @IsString({ message: 'Titulo deber ser una cadena de texto'})
  title: string;

  @IsNotEmpty({ message: 'ISBN no puede estar vacio '})
  isbn: string;

  @IsNotEmpty({ message: 'Editorial no puede estar vacio'})
  @IsString({ message: 'Editorial deber ser una cadena de texto'})
  publisher: string;

  @IsNumber({}, { message: 'Anio de publicacion deber ser un valor numerico'})
  @Min(1900)
  publicationYear: number;

  @IsNotEmpty({ message: 'Genero literario no puede estar vacio'})
  @IsString({ message: 'Genero literario deber ser una cadena de texto'})
  genre: string;

  @IsNumber({}, { message: "Id de Autor debe ser un valor numérico" })
  @IsPositive({ message: "Id de Autor debe ser un número entero positivo" })
  authorId: number;
}
