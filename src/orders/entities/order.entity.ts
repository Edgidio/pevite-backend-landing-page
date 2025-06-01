import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus, PaymentMethod } from '../dto/create-order.dto';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  lastname: string;

  @Column({ type: 'text', nullable: true })
  message?: string;  // Campo opcional

  @Column({ 
    type: 'enum', 
    enum: PaymentMethod,
    enumName: 'payment_method_enum'
  })
  paymentMethod: PaymentMethod;

  @Column()
  phone: string;

  @Column({ type: 'boolean' })
  terms: boolean;

  @Column({ 
    type: 'enum', 
    enum: OrderStatus,
    enumName: 'order_status_enum',
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column('jsonb', { nullable: false })
  productos: Array<{ id: number, cantidad: number }>;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}