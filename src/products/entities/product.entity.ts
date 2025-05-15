import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titulo: string;

  @Column({ type: 'enum', enum: ['Hardware', 'Software', 'IoT', 'Accesorio'] })
  tipoProducto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioMin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precioMax: string;

  @Column({ type: 'text' })
  descripcionCorta: string;

  @Column({ type: 'text', nullable: true })
  descripcionLarga: string;

  @Column({ length: 20, unique: true })
  sku: string;

  @Column({ default: false })
  enOferta: boolean;

  @Column({ type: 'simple-array', nullable: true }) // Array de máximo 4 imágenes
  imagenes: string[];

  @Column({ type: 'text', nullable: true })
  etiquetas: string;

  @Column({ length: 50, nullable: true })
  marca: string;

  @Column({ length: 20, nullable: true })
  version: string;

  @Column({ type: 'text', nullable: true })
  especificacionesTecnicas: string;

  @Column({ type: 'text', nullable: true })
  compatibilidad: string;

  @Column({ type: 'text', nullable: true })
  requisitosSistema: string;

  @Column({
    type: 'enum',
    enum: ['Perpetua', 'Suscripción', 'Gratuita', 'N/A'],
    default: 'N/A',
  })
  licencia: string;

  @Column({ default: true })
  envioGratis: boolean;

  @Column({ default: 12 })
  garantiaMeses: number;

  @Column({ default: 100 })
  stock: number;

  @Column({ type: 'date', nullable: true })
  fechaLanzamiento: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}