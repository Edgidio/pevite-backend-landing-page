import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsNotEmpty, IsAlpha } from 'class-validator';

export class CreateUsuarioDto {
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

  @IsString({
    message: 'El nombre debe ser una cadena de texto',
  })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre no puede estar vacío',
  })
  @IsAlpha('es-ES', {
    message: 'El nombre solo puede contener letras',
  })
  name: string;

  @IsOptional()
  @IsIn(['user', 'admin'], {
    message: 'El rol debe ser "user" o "admin"',
  })
  role?: string;
}
