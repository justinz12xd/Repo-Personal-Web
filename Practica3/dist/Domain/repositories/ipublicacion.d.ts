import { Publicacion } from "../entities/publicacion";
export interface PublicacionCreador {
    titulo: string;
    descripcion?: string;
    estado: string;
    id_usuario: string;
    id_animal: string;
}
export interface PublicacionUpdate {
    titulo?: string;
    descripcion?: string;
    estado?: string;
}
export interface IPublicacionRepo {
    insert(publicacion: PublicacionCreador, callback: (err: Error | null, result?: Publicacion) => void): void;
    findById(id: string): Promise<Publicacion | null>;
    findAll(): Promise<Publicacion[]>;
    update(id: string, data: PublicacionUpdate): Promise<Publicacion>;
    delete(id: string): Promise<boolean>;
    findByUsuario(id_usuario: string): Promise<Publicacion[]>;
    findByAnimal(id_animal: string): Promise<Publicacion[]>;
    findByEstado(estado: string): Promise<Publicacion[]>;
    findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Publicacion[]>;
}
//# sourceMappingURL=ipublicacion.d.ts.map