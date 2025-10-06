import { Seguimiento } from "../entities/seguimiento";
export interface SeguimientoCreador {
    titulo: string;
    observaciones?: string;
    id_animal: string;
    id_supervisor: string;
}
export interface SeguimientoUpdate {
    titulo?: string;
    observaciones?: string;
}
export interface ISeguimientoRepo {
    insert(seguimiento: SeguimientoCreador, callback: (err: Error | null, result?: Seguimiento) => void): void;
    findById(id: string): Promise<Seguimiento | null>;
    findAll(): Promise<Seguimiento[]>;
    update(id: string, data: SeguimientoUpdate): Promise<Seguimiento>;
    delete(id: string): Promise<boolean>;
    findByAnimal(id_animal: string): Promise<Seguimiento[]>;
    findBySupervisor(id_supervisor: string): Promise<Seguimiento[]>;
    findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Seguimiento[]>;
    findRecientesByAnimal(id_animal: string, limit: number): Promise<Seguimiento[]>;
}
//# sourceMappingURL=iseguimiento.d.ts.map