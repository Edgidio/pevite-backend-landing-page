import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { 
    message: 'email| El email debe ser una dirección de correo electrónico válida' 
  })
  @IsNotEmpty({ 
    message: 'email| El email no puede estar vacío' 
  })
  email: string;

  @IsString({ 
    message: 'password| La contraseña debe ser una cadena de texto' 
  })
  @MinLength(6, { 
    message: 'password| La contraseña debe tener al menos 6 caracteres' 
  })
  @IsNotEmpty({ 
    message: 'password| La contraseña no puede estar vacía' 
  })
  password: string;
}
