import { Campania } from "../entities/campania";
export interface CampaniaCreador {
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar?: string;
    organizador?: string;
    estado: string;
    id_tipo_campania: string;
}
export interface CampaniaUpdate {
    titulo?: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    lugar?: string;
    organizador?: string;
    estado?: string;
    id_tipo_campania?: string;
}
export interface ICampaniaRepo {
    insert(campania: CampaniaCreador, callback: (err: Error | null, result?: Campania) => void): void;
    findById(id: string): Promise<Campania | null>;
    findAll(): Promise<Campania[]>;
    update(id: string, data: CampaniaUpdate): Promise<Campania>;
    delete(id: string): Promise<boolean>;
    findByTipoCampania(id_tipo_campania: string): Promise<Campania[]>;
    findByEstado(estado: string): Promise<Campania[]>;
    findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Campania[]>;
    findActivas(): Promise<Campania[]>;
}
//# sourceMappingURL=icampania.d.ts.map