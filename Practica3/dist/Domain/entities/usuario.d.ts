export interface Usuario {
    id_usuario: string;
    nombre: string;
    email: string;
    contrasenia: string;
    telefono?: string;
    direccion?: string;
    fecha_registro: Date;
}
export declare function CreadorDeUsuario(data: Omit<Usuario, "id_usuario" | "fecha_registro">): Usuario;
//# sourceMappingURL=usuario.d.ts.map