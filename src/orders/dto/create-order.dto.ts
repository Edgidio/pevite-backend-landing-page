import { 
  IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, 
  IsNumber, IsOptional, IsPhoneNumber, IsString, 
  ValidateNested, MaxLength, MinLength, Min, ArrayMinSize 
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pendiente',
  IN_PROGRESS = 'en proceso',
  CONFIRMED = 'confirmada',
}

export enum PaymentMethod {
  TRANSFER = 'transferencia',
  CASH = 'efectivo',
  CARD = 'tarjeta',
  OTHER = 'otro',
}

class ProductoDto {
  @IsNumber({}, { message: 'productos.id| El ID del producto debe ser un número' })
  @IsNotEmpty({ message: 'productos.id| El ID del producto es requerido' })
  @Min(1, { message: 'productos.id| El ID del producto debe ser mayor a 0' })
  id: number;

  @IsNumber({}, { message: 'productos.cantidad| La cantidad debe ser un número' })
  @IsNotEmpty({ message: 'productos.cantidad| La cantidad es requerida' })
  @Min(1, { message: 'productos.cantidad| La cantidad debe ser mayor a 0' })
  cantidad: number;
}

export class CreateOrderDto {
  @IsOptional()
  @IsString({ message: 'company| La compañía debe ser un texto' })
  @MinLength(3, { message: 'company| La compañía debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'company| La compañía no puede exceder los 100 caracteres' })
  company?: string;

  @IsEmail({}, { message: 'email| El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'email| El correo electrónico es requerido' })
  @MaxLength(100, { message: 'email| El correo electrónico no puede exceder los 100 caracteres' })
  email: string;

  @IsString({ message: 'fullname| El nombre completo debe ser un texto' })
  @IsNotEmpty({ message: 'fullname| El nombre completo es requerido' })
  @MinLength(3, { message: 'fullname| El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'fullname| El nombre no puede exceder los 50 caracteres' })
  fullname: string;

  @IsString({ message: 'lastname| El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'lastname| El apellido es requerido' })
  @MinLength(3, { message: 'lastname| El apellido debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'lastname| El apellido no puede exceder los 50 caracteres' })
  lastname: string;

  @IsOptional()
  @IsString({ message: 'message| El mensaje debe ser un texto' })
  @MinLength(3, { message: 'message| El mensaje debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'message| El mensaje no puede exceder los 500 caracteres' })
  message?: string;

  @IsEnum(PaymentMethod, { 
    message: `paymentMethod| El método de pago debe ser uno de: ${Object.values(PaymentMethod).join(', ')}` 
  })
  @IsNotEmpty({ message: 'paymentMethod| El método de pago es requerido' })
  paymentMethod: PaymentMethod;

  @IsPhoneNumber('VE', { message: 'phone| El número de teléfono no es válido para Venezuela' })
  @IsNotEmpty({ message: 'phone| El número de teléfono es requerido' })
  phone: string;

  @IsBoolean({ message: 'terms| Los términos deben ser un valor booleano' })
  @IsNotEmpty({ message: 'terms| Debes aceptar los términos y condiciones' })
  terms: boolean;

  @IsArray({ message: 'productos| Debes enviar un array de productos' })
  @ArrayMinSize(1, { message: 'productos| Debes incluir al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => ProductoDto)
  productos: ProductoDto[];
}