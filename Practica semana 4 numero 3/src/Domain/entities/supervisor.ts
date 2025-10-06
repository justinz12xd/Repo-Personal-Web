import { v4 as uuidv4 } from 'uuid';

export interface Supervisor {
    id_supervisor: string;
    nombre: string;
    total_animales: number;
    id_refugio?: string;
    id_animal?: string;
}

export function CreadorDeSupervisor(data: Omit<Supervisor, 'id_supervisor'>): Supervisor {
    if (!data.nombre || !data.nombre.trim()) throw new Error('Nombre de supervisor requerido');
    if (typeof data.total_animales !== 'number' || data.total_animales < 0) throw new Error('total_animales invalido');
    return {
        id_supervisor: uuidv4(),
        ...data
    };
}
