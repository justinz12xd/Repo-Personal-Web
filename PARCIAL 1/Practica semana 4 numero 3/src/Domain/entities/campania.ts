import { v4 as uuidv4 } from 'uuid';



export interface Campania {
    id_campania: string;
    id_tipo_campania: string; // FK a TIPO_CAMPANIA
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar?: string;
    organizador?: string;
    estado: string;
}

export function CreadorDeCampania(data: Omit<Campania, 'id_campania'>): Campania {
    ValidarDatosCampania(data);
    return {
        id_campania: uuidv4(),
        ...data
    };
}

function ValidarDatosCampania(data: Omit<Campania, 'id_campania'>): void {
    if (!data.id_tipo_campania?.trim()) throw new Error('id_tipo_campania (FK) requerido');
    if (!data.titulo?.trim()) throw new Error('Titulo requerido');
    if (!(data.fecha_inicio instanceof Date) || isNaN(data.fecha_inicio.getTime())) throw new Error('fecha_inicio invalida');
    if (!(data.fecha_fin instanceof Date) || isNaN(data.fecha_fin.getTime())) throw new Error('fecha_fin invalida');
    if (data.fecha_fin < data.fecha_inicio) throw new Error('fecha_fin debe ser posterior a fecha_inicio');
    if (!data.estado?.trim()) throw new Error('Estado requerido');
}