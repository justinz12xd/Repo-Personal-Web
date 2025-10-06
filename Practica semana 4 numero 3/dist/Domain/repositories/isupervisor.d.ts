import { Supervisor } from "../entities/supervisor";
export interface SupervisorCreador {
    nombre: string;
    total_animales: number;
    id_refugio: string;
}
export interface SupervisorUpdate {
    nombre?: string;
    total_animales?: number;
    id_refugio?: string;
}
export interface ISupervisorRepo {
    insert(supervisor: SupervisorCreador, callback: (err: Error | null, result?: Supervisor) => void): void;
    findById(id: string): Promise<Supervisor | null>;
    findAll(): Promise<Supervisor[]>;
    update(id: string, data: SupervisorUpdate): Promise<Supervisor>;
    delete(id: string): Promise<boolean>;
    findByRefugio(id_refugio: string): Promise<Supervisor[]>;
    findByNombre(nombre: string): Promise<Supervisor[]>;
    incrementarTotalAnimales(id: string): Promise<Supervisor>;
    decrementarTotalAnimales(id: string): Promise<Supervisor>;
}
//# sourceMappingURL=isupervisor.d.ts.map