import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  MaxLength,
  IsDefined,
  IsObject,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'titulo| El título del producto es requerido' })
  @IsString({ message: 'titulo| El título debe ser texto válido' })
  @MaxLength(100, { message: 'titulo| El título no debe exceder los 100 caracteres' })
  titulo: string;

  @IsNotEmpty({ message: 'tipoProducto| El tipo de producto es requerido' })
  @IsIn(['Hardware', 'Software', 'IoT', 'Accesorio'], {
    message: 'tipoProducto| El tipo debe ser: Hardware, Software, IoT o Accesorio',
  })
  tipoProducto: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'precioMin| El precio mínimo debe ser un número' })
  @Min(0, { message: 'precioMin| El precio mínimo no puede ser negativo' })
  precioMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'precioMax| El precio máximo debe ser un número' })
  @Min(0, { message: 'precioMax| El precio máximo no puede ser negativo' })
  precioMax?: number;

  @IsNotEmpty({ message: 'descripcionCorta| La descripción corta es requerida' })
  @IsString({ message: 'descripcionCorta| La descripción debe ser texto válido' })
  @MaxLength(255, { message: 'descripcionCorta| La descripción corta no debe exceder los 255 caracteres' })
  descripcionCorta: string;

  @IsOptional()
  @IsString({ message: 'descripcionLarga| La descripción larga debe ser texto válido' })
  descripcionLarga?: string;

  @IsNotEmpty({ message: 'sku| El SKU es requerido' })
  @IsString({ message: 'sku| El SKU debe ser texto válido' })
  @MaxLength(50, { message: 'sku| El SKU no debe exceder los 50 caracteres' })
  sku: string;

  @IsBoolean({ message: 'enOferta| El campo en oferta debe ser verdadero o falso' })
  @Type(() => Boolean)
  enOferta?: boolean = false;

  @IsOptional()
  @IsString({ message: 'etiquetas| Las etiquetas deben ser texto válido' })
  etiquetas?: string;

  @IsOptional()
  @IsString({ message: 'marca| La marca debe ser texto válido' })
  marca?: string;

  @IsOptional()
  @IsString({ message: 'version| La versión debe ser texto válido' })
  version?: string;

  @IsBoolean({ message: 'envioGratis| El campo envío gratis debe ser verdadero o falso' })
  @Type(() => Boolean)
  envioGratis?: boolean = false;

  @IsOptional()
  @IsInt({ message: 'garantiaMeses| La garantía debe ser un número entero' })
  @Min(0, { message: 'garantiaMeses| La garantía no puede ser negativa' })
  @Type(() => Number)
  garantiaMeses?: number;

  @IsNotEmpty({ message: 'stock| El stock es requerido' })
  @Type(() => Number)
  @IsInt({ message: 'stock| El stock debe ser un número entero' })
  @Min(0, { message: 'stock| El stock no puede ser negativo' })
  stock: number;

  @IsOptional()
  @IsObject({ message: 'imagenes| Las imágenes deben estar estructuradas como un objeto' })
  imagenes?: {
    original: string[];


    small: string[];


    medium: string[];


    large: string[];
  };
}
