import { Injectable } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquipoService {

private teamMembers = [
  {
    id: 1,
    name: "Humberto Aviño",
    position: "Director General & Fundador",
    image: "/assets/img/team/team-13.png",
    socialLinks: {
      facebook: "#",
      pinterest: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 2,
    name: "Desire Viloria",
    position: "Asesora Legal Corporativa",
    image: "/assets/img/team/team-13.png",
    socialLinks: {
      facebook: "#",
      pinterest: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 3,
    name: "Edgidio León",
    position: "Director de Ingeniería y Desarrollo",
    image: "/assets/img/team/team-13.png",
    socialLinks: {
      facebook: "#",
      pinterest: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 4,
    name: "Carlos Ramírez",
    position: "Especialista en Innovación Tecnológica",
    image: "/assets/img/team/team-13.png",
    socialLinks: {
      facebook: "#",
      pinterest: "#",
      twitter: "#",
      instagram: "#"
    }
  }
];

  findAll() {
    return this.teamMembers
  }

}
