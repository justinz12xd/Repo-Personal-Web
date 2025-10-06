import { TipoCampania } from "../entities/tipo_campania";

export interface TipoCampaniaCreador {
    nombre: string;
    descripcion?: string;
}

export interface TipoCampaniaUpdate {
    nombre?: string;
    descripcion?: string;
}

export interface ITipoCampaniaRepo {
    insert(tipoCampania: TipoCampaniaCreador, callback: (err: Error | null, result?: TipoCampania) => void): void;
    findById(id: string): Promise<TipoCampania | null>;
    findAll(): Promise<TipoCampania[]>;
    update(id: string, data: TipoCampaniaUpdate): Promise<TipoCampania>;
    delete(id: string): Promise<boolean>;
    
    // Métodos adicionales específicos
    findByNombre(nombre: string): Promise<TipoCampania | null>;
}
