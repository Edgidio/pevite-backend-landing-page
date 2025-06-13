import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ServiciosService {

  private servicios = [
    {
      "id": 1,
      "title": "Soluciones IoT, Internet of Things",
      "description": "En Pevite desarrollamos e implementamos soluciones IoT personalizadas que permiten conectar dispositivos, recolectar datos en tiempo real y optimizar procesos industriales. Nuestros sistemas IoT transforman datos en insights accionables para mejorar la eficiencia operativa de tu negocio.",
      "image": "/assets/img/service/service-2.jpg",
      "icon": "iot-icon",
      "details": {
        "overview": "Pevite ofrece soluciones IoT completas que integran hardware, software y conectividad para crear sistemas inteligentes. Transformamos industrias mediante la digitalización de procesos y el análisis de datos en tiempo real.",
        "features": [
          "Arquitecturas IoT escalables",
          "Integración de sensores y dispositivos",
          "Plataformas de visualización de datos",
          "Soluciones para industria 4.0",
          "Analítica predictiva"
        ],
        "benefits": [
          "Automatización de procesos",
          "Reducción de costos operativos",
          "Toma de decisiones basada en datos",
          "Monitoreo remoto 24/7",
          "Mayor eficiencia energética"
        ],
        "strategy": {
          "title": "Estrategia IoT Personalizada",
          "description": "Desarrollamos planes estratégicos para implementación IoT que garantizan escalabilidad y futuro crecimiento de tus sistemas conectados."
        },
        "design": {
          "title": "Diseño de Arquitectura IoT",
          "description": "Creamos arquitecturas robustas considerando seguridad, latencia y disponibilidad para tus soluciones de Internet de las Cosas."
        },
        "testing": {
          "title": "Validación de Sistemas IoT",
          "description": "Realizamos pruebas exhaustivas de conectividad, rendimiento y seguridad en todos los componentes del ecosistema IoT."
        },
        "optimization": {
          "title": "Optimización de Redes IoT",
          "description": "Mejoramos el rendimiento de tus redes de dispositivos conectados mediante protocolos eficientes y gestión inteligente del ancho de banda."
        },
        "process_steps": [
          {
            "title": "Análisis de Requerimientos",
            "description": "Evaluamos tus procesos operativos para identificar oportunidades de automatización y digitalización mediante IoT."
          },
          {
            "title": "Diseño de Solución",
            "description": "Desarrollamos la arquitectura técnica especificando dispositivos, protocolos y plataformas necesarias."
          },
          {
            "title": "Implementación Piloto",
            "description": "Desplegamos un proyecto piloto para validar el funcionamiento en condiciones reales controladas."
          },
          {
            "title": "Escalamiento y Monitoreo",
            "description": "Expandimos la solución a toda la operación con sistemas de monitoreo continuo del desempeño."
          }
        ],
        "categories": [
          "Plataformas IoT Empresariales",
          "Smart Manufacturing",
          "Monitoreo Remoto",
          "Analítica Predictiva",
          "Automatización Industrial"
        ]
      }
    },
    {
      "id": 2,
      "title": "Desarrollo de Software",
      "description": "Pevite crea aplicaciones software a medida utilizando tecnologías modernas y metodologías ágiles. Desarrollamos soluciones empresariales escalables, desde aplicaciones web hasta sistemas complejos, garantizando calidad, seguridad y alto rendimiento para tu operación.",
      "image": "/assets/img/service/service-1.jpg",
      "icon": "software-icon",
      "details": {
        "overview": "Nuestro equipo de desarrollo en Pevite construye software personalizado que se adapta perfectamente a tus necesidades empresariales, utilizando las últimas tecnologías y mejores prácticas de la industria.",
        "features": [
          "Aplicaciones web y móviles",
          "Sistemas ERP/CRM personalizados",
          "Integración de APIs",
          "Bases de datos optimizadas",
          "Arquitecturas microservicios"
        ],
        "benefits": [
          "Soluciones 100% adaptadas",
          "Escalabilidad garantizada",
          "Interfaces intuitivas",
          "Alta disponibilidad",
          "Soporte técnico especializado"
        ],
        "strategy": {
          "title": "Planificación de Desarrollo",
          "description": "Creamos roadmaps tecnológicos alineados con tus objetivos de negocio para garantizar el éxito de tus proyectos software."
        },
        "design": {
          "title": "Diseño UX/UI",
          "description": "Desarrollamos interfaces centradas en el usuario que mejoran la productividad y experiencia de tus equipos y clientes."
        },
        "testing": {
          "title": "QA y Testing Automatizado",
          "description": "Implementamos pruebas automatizadas para garantizar la calidad, seguridad y rendimiento de tus aplicaciones."
        },
        "optimization": {
          "title": "Optimización de Código",
          "description": "Refactorizamos y mejoramos continuamente el código para mantener alto desempeño y bajos costos operativos."
        },
        "process_steps": [
          {
            "title": "Recolección de Requerimientos",
            "description": "Documentamos detalladamente las necesidades funcionales y no funcionales de tu solución software."
          },
          {
            "title": "Prototipado Rápido",
            "description": "Desarrollamos MVP funcionales para validar conceptos y recibir retroalimentación temprana."
          },
          {
            "title": "Desarrollo Iterativo",
            "description": "Construimos tu solución en sprints cortos con entregables funcionales en cada iteración."
          },
          {
            "title": "Despliegue y Capacitación",
            "description": "Implementamos la solución en producción y capacitamos a tus equipos para su uso efectivo."
          }
        ],
        "categories": [
          "Aplicaciones Empresariales",
          "Sistemas de Gestión",
          "Desarrollo Web",
          "Aplicaciones Móviles",
          "Integración de Sistemas"
        ]
      }
    },
    {
      "id": 3,
      "title": "Redes Informáticas",
      "description": "Pevite diseña e implementa infraestructuras de red robustas y seguras para empresas. Nuestros expertos configuran redes LAN/WAN, VPNs y soluciones de conectividad avanzada para garantizar comunicaciones estables y protegidas en tu organización.",
      "image": "/assets/img/service/service-3.jpg",
      "icon": "networks-icon",
      "details": {
        "overview": "Implementamos en Pevite redes empresariales de alto rendimiento con los más altos estándares de seguridad, garantizando conectividad confiable para todas tus operaciones.",
        "features": [
          "Diseño de topologías de red",
          "Configuración de VLANs/VPNs",
          "Firewalls y seguridad perimetral",
          "Balanceo de carga",
          "Monitorización continua"
        ],
        "benefits": [
          "Conectividad ininterrumpida",
          "Protección contra amenazas",
          "Optimización del ancho de banda",
          "Alta disponibilidad",
          "Soporte 24/7"
        ],
        "strategy": {
          "title": "Estrategia de Conectividad",
          "description": "Desarrollamos planes de red que anticipan el crecimiento de tu empresa y necesidades tecnológicas futuras."
        },
        "design": {
          "title": "Arquitectura de Red",
          "description": "Diseñamos topologías de red escalables que optimizan el flujo de datos entre tus ubicaciones y la nube."
        },
        "testing": {
          "title": "Pruebas de Estrés",
          "description": "Evaluamos el rendimiento de tus redes bajo cargas máximas para garantizar disponibilidad en momentos críticos."
        },
        "optimization": {
          "title": "Optimización de Tráfico",
          "description": "Implementamos QoS y técnicas avanzadas para priorizar tráfico crítico y mejorar la experiencia de usuario."
        },
        "process_steps": [
          {
            "title": "Diagnóstico Inicial",
            "description": "Evaluamos tu infraestructura actual identificando cuellos de botella y oportunidades de mejora."
          },
          {
            "title": "Diseño de Solución",
            "description": "Planeamos la nueva arquitectura de red considerando seguridad, redundancia y escalabilidad."
          },
          {
            "title": "Implementación Faseada",
            "description": "Desplegamos la nueva infraestructura en fases para minimizar impacto en tus operaciones."
          },
          {
            "title": "Monitoreo Continuo",
            "description": "Proporcionamos herramientas de gestión proactiva para anticipar y resolver incidencias."
          }
        ],
        "categories": [
          "Redes Empresariales",
          "Conectividad Remota",
          "Seguridad de Red",
          "Infraestructura Cloud",
          "Redes SD-WAN"
        ]
      }
    },
    {
      "id": 4,
      "title": "Creación de Hardware",
      "description": "En Pevite desarrollamos hardware personalizado, desde prototipos hasta producción en serie. Creamos dispositivos electrónicos especializados con firmware optimizado para integrarse perfectamente con tus soluciones tecnológicas existentes.",
      "image": "/assets/img/service/service-4.jpg",
      "icon": "hardware-icon",
      "details": {
        "overview": "Pevite combina ingeniería electrónica y diseño industrial para crear dispositivos hardware innovadores que resuelven desafíos tecnológicos específicos de tu empresa.",
        "features": [
          "Diseño de PCBs personalizados",
          "Prototipado rápido",
          "Desarrollo de firmware embebido",
          "Certificaciones regulatorias",
          "Producción a escala"
        ],
        "benefits": [
          "Dispositivos a medida",
          "Optimización de costos",
          "Propiedad intelectual protegida",
          "Integración perfecta con software",
          "Soporte técnico especializado"
        ],
        "strategy": {
          "title": "Estrategia de Producto",
          "description": "Definimos la hoja de ruta para el desarrollo de tu hardware, desde concepto hasta manufactura."
        },
        "design": {
          "title": "Diseño Electrónico",
          "description": "Desarrollamos circuitos impresos y diagramas esquemáticos optimizados para tu aplicación específica."
        },
        "testing": {
          "title": "Validación de Hardware",
          "description": "Realizamos pruebas ambientales, de estrés y durabilidad para garantizar la confiabilidad de tus dispositivos."
        },
        "optimization": {
          "title": "Optimización de Componentes",
          "description": "Seleccionamos los mejores componentes para equilibrar costo, rendimiento y disponibilidad a largo plazo."
        },
        "process_steps": [
          {
            "title": "Conceptualización",
            "description": "Trabajamos contigo para definir especificaciones técnicas y requerimientos funcionales del hardware."
          },
          {
            "title": "Prototipado",
            "description": "Desarrollamos versiones iniciales para validar el diseño antes de pasar a producción."
          },
          {
            "title": "Desarrollo de Firmware",
            "description": "Programamos el software embebido que controla el funcionamiento de tus dispositivos."
          },
          {
            "title": "Certificación y Producción",
            "description": "Gestionamos las homologaciones necesarias y escalamos a manufactura en serie."
          }
        ],
        "categories": [
          "Dispositivos IoT",
          "Hardware Industrial",
          "Sensores Especializados",
          "Sistemas Embebidos",
          "Electrónica de Potencia"
        ]
      }
    },
    {
      "id": 5,
      "title": "Integración IoT-Hardware",
      "description": "Pevite ofrece soluciones completas de integración entre dispositivos hardware y plataformas IoT. Diseñamos sistemas donde el hardware personalizado se comunica eficientemente con la nube, permitiendo monitorización y control remoto de tus operaciones.",
      "image": "/assets/img/service/service-8.jpg",
      "icon": "iot-hardware-icon",
      "details": {
        "overview": "En Pevite creamos soluciones llave en mano que unen hardware especializado con plataformas IoT, permitiendo una comunicación perfecta entre dispositivos físicos y sistemas en la nube.",
        "features": [
          "Diseño de dispositivos IoT",
          "Desarrollo de gateways inteligentes",
          "Integración cloud/edge",
          "Protocolos de comunicación seguros",
          "Soluciones edge computing"
        ],
        "benefits": [
          "Sistemas completos integrados",
          "Reducción de latencia",
          "Procesamiento local de datos",
          "Mayor eficiencia energética",
          "Escalabilidad garantizada"
        ],
        "strategy": {
          "title": "Estrategia de Integración",
          "description": "Desarrollamos planes para conectar tus dispositivos físicos con plataformas digitales de manera eficiente y segura."
        },
        "design": {
          "title": "Arquitectura Híbrida",
          "description": "Diseñamos sistemas que combinan procesamiento local (edge) con almacenamiento y análisis en la nube."
        },
        "testing": {
          "title": "Pruebas de Interoperabilidad",
          "description": "Verificamos que todos los componentes del ecosistema IoT-Hardware funcionen perfectamente integrados."
        },
        "optimization": {
          "title": "Optimización de Comunicaciones",
          "description": "Ajustamos protocolos y frecuencias para maximizar la eficiencia en la transmisión de datos."
        },
        "process_steps": [
          {
            "title": "Análisis de Dispositivos",
            "description": "Evaluamos tus equipos existentes para determinar capacidades de conectividad y necesidades de adaptación."
          },
          {
            "title": "Desarrollo de Gateway",
            "description": "Creamos el hardware/software puente que permite la comunicación entre dispositivos y la nube."
          },
          {
            "title": "Integración de Plataforma",
            "description": "Conectamos tus dispositivos con dashboards y sistemas de gestión en la nube."
          },
          {
            "title": "Automatización de Flujos",
            "description": "Configuramos reglas y automatismos para que los datos se transformen en acciones concretas."
          }
        ],
        "categories": [
          "Edge Computing",
          "Gateways IoT",
          "Comunicaciones M2M",
          "Industrial IoT",
          "Smart Devices"
        ]
      }
    },
    {
      "id": 6,
      "title": "Mantenimiento de Redes",
      "description": "El equipo de Pevite proporciona mantenimiento profesional para infraestructuras de red, con monitoreo proactivo y respuesta rápida a incidencias. Garantizamos la máxima disponibilidad y seguridad de tus sistemas de conectividad empresarial.",
      "image": "/assets/img/service/service-9.jpg",
      "icon": "network-maintenance-icon",
      "details": {
        "overview": "Nuestros servicios de mantenimiento en Pevite aseguran que tu infraestructura de red opere siempre al máximo rendimiento, con actualizaciones constantes y protección contra vulnerabilidades.",
        "features": [
          "Monitoreo 24/7",
          "Actualizaciones de firmware",
          "Optimización de rendimiento",
          "Respuesta rápida a incidencias",
          "Informes periódicos"
        ],
        "benefits": [
          "Prevención de fallos",
          "Tiempos de actividad maximizados",
          "Seguridad actualizada",
          "Reducción de costos operativos",
          "Soporte técnico inmediato"
        ],
        "strategy": {
          "title": "Plan de Mantenimiento",
          "description": "Desarrollamos estrategias personalizadas de mantenimiento predictivo y preventivo para tu infraestructura."
        },
        "design": {
          "title": "Diseño de Monitoreo",
          "description": "Implementamos dashboards y alertas personalizadas para gestionar proactivamente tu red."
        },
        "testing": {
          "title": "Pruebas de Vulnerabilidad",
          "description": "Realizamos evaluaciones periódicas de seguridad para identificar y corregir posibles riesgos."
        },
        "optimization": {
          "title": "Optimización Continua",
          "description": "Ajustamos constantemente parámetros de red para mejorar rendimiento basado en patrones de uso."
        },
        "process_steps": [
          {
            "title": "Evaluación Inicial",
            "description": "Realizamos un diagnóstico completo del estado actual de tu infraestructura de red."
          },
          {
            "title": "Implementación de Herramientas",
            "description": "Desplegamos sistemas de monitoreo y gestión para mantener control sobre tu red."
          },
          {
            "title": "Mantenimiento Programado",
            "description": "Ejecutamos actualizaciones y ajustes durante ventanas de mantenimiento acordadas."
          },
          {
            "title": "Reporte y Mejora",
            "description": "Proporcionamos informes detallados con métricas y recomendaciones para optimización."
          }
        ],
        "categories": [
          "Soporte de Red",
          "Seguridad de Infraestructura",
          "Monitoreo de Redes",
          "Actualizaciones de Hardware",
          "Respuesta a Incidentes"
        ]
      }
    },
    {
      "id": 7,
      "title": "Apps IoT y Embebidas",
      "description": "Pevite desarrolla aplicaciones especializadas para dispositivos IoT y sistemas embebidos, con interfaces intuitivas y funcionalidades avanzadas. Creamos soluciones que permiten visualizar y gestionar tus dispositivos inteligentes desde cualquier lugar.",
      "image": "/assets/img/service/service-10.jpg",
      "icon": "embedded-apps-icon",
      "details": {
        "overview": "En Pevite diseñamos aplicaciones optimizadas para sistemas embebidos e IoT, con interfaces amigables que permiten controlar y monitorizar tus dispositivos inteligentes desde cualquier plataforma.",
        "features": [
          "Dashboards IoT personalizados",
          "Aplicaciones para gestión remota",
          "Sistemas embebidos con Linux/RTOS",
          "Optimización de recursos",
          "Actualizaciones OTA"
        ],
        "benefits": [
          "Control centralizado",
          "Visualización de datos en tiempo real",
          "Bajo consumo de recursos",
          "Actualizaciones remotas seguras",
          "Experiencia de usuario mejorada"
        ],
        "strategy": {
          "title": "Estrategia de Desarrollo Embebido",
          "description": "Planeamos la arquitectura de software considerando limitaciones de hardware y requerimientos en tiempo real."
        },
        "design": {
          "title": "Diseño de Interfaces",
          "description": "Creamos UIs adaptadas a pantallas pequeñas y entornos operativos específicos de tus dispositivos."
        },
        "testing": {
          "title": "Pruebas en Hardware Real",
          "description": "Validamos el funcionamiento de las apps en los dispositivos objetivo bajo diversas condiciones."
        },
        "optimization": {
          "title": "Optimización de Recursos",
          "description": "Aseguramos que las aplicaciones funcionen eficientemente dentro de las limitaciones de memoria y procesamiento."
        },
        "process_steps": [
          {
            "title": "Análisis de Plataforma",
            "description": "Evaluamos las capacidades y limitaciones del hardware objetivo para el desarrollo."
          },
          {
            "title": "Desarrollo de Drivers",
            "description": "Programamos las capas de bajo nivel necesarias para interactuar con los componentes físicos."
          },
          {
            "title": "Implementación de Lógica",
            "description": "Desarrollamos las funcionalidades centrales de la aplicación optimizadas para el hardware."
          },
          {
            "title": "Despliegue y Actualización",
            "description": "Implementamos sistemas seguros para distribución y actualización del software embebido."
          }
        ],
        "categories": [
          "Aplicaciones para IoT",
          "Sistemas Embebidos",
          "Interfaces HMI",
          "Control Industrial",
          "Dispositivos Wearables"
        ]
      }
    },
    {
      "id": 8,
      "title": "Consultoría Infraestructura",
      "description": "Los consultores de Pevite analizan y optimizan tu infraestructura tecnológica, recomendando las mejores soluciones para cada necesidad. Ayudamos a planificar migraciones, modernizar sistemas y maximizar el ROI de tus inversiones en TI.",
      "image": "/assets/img/service/service-11.jpg",
      "icon": "consulting-icon",
      "details": {
        "overview": "Nuestros expertos en Pevite realizan auditorías completas de tu infraestructura tecnológica, identificando oportunidades de mejora y diseñando roadmaps para su evolución.",
        "features": [
          "Auditorías tecnológicas",
          "Planificación de migraciones",
          "Optimización de data centers",
          "Arquitecturas cloud/híbridas",
          "Análisis de ROI tecnológico"
        ],
        "benefits": [
          "Reducción de costos operativos",
          "Mayor eficiencia tecnológica",
          "Preparación para el futuro",
          "Toma de decisiones informada",
          "Maximización de inversiones"
        ],
        "strategy": {
          "title": "Estrategia Tecnológica",
          "description": "Desarrollamos planes a mediano y largo plazo para la evolución de tu infraestructura TI."
        },
        "design": {
          "title": "Diseño de Arquitectura",
          "description": "Creamos blueprints técnicos para modernizar tus sistemas manteniendo interoperabilidad."
        },
        "testing": {
          "title": "Evaluación de Soluciones",
          "description": "Validamos tecnologías emergentes para determinar su aplicabilidad en tu entorno."
        },
        "optimization": {
          "title": "Optimización de Costos",
          "description": "Identificamos oportunidades para reducir gastos sin comprometer capacidad o seguridad."
        },
        "process_steps": [
          {
            "title": "Diagnóstico Integral",
            "description": "Evaluamos tu infraestructura actual identificando fortalezas, debilidades y oportunidades."
          },
          {
            "title": "Benchmarking",
            "description": "Comparamos tu infraestructura con estándares de la industria y mejores prácticas."
          },
          {
            "title": "Recomendaciones Estratégicas",
            "description": "Proponemos un plan detallado para modernizar y optimizar tus sistemas."
          },
          {
            "title": "Acompañamiento en Implementación",
            "description": "Asesoramos durante la ejecución de las mejoras para garantizar resultados."
          }
        ],
        "categories": [
          "Modernización de TI",
          "Transformación Digital",
          "Arquitectura Cloud",
          "Estrategia Tecnológica",
          "Optimización de Infraestructura"
        ]
      }
    }

  

      ]

  findAll() {
    return this.servicios
  }

  findOne(id: number) {
    
    const servicio = this.servicios.find( (servicio)=> {

      if (id == servicio.id){
        return servicio
      }

    })

    if (!servicio){
      throw new NotFoundException({
        statusCode: 404,
        message: "Servicio no existe"
      }) 
    }


    return servicio

  }

  four () {

    return this.servicios.slice(0,4) 
  }
}
