import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {

  @IsNotEmpty({ message: 'Nombre no puede ser un valor vacio.'})
  @IsString({ message: 'Nombre debe ser una cadena de texto.'})
  name: string;

  @IsNotEmpty({ message: 'Nacionalidad no puede ser un valor vacio.'})
  @IsString({ message: 'Nacionalidad debe ser una cadena de texto.'})
  nationality: string;

  @IsDateString({}, { message: 'Fecha de nacimiento deber ser de tipo fecha YYYY-MM-DD'})
  birthDate: Date;

}
