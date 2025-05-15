import { IsString, IsEnum, IsNumber, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';

export class CreateProductDto {
  @IsString()
  titulo: string;

  @IsEnum(['Hardware', 'Software', 'IoT', 'Accesorio'])
  tipoProducto: string;

  @IsString()
  @IsOptional()
  precioMin?: string; // Cambia a string

  @IsString()
  @IsOptional()
  precioMax?: string; // Cambia a string

  @IsString()
  descripcionCorta: string;

  @IsString()
  @IsOptional()
  descripcionLarga?: string;

  @IsString()
  sku: string;

  @IsOptional()
  enOferta?: boolean;

  @IsArray()
  @ArrayMaxSize(4) // Máximo 4 imágenes
  @IsString({ each: true })
  @IsOptional()
  imagenes?: string[];

  @IsString()
  @IsOptional()
  etiquetas?: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  especificacionesTecnicas?: string;

  @IsString()
  @IsOptional()
  compatibilidad?: string;

  @IsString()
  @IsOptional()
  requisitosSistema?: string;

  @IsEnum(['Perpetua', 'Suscripción', 'Gratuita', 'N/A'])
  @IsOptional()
  licencia?: string;

  @IsOptional()
  envioGratis?: boolean;

  @IsNumber()
  @IsOptional()
  garantiaMeses?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  fechaLanzamiento?: string;
}