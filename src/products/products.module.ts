import { BadRequestException, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { ImageProcessingService } from './procesar-imagenes.service';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
 MulterModule.register({
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${uuidv4()}${ext}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ImageProcessingService,  ],
  exports: [ProductsService]
})
export class ProductsModule {}
