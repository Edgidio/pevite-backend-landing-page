// src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'El email debe ser una dirección de correo electrónico válida',
    },
  )
  @IsNotEmpty({
    message: 'El email no puede estar vacío',
  })
  email: string;

  @IsString({
    message: 'La contraseña debe ser una cadena de texto',
  })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  })
  @IsNotEmpty({
    message: 'La contraseña no puede estar vacía',
  })
  password: string;
}
