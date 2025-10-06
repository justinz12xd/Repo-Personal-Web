import { Refugio } from "./rrefugio";
import { Animal } from "./ranimal";
import { Seguimiento } from "./rseguimiento";
export declare class Supervisor {
    id_supervisor: string;
    nombre: string;
    total_animales: number;
    id_refugio: string;
    refugio: Refugio;
    animales?: Animal[];
    seguimientos?: Seguimiento[];
}
//# sourceMappingURL=rsupervisor.d.ts.map