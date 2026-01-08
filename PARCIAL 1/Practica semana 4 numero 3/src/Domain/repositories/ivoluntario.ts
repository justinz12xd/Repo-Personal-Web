import { Voluntario } from "../entities/voluntario";

export interface VoluntarioCreador {
    rol: string;
    estado: string;
    id_usuario: string;
    id_campania: string;
}

export interface VoluntarioUpdate {
    rol?: string;
    estado?: string;
}

export interface IVoluntarioRepo {
    insert(voluntario: VoluntarioCreador, callback: (err: Error | null, result?: Voluntario) => void): void;
    findById(id: string): Promise<Voluntario | null>;
    findAll(): Promise<Voluntario[]>;
    update(id: string, data: VoluntarioUpdate): Promise<Voluntario>;
    delete(id: string): Promise<boolean>;
    
    // Métodos adicionales específicos
    findByUsuario(id_usuario: string): Promise<Voluntario[]>;
    findByCampania(id_campania: string): Promise<Voluntario[]>;
    findByEstado(estado: string): Promise<Voluntario[]>;
    findByRol(rol: string): Promise<Voluntario[]>;
    countVoluntariosByCampania(id_campania: string): Promise<number>;
}
