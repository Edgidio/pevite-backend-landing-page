import { BadRequestException, Injectable, Logger, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {QueryFailedError} from 'typeorm'

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImageProcessingService } from './procesar-imagenes.service';

import * as fs from 'fs-extra'; 
import * as path from 'path';




// src/products/types/image-types.ts
export interface ProcessedImage {
  original: string;
  small: string;
  medium: string;
  large: string;
}

export interface ProductImages {
  original: string[];
  small: string[];
  medium: string[];
  large: string[];
}


@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  async create(createProductDto: CreateProductDto, images: Express.Multer.File[] ) {

    try {

 // Procesar imágenes
      const processedImages = await this.imageProcessingService.processImages(images);

      // Crear estructura de imágenes
      const imagenes: ProductImages = {
        original: [],
        small: [],
        medium: [],
        large: []
      };

      // Llenar los arrays con las rutas de las imágenes
      processedImages.forEach((image: ProcessedImage) => {
        imagenes.original.push(image.original);
        imagenes.small.push(image.small);
        imagenes.medium.push(image.medium);
        imagenes.large.push(image.large);
      });

      // Crear y guardar el producto
      const product = this.productRepository.create({
        ...createProductDto,
        imagenes: imagenes
      });

      await this.productRepository.save(product);
      
      // Limpiar carpeta temporal
      await this.imageProcessingService.clearTempFolder();

      return product;;

    } catch (error) {

      // Limpiar archivos temporales si algo falla
      await this.imageProcessingService.clearTempFolder()
      
      if (error.code === 'ENOENT') {
        throw new Error('Error al acceder a los archivos de imagen. Por favor verifique los permisos o si existen.');
      }

      if (error instanceof QueryFailedError) {

        const err = error as any
    
        if (err.code ==  "23505") {

          const matches = err.detail.match(/Key \((.*?)\)=\((.*?)\) already exists/);

          if (matches && matches.length >= 3) {
            const field = matches[1];
            const value = matches[2];
            
            throw new BadRequestException({
              statusCode: 400,
              message: `El valor '${value}' ya existe para el campo '${field}'. Por favor, elige un valor único.`,
              errors: {
                field: [
                  "Esta referencia ya está asignada para un producto."
                ]
              }


            });

          }

        }


      throw error;


    }

          
    


    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  }

  async getAll() {
    return await this.productRepository.find()
  }

async deleteProduct(id: number) {
    // 1. Buscar el producto con transacción
    return await this.productRepository.manager.transaction(async manager => {
      const product = await manager.findOne(Product, {
        where: { id },
        select: ['id', 'imagenes'],
        lock: { mode: 'pessimistic_write' } // Bloqueo para evitar condiciones de carrera
      });

      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      // 2. Eliminar archivos de imágenes
      let deletedFiles = 0;
      if (product.imagenes) {
        const allImagePaths = this.getAllImagePaths(product.imagenes);
        deletedFiles = await this.deleteImageFiles(allImagePaths);
      }

      // 3. Eliminar el producto
      await manager.delete(Product, id);

      return { 
        message: 'Producto e imágenes eliminados correctamente',
        deletedFiles
      };
    });
  }

  


  

  private getAllImagePaths(imagenes: any): string[] {
    return [
      ...(imagenes.original || []),
      ...(imagenes.small || []),
      ...(imagenes.medium || []),
      ...(imagenes.large || [])
    ].filter(Boolean)
     .map(relativePath => path.resolve(process.cwd(), relativePath));
  }

  private async deleteImageFiles(filePaths: string[]): Promise<number> {
    let deletedCount = 0;

    await Promise.all(
      filePaths.map(async (absolutePath) => {
        try {
          // Verificar existencia y permisos
          await fs.access(absolutePath, fs.constants.F_OK | fs.constants.W_OK);
          
          // Eliminar archivo
          await fs.remove(absolutePath);
          deletedCount++;
          
          this.logger.debug(`Archivo eliminado: ${absolutePath}`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            this.logger.warn(`Archivo no encontrado: ${absolutePath}`);
          } else {
            this.logger.error(`Error eliminando ${absolutePath}: ${err.message}`);
          }
        }
      })
    );

    return deletedCount;
  }


async update(
  id: number,
  updateProductDto: UpdateProductDto,
  newImages?: Express.Multer.File[]
) {
  return await this.productRepository.manager.transaction(async manager => {
    // 1. Obtener el producto existente (sin usar relations)
    const product = await manager.findOne(Product, {
      where: { id },
      select: ['id', 'imagenes'] // Asegúrate que 'imagenes' está en el select
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // 2. Manejo de imágenes
    if (newImages && newImages.length > 0) {
      // Eliminar imágenes antiguas si existen
      if (product.imagenes) {
        await this.deleteExistingImages(product.imagenes);
      }

      // Procesar nuevas imágenes
      const processedImages = await this.imageProcessingService.processImages(newImages);
      updateProductDto.imagenes = this.createImageStructure(processedImages);
    } else {
      // Mantener imágenes existentes si no se proporcionan nuevas
      updateProductDto.imagenes = product.imagenes;
    }

    // 3. Actualizar el producto
    await manager.update(Product, id, updateProductDto);

    // 4. Obtener el producto actualizado (sin usar relations)
    return await manager.findOne(Product, { 
      where: { id },
      select: ['id', 'titulo', 'tipoProducto', 'imagenes', /* otros campos necesarios */]
    });
  });
}

private async deleteExistingImages(imagenes: ProductImages): Promise<void> {
  const imagePaths = this.getAllImagePaths(imagenes);
  await Promise.all(
    imagePaths.map(async (path) => {
      try {
        await fs.remove(path);
        this.logger.log(`Imagen eliminada: ${path}`);
      } catch (err) {
        this.logger.error(`Error eliminando imagen ${path}:`, err.message);
        // No lanzamos error para no interrumpir el proceso completo
      }
    })
  );
}

private createImageStructure(processedImages: ProcessedImage[]): ProductImages {
  const imagenes: ProductImages = {
    original: [],
    small: [],
    medium: [],
    large: []
  };

  processedImages.forEach(image => {
    imagenes.original.push(image.original);
    imagenes.small.push(image.small);
    imagenes.medium.push(image.medium);
    imagenes.large.push(image.large);
  });

  return imagenes;
}


async getPrductoID (id:number){

  try {

    const producto = await this.productRepository.findOne({
      where: {
        id: id
      }
    })

    if (!producto) {
      throw new Error('Usuario no existe')

    }


  return producto;

    
  } catch (error) {
    
    throw error
    
  }
  

}


async findSimilarProducts(id: number){


try {
  
    const originalProduct = await this.productRepository.findOne({
      where: { id: id },
      select: ['tipoProducto']
    });


    if (!originalProduct) {
      
      throw new NotFoundException('Producto no encontrado');
    }

    const res = await this.productRepository
      .createQueryBuilder('product')
      .where('product.id != :id', { id })
      .andWhere('product.tipoProducto = :tipo', {
        tipo: originalProduct.tipoProducto
      })
      .orderBy('RANDOM()') // Orden aleatorio
      .take(4) // Limitar a 4 resultados
      .getMany();


    return res

} catch (error) {

 throw error;

}


}

}