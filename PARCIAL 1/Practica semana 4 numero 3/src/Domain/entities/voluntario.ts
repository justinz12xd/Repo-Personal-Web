import { v4 as uuidv4 } from 'uuid';

export interface Voluntario {
    id_voluntario: string;
    rol: string;
    estado: string;
    id_usuario: string;
    id_campania: string;
}

export function CreadorDeVoluntario(data: Omit<Voluntario, 'id_voluntario'>): Voluntario {
    if (!data.rol || !data.rol.trim()) throw new Error('Rol requerido');
    if (!data.estado || !data.estado.trim()) throw new Error('Estado requerido');
    if (!data.id_usuario || !data.id_usuario.trim()) throw new Error('id_usuario (FK) requerido');
    if (!data.id_campania || !data.id_campania.trim()) throw new Error('id_campania (FK) requerido');
    return {
        id_voluntario: uuidv4(),
        ...data
    };
}
