
  import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 🔍 Si es un error de validación de DTO
    if (
      exception instanceof BadRequestException &&
      typeof exceptionResponse === 'object' &&
      Array.isArray((exceptionResponse as any).message)
    ) {
      const messages = (exceptionResponse as any).message;
      const formattedErrors = this.formatValidationErrors(messages);

      return response.status(status).json({
        statusCode: status,
        error: 'Bad Request',
        errors: formattedErrors,
      });
    }

    // 🟢 Cualquier otro tipo de error → devolverlo sin modificar
    return response.status(status).json(exceptionResponse);
  }

  private formatValidationErrors(messages: string[]): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    for (const msg of messages) {
      const [field, errorMsg] = msg.split('|');

      if (!field || !errorMsg) continue;

      const key = field.trim();
      const value = errorMsg.trim();

      if (!errors[key]) {
        errors[key] = [];
      }

      errors[key].push(value);
    }

    return errors;
  }
}

