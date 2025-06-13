import { Injectable, UseGuards } from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Injectable()

export class ContactoService {

  constructor( @InjectRepository(Contacto) private readonly contactoRepository: Repository<Contacto>  ) {

  }

  async create(createContactoDto: CreateContactoDto) {
    
    try {

      // Contar todos los registros existentes con este email para evitar spam
      const totalRegistros = await this.contactoRepository.count({ where: { email: createContactoDto.email } });


      if (totalRegistros >= 2) {
        return "¡Gracias por escribirnos! ✉️ Ya recibimos tu mensaje anterior y estamos gestionándolo. Te contactaremos pronto; no es necesario reenviarlo."
      }

      const contacto = this.contactoRepository.create(createContactoDto)
      await this.contactoRepository.save(contacto);

      return "¡Gracias por contactarnos! 🎉 Hemos recibido tu información correctamente y nos pondremos en contacto contigo a la brevedad."

      
    } catch (error) {

      console.log(error)

      return "Lamentamos los inconvenientes. Hubo un error inesperado al procesar tu solicitud, pero ya estamos trabajando para solucionarlo. Por favor, intenta nuevamente en unos minutos."
    }

  }

  
  async findAll() {

    try {

      const correos = await this.contactoRepository.find();

      return correos

      
    } catch (error) {

      console.log(error)

      return "Hubo un error inesperado al procesar la solicitud, contacta al hacker de hacker para ver que puso haber pasado al procesar la solicitud"
    }

  }


  async findOne(id: number) {

    try {
      
      const correo = await this.contactoRepository.findOne({ where: { id }})

      if (!correo){
        return {
          status: 404,
          message: "Correo no existe",
          date: new Date()
        }
      }

      return correo

    } catch (error) {
      console.log(error)

      return "Hubo un error inesperado al procesar la solicitud, contacta al hacker de hacker para ver que puso haber pasado al procesar la solicitud"
    }
  }


  async remove(id: number) {

    try {

      const validarCorreoID = await this.contactoRepository.findBy({
        id: id
      })

      if (validarCorreoID.length <= 0) {
        return  {
          status: 404,
          message: "Correo no existe",
          date: new Date()
        } 
      }

      await this.contactoRepository.delete(+id);

      return "Correo eliminado con éxito."

    } catch (error) {

      console.log(error)

      return "Hubo un error inesperado al procesar la solicitud, contacta al hacker de hacker para ver que puso haber pasado al procesar la solicitud"
    }
  }

}
