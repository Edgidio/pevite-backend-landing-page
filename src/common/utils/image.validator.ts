// src/utils/image.validator.ts
import { BadRequestException } from '@nestjs/common';

export function validateImage(file: Express.Multer.File): void {
  // Validar tipo MIME
  const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!validMimeTypes.includes(file.mimetype)) {
    throw new BadRequestException(
      `Formato de imagen no válido. Solo se permiten: ${validMimeTypes.join(', ')}`,
    );
  }

  // Validar tamaño (5MB máximo)
  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (file.size > maxSize) {
    throw new BadRequestException(
      `La imagen ${file.originalname} excede el tamaño máximo de 5MB`,
    );
  }

  // Opcional: Validar dimensiones si es necesario
  // (requeriría procesar la imagen con una librería como sharp)
}