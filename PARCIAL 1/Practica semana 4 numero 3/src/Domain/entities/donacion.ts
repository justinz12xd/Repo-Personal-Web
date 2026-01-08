import { v4 as uuidv4 } from 'uuid';

export interface Donacion {
    id_donacion: string;
    monto: number;
    fecha: Date;
    id_usuario: string; // FK a USUARIO
    id_causa_urgente?: string; // FK a CAUSA_URGENTE (opcional en algunos flujos)
}

export function CreadorDeDonacion(data: Omit<Donacion, 'id_donacion'>): Donacion {
    ValidarDatosDonacion(data);
    return {
        id_donacion: uuidv4(),
        ...data
    };
}

function ValidarDatosDonacion(data: Omit<Donacion, 'id_donacion'>): void {
    if (typeof data.monto !== 'number' || isNaN(data.monto) || data.monto <= 0) throw new Error('monto invalido');
    if (!(data.fecha instanceof Date) || isNaN(data.fecha.getTime())) throw new Error('fecha invalida');
    if (!data.id_usuario?.trim()) throw new Error('id_usuario (FK) requerido');
}