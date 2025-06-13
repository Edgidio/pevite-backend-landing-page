import { Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialService {

  private testimonial = [

    {
      "id": 1,
      "name": "Carlos Méndez",
      "testimonial": "Pevite implementó un sistema IoT que revolucionó nuestra cadena de producción. En 6 meses redujimos un 30% los tiempos de inactividad y aumentamos la eficiencia energética. Su equipo técnico es excepcional.",
    },
    {
      "id": 2,
      "name": "Ana Lucía Ramírez",
      "testimonial": "El software personalizado que desarrolló Pevite para nuestra flota de transporte nos permitió optimizar rutas y reducir costos en un 22%. Excelente soporte post-implementación.",
    },
    {
      "id": 3,
      "name": "Roberto Fernández",
      "testimonial": "Trabajar con Pevite en nuestro proyecto de hardware industrial fue una decisión acertada. Entregaron un producto de alta calidad que superó nuestras expectativas técnicas.",

    },
  ]

  findAll() {
    return this.testimonial
  }


}
