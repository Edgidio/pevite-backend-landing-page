import { 
  IsEmail, 
  IsString, 
  MinLength, 
  IsOptional, 
  IsIn, 
  IsNotEmpty, 
  IsAlpha 
} from 'class-validator';

export class CreateUsuarioDto {
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

  @IsString({ 
    message: 'name| El nombre debe ser una cadena de texto' 
  })
  @MinLength(3, { 
    message: 'name| El nombre debe tener al menos 3 caracteres' 
  })
  @IsNotEmpty({ 
    message: 'name| El nombre no puede estar vacío' 
  })
  @IsAlpha('es-ES', { 
    message: 'name| El nombre solo puede contener letras' 
  })
  name: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { 
    message: 'role| El rol debe ser "user" o "admin"' 
  })
  role?: string = 'user'; // Valor por defecto
}
