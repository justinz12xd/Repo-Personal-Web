import { TipoCampania } from "./rtipo_campania";
import { Voluntario } from "./rvoluntario";
export declare class Campania {
    id_campania: string;
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar?: string;
    organizador?: string;
    estado: string;
    id_tipo_campania: string;
    tipo_campania: TipoCampania;
    voluntarios?: Voluntario[];
}
//# sourceMappingURL=rcampania.d.ts.map