import { v4 as uuidv4 } from 'uuid';

export interface Seguimiento {
    id_seguimiento: string;
    titulo: string;
    observaciones?: string;
    fecha_seguimiento: Date;
    id_animal: string;
    id_supervisor: string;
}

export function CreadorDeSeguimiento(data: Omit<Seguimiento, 'id_seguimiento' | 'fecha_seguimiento'>): Seguimiento {
    if (!data.titulo || !data.titulo.trim()) throw new Error('Titulo requerido');
    if (!data.id_animal || !data.id_animal.trim()) throw new Error('id_animal (FK) requerido');
    if (!data.id_supervisor || !data.id_supervisor.trim()) throw new Error('id_supervisor (FK) requerido');
    return {
        id_seguimiento: uuidv4(),
        fecha_seguimiento: new Date(),
        ...data
    };
}
