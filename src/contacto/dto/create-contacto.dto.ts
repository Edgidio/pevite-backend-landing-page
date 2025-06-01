// src/contacto/dto/create-contacto.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateContactoDto {
  @IsNotEmpty({ message: 'fullname| El nombre es obligatorio' })
  @IsString({ message: 'fullname| Debe ser una cadena de texto' })
  @MinLength(3, { message: 'fullname| Debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'fullname| No puede tener más de 100 caracteres' })
  fullname: string;

  @IsNotEmpty({ message: 'lastname| El apellido es obligatorio' })
  @IsString({ message: 'lastname| Debe ser una cadena de texto' })
  @MinLength(3, { message: 'lastname| Debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'lastname| No puede tener más de 100 caracteres' })
  lastname: string;

  @IsNotEmpty({ message: 'email| El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'email| El correo electrónico no es válido' })
  @MinLength(3, { message: 'email| Debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'email| No puede tener más de 100 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'phone| El numero de contacto es obligatorio' })
  @MinLength(3, { message: 'phone| Debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'phone| No puede tener más de 100 caracteres' })
  phone?: string;

  @IsNotEmpty({ message: 'message| El mensaje no puede estar vacío' })
  @IsString({ message: 'message| Debe ser una cadena de texto' })
  @MinLength(3, { message: 'message| Debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'message| No puede tener más de 100 caracteres' })
  message: string;
}

