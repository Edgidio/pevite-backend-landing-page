import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}


  @Get()
  findAll() {
    return this.testimonialService.findAll();
  }



}
