export interface Supervisor {
    id_supervisor: string;
    nombre: string;
    total_animales: number;
    id_refugio?: string;
    id_animal?: string;
}
export declare function CreadorDeSupervisor(data: Omit<Supervisor, 'id_supervisor'>): Supervisor;
//# sourceMappingURL=supervisor.d.ts.map