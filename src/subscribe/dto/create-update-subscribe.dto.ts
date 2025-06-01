import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSubscribeDto {
  @IsBoolean({ message: 'status| El estado debe ser verdadero o falso' })
  status: boolean ;

}


