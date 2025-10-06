import { Especie } from "../entities/especie";

export interface EspecieCreador {
    nombre: string;
}

export interface EspecieUpdate {
    nombre?: string;
}

export interface IEspecieRepo {
    insert(especie: EspecieCreador, callback: (err: Error | null, result?: Especie) => void): void;
    findById(id: string): Promise<Especie | null>;
    findAll(): Promise<Especie[]>;
    update(id: string, data: EspecieUpdate): Promise<Especie>;
    delete(id: string): Promise<boolean>;
    
    // Métodos adicionales específicos
    findByNombre(nombre: string): Promise<Especie | null>;
}
