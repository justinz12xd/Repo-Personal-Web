import { Usuario } from "../entities/usuario";
export interface UsuarioCreador {
    nombre: string;
    email: string;
    contrasenia: string;
    telefono?: string;
    direccion?: string;
}
export interface UsuarioUpdate {
    nombre?: string;
    email?: string;
    contrasenia?: string;
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
//# sourceMappingURL=iusuario.d.ts.map