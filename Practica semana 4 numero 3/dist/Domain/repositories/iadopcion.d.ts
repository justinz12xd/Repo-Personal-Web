import { Adopcion } from "../entities/adopcion";
export interface AdopcionCreador {
    estado: string;
    id_publicacion: string;
    id_usuario: string;
}
export interface AdopcionUpdate {
    estado?: string;
}
export interface IAdopcionRepo {
    insert(adopcion: AdopcionCreador, callback: (err: Error | null, result?: Adopcion) => void): void;
    findById(id: string): Promise<Adopcion | null>;
    findAll(): Promise<Adopcion[]>;
    update(id: string, data: AdopcionUpdate): Promise<Adopcion>;
    delete(id: string): Promise<boolean>;
    findByUsuario(id_usuario: string): Promise<Adopcion[]>;
    findByPublicacion(id_publicacion: string): Promise<Adopcion[]>;
    findByEstado(estado: string): Promise<Adopcion[]>;
    findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Adopcion[]>;
    countAdopcionesByUsuario(id_usuario: string): Promise<number>;
}
//# sourceMappingURL=iadopcion.d.ts.map