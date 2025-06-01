import { 
  IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, 
  IsNumber, IsOptional, IsPhoneNumber, IsString, 
  ValidateNested, MaxLength 
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
  id: number;

  @IsNumber({}, { message: 'productos.cantidad| La cantidad debe ser un número' })
  @IsNotEmpty({ message: 'productos.cantidad| La cantidad es requerida' })
  @IsNumber({}, { message: 'productos.cantidad| La cantidad debe ser mayor a 0' })
  cantidad: number;
}

export class CreateOrderDto {
  @IsOptional()
  @IsString({ message: 'company| La compañía debe ser un texto' })
  company: string;

  @IsEmail({}, { message: 'email| El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'email| El correo electrónico es requerido' })
  email: string;

  @IsString({ message: 'fullname| El nombre completo debe ser un texto' })
  @IsNotEmpty({ message: 'fullname| El nombre completo es requerido' })
  fullname: string;

  @IsString({ message: 'lastname| El apellido debe ser un texto' })
  @IsNotEmpty({ message: 'lastname| El apellido es requerido' })
  lastname: string;

  @IsString({ message: 'message| El mensaje debe ser un texto' })
  @IsOptional()
  @MaxLength(500, { message: 'message| El mensaje no puede exceder los 500 caracteres' })
  message?: string;

  @IsEnum(PaymentMethod, { 
    message: `paymentMethod| El método de pago debe ser uno de: ${Object.values(PaymentMethod).join(', ')}` 
  })
  paymentMethod: PaymentMethod;

  @IsPhoneNumber('VE', { message: 'phone| El número de teléfono no es válido para Venezuela' })
  @IsNotEmpty({ message: 'phone| El número de teléfono es requerido' })
  phone: string;

  @IsBoolean({ message: 'terms| Los términos deben ser aceptados' })
  @IsNotEmpty({ message: 'terms| Debes aceptar los términos y condiciones' })
  terms: boolean;

  @IsArray({ message: 'productos| Debes enviar un array de productos' })
  @ValidateNested({ each: true })
  @Type(() => ProductoDto)
  @IsNotEmpty({ message: 'productos| Debes incluir al menos un producto' })
  productos: ProductoDto[];
}