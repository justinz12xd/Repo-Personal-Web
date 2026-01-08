import { Especie } from "./respecie";
import { Refugio } from "./rrefugio";
import { Supervisor } from "./rsupervisor";
import { Publicacion } from "./rpublicacion";
import { Seguimiento } from "./rseguimiento";
import { CausaUrgente } from "./rcausa_urgente";
export declare class Animal {
    id_animal: string;
    nombre: string;
    edad: string;
    estado: string;
    descripcion?: string;
    fotos?: string[];
    estado_adopcion: string;
    id_especie: string;
    id_refugio: string;
    id_supervisor?: string;
    especie: Especie;
    refugio: Refugio;
    supervisor?: Supervisor;
    publicaciones?: Publicacion[];
    seguimientos?: Seguimiento[];
    causas_urgentes?: CausaUrgente[];
}
//# sourceMappingURL=ranimal.d.ts.map