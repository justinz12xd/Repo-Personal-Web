import { v4 as uuidv4 } from "uuid";

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    contraseña: string;
    telefono?: string;
    direccion?: string;
    rol: "admin" | "usuario" ;
    fechaRegistro: Date;
}

export function CreadorDeUsuario(data: Omit<Usuario, "id" | "fechaRegistro">): Usuario {
    ValidarDatosUsuario(data);
    
    return {
        id: uuidv4(),
        fechaRegistro: new Date(),
        ...data
    };
}
function ValidarDatosUsuario(data: Omit<Usuario, "id" | "fechaRegistro">): void {
    if (!data.nombre?.trim()) throw new Error("Nombre requerido");
    if (!data.email?.trim() || !data.email.includes("@")) throw new Error("Email inválido");
    if (data.contraseña.length < 6) throw new Error("Contraseña debe tener al menos 6 caracteres");
    if (data.rol !== "admin" && data.rol !== "usuario") throw new Error("Rol inválido");
}