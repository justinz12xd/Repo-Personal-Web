import { Animal } from "./ranimal";
import { Supervisor } from "./rsupervisor";
import { CausaUrgente } from "./rcausa_urgente";
export declare class Refugio {
    id_refugio: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    descripcion?: string;
    animales?: Animal[];
    supervisores?: Supervisor[];
    causas_urgentes?: CausaUrgente[];
}
//# sourceMappingURL=rrefugio.d.ts.map