// src/subscribers/dto/create-subscriber.dto.ts
import { 
  IsEmail, 
  IsOptional, 
  IsBoolean, 
  IsNotEmpty,
  MaxLength 
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSubscribeDto {
  @IsNotEmpty({ message: 'email| El correo electrónico es requerido' })
  @IsEmail({}, { message: 'email| Debe ser una dirección de correo válida' })
  @MaxLength(100, { message: 'email| El correo no puede exceder los 100 caracteres' })
  @Transform(({ value }) => value.toLowerCase().trim()) // Normaliza el email
  email: string;

  @IsOptional()
  @IsBoolean({ message: 'status| El estado debe ser verdadero o falso' })
  status?: boolean = true;
}
