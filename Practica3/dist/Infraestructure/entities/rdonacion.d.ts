import { Usuario } from "./rusuario";
import { CausaUrgente } from "./rcausa_urgente";
export declare class Donacion {
    id_donacion: string;
    monto: number;
    fecha: Date;
    id_usuario: string;
    id_causa_urgente?: string;
    usuario: Usuario;
    causa_urgente?: CausaUrgente;
}
//# sourceMappingURL=rdonacion.d.ts.map