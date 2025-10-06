import { v4 as uuidv4 } from "uuid";



export interface Usuario {
    id_usuario: string;
    nombre: string;
    email: string;
    contrasenia: string;
    telefono?: string;
    direccion?: string;
    fecha_registro: Date;
}

export function CreadorDeUsuario(data: Omit<Usuario, "id_usuario" | "fecha_registro">): Usuario {
    ValidarDatosUsuario(data);
    return {
        id_usuario: uuidv4(),
        fecha_registro: new Date(),
        ...data
    };
}

function ValidarDatosUsuario(data: Omit<Usuario, "id_usuario" | "fecha_registro">): void {
    if (!data.nombre?.trim()) throw new Error('Nombre requerido');
    if (!data.email?.trim() || !data.email.includes('@')) throw new Error('Email invalido');
    if (!data.contrasenia || data.contrasenia.length < 6) throw new Error('contrasenia debe tener al menos 6 caracteres');
}
