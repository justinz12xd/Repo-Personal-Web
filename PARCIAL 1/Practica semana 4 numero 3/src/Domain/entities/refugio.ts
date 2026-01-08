import { v4 as uuidv4 } from 'uuid';

export interface Refugio {
    id_refugio: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    descripcion?: string;
}

export function CreadorDeRefugio(data: Omit<Refugio, 'id_refugio'>): Refugio {
    if (!data.nombre || !data.nombre.trim()) throw new Error('Nombre de refugio requerido');
    return {
        id_refugio: uuidv4(),
        ...data
    };
}
