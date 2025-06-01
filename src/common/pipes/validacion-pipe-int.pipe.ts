import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidacionPipeIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const numValue = Number(value);

    if (isNaN(numValue)) {
      throw new BadRequestException({
        status: "error",
        code: 400,
        message: "Error en la operación",
        errors: [
          {
            param: "id",
            message: `El parametro id: '${value}', no es un número válido`
          }
        ],
        date: new Date()
      });
    }

    if (!Number.isInteger(numValue)) {
      throw new BadRequestException({
        status: "error",
        code: 400,
        message: "Error en la operación",
        errors: [
          {
            param: "id",
            message: `El parametro id: '${value}', debe ser un número entero`
          }
        ],
        date: new Date()
      });
    }

    if (numValue < 0) {
      throw new BadRequestException({
        status: "error",
        code: 400,
        message: "Error en la operación",
        errors: [
          {
            param: "id",
            message: `El valor '${value}' no puede ser negativo`
          }
        ],
        date: new Date()
      });
    }

    if (numValue >= 1000) {
      throw new BadRequestException({
        status: "error",
        code: 400,
        message: "Error en la operación",
        errors: [
          {
            param: "id",
            message: `El valor '${value}' no puede ser muy alto`
          }
        ],
        date: new Date()
      });
    }

    

    return numValue;
  }
}
