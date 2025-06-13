import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../dto/create-order.dto'; // Asegúrate de que la ruta sea correcta

export class UpdateProductoStatusDto {
  @IsNotEmpty({ message: 'status| El campo "status" no puede estar vacío' })
  @IsEnum(OrderStatus, {
    message: 'status|El estado debe ser uno de los siguientes: pendiente, en proceso, confirmada',
  })
  status: OrderStatus;
}