import { CausaUrgente } from "../entities/causa_urgente";

export interface CausaUrgenteCreador {
    titulo: string;
    descripcion?: string;
    meta: number;
    fecha_limite: Date;
    id_refugio: string;
    id_animal?: string;
}

export interface CausaUrgenteUpdate {
    titulo?: string;
    descripcion?: string;
    meta?: number;
    fecha_limite?: Date;
}

export interface ICausaUrgenteRepo {
    insert(causaUrgente: CausaUrgenteCreador, callback: (err: Error | null, result?: CausaUrgente) => void): void;
    findById(id: string): Promise<CausaUrgente | null>;
    findAll(): Promise<CausaUrgente[]>;
    update(id: string, data: CausaUrgenteUpdate): Promise<CausaUrgente>;
    delete(id: string): Promise<boolean>;
    
    // Métodos adicionales específicos
    findByRefugio(id_refugio: string): Promise<CausaUrgente[]>;
    findByAnimal(id_animal: string): Promise<CausaUrgente[]>;
    findActivas(): Promise<CausaUrgente[]>;
    findProximasAVencer(dias: number): Promise<CausaUrgente[]>;
    calcularTotalRecaudado(id_causa: string): Promise<number>;
    calcularPorcentajeAlcanzado(id_causa: string): Promise<number>;
}
