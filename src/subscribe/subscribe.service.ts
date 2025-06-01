// src/subscribes/subscribes.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscribe } from './entities/subscribe.entity';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Injectable()
export class SubscribesService {
  constructor(
    @InjectRepository(Subscribe)
    private subscribesRepository: Repository<Subscribe>,
  ) {}

  async create(createSubscribeDto: CreateSubscribeDto) {

    const busquedaCorreo = await this.subscribesRepository.findOne({ where: {email: createSubscribeDto.email } });

    if (busquedaCorreo) {
      throw new BadRequestException( {
        status: 404,
        message: "¡Gracias por tu interés! Este correo electrónico ya está registrado en nuestra base de datos."
      }
    )
    }

    const subscribe = this.subscribesRepository.create(createSubscribeDto);
    const guardado = await this.subscribesRepository.save(subscribe);

    return {
      status: 201,
      message: "Tu registro se completó satisfactoriamente. A partir de ahora recibirás nuestro contenido exclusivo en tu bandeja de entrada."
    }

  }

  async findAll(): Promise<Subscribe[]> {
    return await this.subscribesRepository.find();
  }

  async findOne(id: number) {

    const busquedaCorreo = await this.subscribesRepository.findOne({ where: { id } });

    if (!busquedaCorreo) {
      return {
        status: 404,
        message: "El correo electrónico ingresado no se encuentra registrado en nuestro sistema."
      }
    }

    return busquedaCorreo
  }

  async updateStatus(id: number, status: boolean) {

    const busquedaCorreo = await this.subscribesRepository.findOne({ where: { id } });

    if (!busquedaCorreo) {
      return {
        status: 404,
        message: "El correo electrónico ingresado no se encuentra registrado en nuestro sistema."
      }
    }

    const act = await this.subscribesRepository.update(id, { status });

    return {
      status: 201,
      message: "¡Correo electrónico actualizado con éxito!",
    }
  }

  async remove(id: number){

    const busquedaCorreo = await this.subscribesRepository.findOne({ where: { id } });

    if (!busquedaCorreo) {
      return {
        status: 404,
        message: "El correo electrónico ingresado no se encuentra registrado en nuestro sistema."
      }
    }
  
    const act =  await this.subscribesRepository.delete(id);

    return {
      status: 201,
      message: "La dirección de correo ha sido eliminada de nuestros registros exitosamente."
    }

    
  }
}
