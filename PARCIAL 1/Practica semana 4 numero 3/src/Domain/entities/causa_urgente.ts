import { v4 as uuidv4 } from 'uuid';


export interface CausaUrgente {
    id_causa_urgente: string;
    titulo: string;
    descripcion?: string;
    meta: number;
    fecha_limite: Date;
    id_refugio?: string;
    id_animal?: string;
}

export function CreadorDeCausaUrgente(data: Omit<CausaUrgente, 'id_causa_urgente'>): CausaUrgente {
    if (!data.titulo || !data.titulo.trim()) throw new Error('Titulo requerido');
    if (typeof data.meta !== 'number' || isNaN(data.meta) || data.meta < 0) throw new Error('Meta invalida');
    if (!(data.fecha_limite instanceof Date) || isNaN(data.fecha_limite.getTime())) throw new Error('fecha_limite invalida');
    return {
        id_causa_urgente: uuidv4(),
        ...data
    };
}
