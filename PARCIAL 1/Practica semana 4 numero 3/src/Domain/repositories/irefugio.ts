import { Refugio } from "../entities/refugio";

export interface RefugioCreador {
    nombre: string;
    direccion?: string;
    telefono?: string;
    descripcion?: string;
}

export interface RefugioUpdate {
    nombre?: string;
    direccion?: string;
    telefono?: string;
    descripcion?: string;
}

export interface IRefugioRepo {
    insert(refugio: RefugioCreador, callback: (err: Error | null, result?: Refugio) => void): void;
    findById(id: string): Promise<Refugio | null>;
    findAll(): Promise<Refugio[]>;
    update(id: string, data: RefugioUpdate): Promise<Refugio>;
    delete(id: string): Promise<boolean>;
    
    // Métodos adicionales específicos
    findByNombre(nombre: string): Promise<Refugio | null>;
    findByDireccion(direccion: string): Promise<Refugio[]>;
}
