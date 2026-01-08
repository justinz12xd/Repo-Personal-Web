import {Usuario} from "../entities/usuario";

export interface UsuarioCreador{
    nombre: string;
    email: string;
    contraseña: string;
    telefono?: string;
    direccion?: string;
    rol: "admin" | "usuario" ;
}


export interface UsuarioUpdate{
    nombre?: string;
    email?: string;
    contraseña?: string;
    telefono?: string;
    direccion?: string;
}

export interface IUsuarioRepo {
    insert(usuario: UsuarioCreador, callback: (err: Error | null, result?: Usuario) => void): void;
    findById(id: string): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
    update(id: string, data: UsuarioUpdate): Promise<Usuario>;
    delete(id: string): Promise<boolean>;
}