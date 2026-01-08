import { v4 as uuidv4 } from 'uuid';


export interface TipoCampania {
    id_tipo_campania: string;
    nombre: string;
    descripcion?: string;
}

export function CreadorDeTipoCampania(data: Omit<TipoCampania, 'id_tipo_campania'>): TipoCampania {
    if (!data.nombre || !data.nombre.trim()) throw new Error('Nombre requerido');
    return {
        id_tipo_campania: uuidv4(),
        ...data
    };
}
