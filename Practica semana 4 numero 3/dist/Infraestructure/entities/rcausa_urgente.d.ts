import { Refugio } from "./rrefugio";
import { Animal } from "./ranimal";
import { Donacion } from "./rdonacion";
export declare class CausaUrgente {
    id_causa_urgente: string;
    titulo: string;
    descripcion?: string;
    meta: number;
    fecha_limite: Date;
    id_refugio: string;
    id_animal?: string;
    refugio: Refugio;
    animal?: Animal;
    donaciones?: Donacion[];
}
//# sourceMappingURL=rcausa_urgente.d.ts.map