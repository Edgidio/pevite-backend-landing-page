// src/common/interceptors/file-upload.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private readonly keepBuffer: boolean = true) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const files = request.files;

    if (files && this.keepBuffer) {
      // Leer los archivos y mantener el buffer
      for (const file of files) {
        if (file.path && !file.buffer) {
          file.buffer = fs.readFileSync(file.path);
        }
      }
    }

    return next.handle().pipe(
      map(data => data)
    );
  }
}