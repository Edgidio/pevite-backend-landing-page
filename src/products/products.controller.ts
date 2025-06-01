import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  ConsoleLogger,
  UseGuards,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs-extra'; 
import * as path from 'path';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUserWithRole, UserWithRole } from 'src/common/decorators/get-user.decorator';
import { ValidacionPipeIntPipe } from 'src/common/pipes/validacion-pipe-int.pipe';
import { QueryFailedError } from 'typeorm';
import { identity } from 'rxjs';




@Controller('productos')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,

  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('imagenes', 4),)
  async createProduct(
    @UploadedFiles() imagenes: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
    @GetUserWithRole() userWithRole: UserWithRole
  ) {

    try {


      if (userWithRole.role == "user") {
  
        throw new UnauthorizedException ({
          statusCode: 401,
          error: "No autorizado",
          message: "Usuario no autorizado para realizar esta acción."
        })
  
      }



      // Validación manual de las imágenes (opcional)
      if (!imagenes || imagenes.length !== 4 || imagenes.length >= 5) {

        const rutaCarpeta = path.join(__dirname, '../../uploads/temp');

        const existe = await fs.pathExists(rutaCarpeta);

        if (existe) {
          await fs.emptyDir(rutaCarpeta);
        }


        throw new BadRequestException( {

          statusCode: 400,
          error: "Bad Request",
          errors: {
            imagenes: [
              "Debes subir exactamente 4 imágenes",
            ]
          }
  
      })

      }

      return this.productsService.create(createProductDto, imagenes)

      

    } catch (error) {


      
      // Mensajes personalizados según el tipo de error
      let userMessage = '';

      if (error.message.includes("Error al acceder a los archivos de imagen. Por favor verifique los permisos o si existen.")){

        userMessage = "Error en el proceso de guardado, no se encontró la carpeta de destino."

              throw new HttpException(
        {
          statusCode: 500,
          message: userMessage,
          technicalError: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      }

      throw error;

    }

  }

  
  @Get()
  findAll() {

    return this.productsService.getAll();
   
    
  }


  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete( @Param('id', ValidacionPipeIntPipe) id:number, @GetUserWithRole() userWithRole: UserWithRole) {

        if (userWithRole.role == "user") {
      
            throw new UnauthorizedException ({
              statusCode: 401,
              error: "No autorizado",
              message: "Usuario no autorizado para realizar esta acción."
            })
      
          }

    return this.productsService.deleteProduct(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
@UseInterceptors(FilesInterceptor('imagenes'))
async updateProduct(
  @Param('id', ValidacionPipeIntPipe) id: number,
  @Body() updateProductDto: UpdateProductDto,
  @GetUserWithRole() userWithRole: UserWithRole,
  @UploadedFiles() images?: Express.Multer.File[]
) {
  try {


          if (userWithRole.role == "user") {
      
            throw new UnauthorizedException ({
              statusCode: 401,
              error: "No autorizado",
              message: "Usuario no autorizado para realizar esta acción."
            })
      
          }


          // Validación manual de las imágenes (opcional)
      if (images && images.length > 0 && images.length !== 4) {

        const rutaCarpeta = path.join(__dirname, '../../uploads/temp');

        const existe = await fs.pathExists(rutaCarpeta);

        if (existe) {
          await fs.emptyDir(rutaCarpeta);
        }


        throw new BadRequestException( {

          statusCode: 400,
          error: "Bad Request",
          errors: {
            imagenes: [
              "Debes subir exactamente 4 imágenes",
            ]
          }
  
      })

      }

    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
      images
    );
    
    return {
      success: true,
      message: 'Producto actualizado correctamente',
      data: updatedProduct
    };
  } catch (error) {
    
    if (error instanceof QueryFailedError) {
      const err = error as any;
      if (err.code === "23505") {
        const matches = err.detail.match(/Key \((.*?)\)=\((.*?)\) already exists/);
        if (matches && matches.length >= 3) {
          const field = matches[1];
          const value = matches[2];
          
          throw new BadRequestException({
            statusCode: 400,
            message: `El valor '${value}' ya existe para el campo '${field}'. Por favor, elige un valor único.`,
            errors: {
              [field]: ["Esta referencia ya está asignada para un producto."]
            }
          });
        }
      }
    }
    
    throw error;
  }
}

@Get(':id')
async getPrductoID ( @Param('id', ValidacionPipeIntPipe) id: number) {

  try {

    return await this.productsService.getPrductoID(id)
    
  } catch (error) {
    if (error.message.includes("Usuario no existe")){
      throw new NotFoundException({
        statusCode: 404,
        message: "Usuario no existe"
      });
    }
  }

}

@Get(":id/similar")
async productosSimilares (@Param('id', ValidacionPipeIntPipe) id: number) {

  try {
    return await this.productsService.findSimilarProducts(id);
  } catch (error) {
    if (error.message.includes("Producto no encontrado")){
      throw new NotFoundException({
        statusCode: 404,
        message: "Producto no encontrado"
      })
    }

    throw error;
  }

}

  

}

