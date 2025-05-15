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
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  
  @Controller('productos')
  export class ProductsController {
    constructor(
      private readonly productsService: ProductsService,

    ) {}
  
    @Post()
    @UseInterceptors(
      FilesInterceptor('images', 3,)
    )
    async create(@Body() createProductDto: CreateProductDto, @UploadedFiles() images: Express.Multer.File[]) {
      console.log(images)
      return "Subidas las imagenes"
 
    }


  
   /*  @Get()
    findAll() {
      return this.productsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.productsService.findOne(+id);
    }
  
    @Put(':id')
    @UseInterceptors(FilesInterceptor('images', 4, { storage: diskStorage({ destination: './uploads' }) }))
    update(
      @Param('id') id: string,
      @Body() updateProductDto: UpdateProductDto,
      @UploadedFiles() files: Express.Multer.File[],
    ) {
      return this.productsService.update(+id, updateProductDto, files);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.productsService.remove(+id);
    }
  */
  } 