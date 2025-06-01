// src/products/image-processing.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as sharp from 'sharp';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

interface ProcessedImage {
  original: string;
  small: string;
  medium: string;
  large: string;
}

@Injectable()
export class ImageProcessingService {
  private readonly outputFolders = {
    original: 'uploads/original',
    small: 'uploads/small',
    medium: 'uploads/medium',
    large: 'uploads/large',
    temp: 'uploads/temp'
  };

  constructor() {
    this.ensureFoldersExist().catch(console.error);
  }

  private async ensureFoldersExist(): Promise<void> {
    try {
      await Promise.all([
        mkdir(this.outputFolders.original, { recursive: true }),
        mkdir(this.outputFolders.small, { recursive: true }),
        mkdir(this.outputFolders.medium, { recursive: true }),
        mkdir(this.outputFolders.large, { recursive: true }),
        mkdir(this.outputFolders.temp, { recursive: true }),
      ]);
    } catch (err) {
      console.error('Error creating folders:', err);
      throw err;
    }
  }

  async processImages(images: Express.Multer.File[]): Promise<ProcessedImage[]> {
    if (!images || images.length === 0) {
      return [];
    }

    const processedImages: ProcessedImage[] = [];

    for (const image of images) {
      try {
        // Si no hay buffer pero hay path, leer el archivo
        if (!image.buffer && image.path) {
          image.buffer = fs.readFileSync(image.path);
        }

        // Validación del objeto imagen
        if (!image || !image.buffer || !image.originalname) {
          console.warn('Invalid image object skipped:', image);
          continue;
        }

        const filename = this.generateUniqueFilename(image.originalname);
        const originalPath = path.join(this.outputFolders.original, filename);
        
        // Guardar imagen original
        await writeFile(originalPath, image.buffer);

        // Procesar diferentes tamaños
        const [smallPath, mediumPath, largePath] = await Promise.all([
          this.resizeImage(image.buffer, this.outputFolders.small, filename, 300, 300),
          this.resizeImage(image.buffer, this.outputFolders.medium, filename, 600, 600),
          this.resizeImage(image.buffer, this.outputFolders.large, filename, 1200, 1200),
        ]);

        // Eliminar archivo temporal si existe
        if (image.path) {
          await unlink(image.path).catch(console.error);
        }

        processedImages.push({
          original: originalPath,
          small: smallPath,
          medium: mediumPath,
          large: largePath,
        });

      } catch (err) {
        console.error(`Error processing image ${image?.originalname || 'unknown'}:`, err);
        throw err;
      }
    }

    return processedImages;
  }

  private async resizeImage(
    buffer: Buffer,
    outputFolder: string,
    filename: string,
    width: number,
    height: number,
  ): Promise<string> {
    const outputPath = path.join(outputFolder, filename);
    
    await sharp(buffer)
      .resize(width, height, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(outputPath);
    
    return outputPath;
  }

  private generateUniqueFilename(originalname: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = path.extname(originalname) || '.jpg';
    return `${timestamp}-${randomString}${extension}`;
  }

  async clearTempFolder(): Promise<void> {
    try {
      const files = await fs.promises.readdir(this.outputFolders.temp);
      await Promise.all(files.map(file => 
        fs.promises.unlink(path.join(this.outputFolders.temp, file))
      ))
    } catch (err) {
      console.error('Error clearing temp folder:', err);
    }
  }
}