import { Campania } from "../entities/campania";

export interface CampaniaCreator {
    nombre: string;
    tipo_campania: string;
    titulo: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar: string;
    organizador: string;
    activo: boolean;
}

export interface CampaniaUpdater {
    tipo_campania?: string;
    titulo?: string;
    descripcion?: string;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    lugar?: string;
    organizador?: string;
    activo?: boolean;
}

export interface ICampania {
    insert(campania: Campania, callback: (err: Error | null, result?: Campania) => void): void;
    getById(id: string) : Promise<Campania | null>;
    getAll(): Promise<Campania[]>;
    update(id: string, data: Partial<Campania>): Promise<Campania | null>;
    delete(id: string): Promise<boolean>;
}