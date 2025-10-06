

import { v4 as uuidv4 } from 'uuid';


export interface Adopcion {
    id_adopcion: string;
    fecha_adopcion: Date;
    estado: string;
    id_publicacion: string;
    id_usuario: string;
}

export function CreadorDeAdopcion(data: Omit<Adopcion, 'id_adopcion' | 'fecha_adopcion'>): Adopcion {
    if (!data.estado || !data.estado.trim()) throw new Error('Estado requerido');
    if (!data.id_publicacion || !data.id_publicacion.trim()) throw new Error('id_publicacion (FK) requerido');
    if (!data.id_usuario || !data.id_usuario.trim()) throw new Error('id_usuario (FK) requerido');
    return {
        id_adopcion: uuidv4(),
        fecha_adopcion: new Date(),
        ...data
    }; 
}
