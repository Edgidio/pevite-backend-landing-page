import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImages } from '../products.service';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titulo: string;

  @Column({ type: 'enum', enum: ['Hardware', 'Software', 'IoT', 'Accesorio'] })
  tipoProducto: string;

  @Column({ type: 'numeric', nullable: true })
  precioMin?: number;

  @Column({ type: 'numeric', nullable: true })
  precioMax?: number;

  @Column({ type: 'text' })
  descripcionCorta: string;

  @Column({ type: 'text', nullable: true })
  descripcionLarga: string;

  @Column({ length: 20, unique: true })
  sku: string;

  @Column({ default: false })
  enOferta: boolean;

  // Asegúrate de incluir esta columna:
  @Column({ type: 'jsonb', nullable: true })
  imagenes: {
    original: string[];
    small: string[];
    medium: string[];
    large: string[];
  };

  @Column({ type: 'text', nullable: true })
  etiquetas: string;

  @Column({ length: 50, nullable: true })
  marca: string;

  @Column({ length: 20, nullable: true })
  version: string;


  @Column({ default: true })
  envioGratis: boolean;

  @Column({ type: 'integer', default: 12 })
  garantiaMeses: number;

  @Column({ type: 'integer', nullable: true })
  stock?: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

}