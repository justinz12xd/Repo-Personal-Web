import { ICampania, CampaniaCreator, CampaniaUpdater} from "../Domain/repositories/icampania";
import { Campania, CreadorDeCampania} from "../Domain/entities/campania";

export class CompaniaRepoMemory implements ICampania {
    private campanias: Campania[] = [];

    constructor() {
      this.Campaniasprueba();
    }

    private Campaniasprueba() {
        const datos_campania = [
        {
          tipo_campania: "Salud",
          titulo: "Campaña de vacunación",
          descripcion: "Vacunación gratuita para la comunidad",
          fecha_inicio: new Date("2024-07-01"),
          fecha_fin: new Date("2024-07-31"),
          lugar: "Centro Comunitario",
          organizador: "Clínica Local",
          activo: true
       },
       {
        tipo_campania: "Adopción",
        titulo: "Adopta una mascota",
        descripcion: "Campaña para promover la adopción responsable de mascotas",
        fecha_inicio: new Date("2024-08-01"),
        fecha_fin: new Date("2024-08-31"),
        lugar: "Refugio de Animales Municipal",
        organizador: "Protectora de Animales",
        activo: true
       },
       {
        tipo_campania: "Esterilización",
        titulo: "Campaña de esterilización gratuita",
        descripcion: "Esterilización gratuita para perros y gatos de bajos recursos",
        fecha_inicio: new Date("2024-09-15"),
        fecha_fin: new Date("2024-09-30"),
        lugar: "Clínica Veterinaria Central",
        organizador: "Colegio de Veterinarios",
        activo: true
       },
       {
        tipo_campania: "Educación",
        titulo: "Cuidado responsable de mascotas",
        descripcion: "Talleres educativos sobre cuidado y tenencia responsable",
        fecha_inicio: new Date("2024-10-01"),
        fecha_fin: new Date("2024-10-15"),
        lugar: "Centro Educativo San José",
        organizador: "Fundación Amor Animal",
        activo: false
       },
       {
        tipo_campania: "Rescate",
        titulo: "Operación rescate de animales callejeros",
        descripcion: "Rescate y rehabilitación de animales en situación de calle",
        fecha_inicio: new Date("2024-06-01"),
        fecha_fin: new Date("2024-12-31"),
        lugar: "Toda la ciudad",
        organizador: "Red de Rescatistas",
        activo: true
      },
      {
        tipo_campania: "Donación",
        titulo: "Recolección de alimento para refugios",
        descripcion: "Campaña para recolectar alimento y medicinas para refugios",
        fecha_inicio: new Date("2024-11-01"),
        fecha_fin: new Date("2024-11-30"),
        lugar: "Supermercados participantes",
        organizador: "Alianza de Refugios",
        activo: true
      },
      {
        tipo_campania: "Salud", 
        titulo: "Jornada de desparasitación",
        descripcion: "Desparasitación gratuita para mascotas de la comunidad",
        fecha_inicio: new Date("2024-05-15"),
        fecha_fin: new Date("2024-05-31"),
        lugar: "Plaza Principal",
        organizador: "Municipalidad",
        activo: false
      },
      {
        tipo_campania: "Adopción",
        titulo: "Feria de adopción navideña",
        descripcion: "Evento especial de adopción durante las fiestas navideñas",
        fecha_inicio: new Date("2024-12-15"),
        fecha_fin: new Date("2024-12-24"),
        lugar: "Centro Comercial Plaza Norte",
        organizador: "Hogar de Animales Esperanza",
        activo: true
      },
      {
        tipo_campania: "Concientización",
        titulo: "No al maltrato animal",
        descripcion: "Campaña de concientización contra el maltrato animal",
        fecha_inicio: new Date("2024-04-01"),
        fecha_fin: new Date("2024-04-30"),
        lugar: "Universidades y colegios",
        organizador: "Movimiento Defensores Animales",
        activo: false
      },
      {
        tipo_campania: "Rehabilitación",
        titulo: "Centro de rehabilitación de fauna silvestre",
        descripcion: "Apoyo para la rehabilitación de animales silvestres heridos",
        fecha_inicio: new Date("2024-03-01"),
        fecha_fin: new Date("2024-12-31"),
        lugar: "Reserva Natural Los Cedros",
        organizador: "SERNANP",
        activo: true
      }
    ];

    this.campanias.push(...datos_campania.map(CreadorDeCampania));
  }

  insert(campania: Campania, callback: (err: Error | null, result?: Campania) => void): void {
    setTimeout(() => {
      try {
        if (!campania) {
          return callback(new Error("Campania no proporcionada"));
        }
        const nuevaCampania = CreadorDeCampania(campania);
        const existe = this.campanias.some( c => c.id_campania === nuevaCampania.id_campania );
        if (existe) {
          return callback(new Error("Campania con este ID ya existe"));
        }
        this.campanias.push(nuevaCampania);
        callback(null, nuevaCampania);

      } catch (error) {
        if (error instanceof Error) {
          callback(error);
        } else {
          callback(new Error("Error desconocido al insertar campaña"));
        }
      }
    }, 500);
  }

  getById(id: string): Promise<Campania | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const campania = this.campanias.find(c => c.id_campania === id) || null;
        resolve(campania);
      }, 500);
    });
  }

  getAll(): Promise<Campania[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.campanias]);
      }, 500);
    });
  }

  async update(id: string, data: CampaniaUpdater): Promise<Campania | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!id || id.trim() === "") {
            return reject(new Error("ID no proporcionado"));
          }
          if (!data || Object.keys(data).length === 0) {
            return reject(new Error("Datos de actualización no proporcionados"));
          }
          const index = this.campanias.findIndex(c => c.id_campania === id);
          if (index === -1) {
            return reject(new Error("Campania no encontrada"));
          }
          const campaniaExistente = this.campanias[index];
          if (!campaniaExistente) {
            return reject(new Error("Error al obtener la campaña existente"));
          }

          const campaniaActualizada: Campania = {
            id_campania: campaniaExistente.id_campania,
            tipo_campania: data.tipo_campania ?? campaniaExistente.tipo_campania,
            titulo: data.titulo ?? campaniaExistente.titulo,
            descripcion: data.descripcion ?? campaniaExistente.descripcion,
            fecha_inicio: data.fecha_inicio ?? campaniaExistente.fecha_inicio,
            fecha_fin: data.fecha_fin ?? campaniaExistente.fecha_fin,
            lugar: data.lugar ?? campaniaExistente.lugar,
            organizador: data.organizador ?? campaniaExistente.organizador,
            activo: data.activo ?? campaniaExistente.activo
          };

          this.campanias[index] = campaniaActualizada;
          resolve(campaniaActualizada);
        } catch (error) {
          if (error instanceof Error) {
            reject(error);
          } else {
            reject(new Error("Error desconocido al actualizar campaña"));
          }
        }
      }, 500);
    });
  }

  delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!id || id.trim() === "") {
            return reject(new Error("ID no proporcionado"));
          }
          const index = this.campanias.findIndex(c => c.id_campania === id);
          if (index === -1) {
            resolve(false);
            return;
          }
          this.campanias.splice(index, 1);
          resolve(true);
        } catch (error) {
          if (error instanceof Error) {
            reject(error);
          } else {
            reject(new Error("Error desconocido al eliminar campaña"));
          }
        }
      }, 500);
    });
  }
}
