import { v4 as uuidv4 } from 'uuid';

export interface Donacion {
    id_donacion: string;
    tipo_donacion: string;
    descripcion: string;
    cantidad: number;
    moneda: string;
    fecha_donacion: Date;
    donante: string;
    beneficiario: string;
    metodo_pago: string;
    estado: 'pendiente' | 'completada' | 'cancelada';
    anonima: boolean;
}

export function CreadorDeDonacion(data: Omit<Donacion, 'id_donacion'>): Donacion {
    ValidarDatosDonacion(data);
    return {
        id_donacion: uuidv4(),
        ...data
    };
}

function ValidarDatosDonacion(data: Omit<Donacion, 'id_donacion'>): void {
    if (!data.tipo_donacion?.trim()) throw new Error("Tipo de donación requerido");
    if (!data.descripcion?.trim()) throw new Error("Descripción requerida");
    if (typeof data.cantidad !== 'number' || data.cantidad <= 0) throw new Error("La cantidad debe ser un número mayor a cero");
    if (!data.moneda?.trim()) throw new Error("Moneda requerida");
    if (!(data.fecha_donacion instanceof Date) || isNaN(data.fecha_donacion.getTime())) throw new Error("Fecha de donación inválida");
    if (!data.donante?.trim()) throw new Error("Donante requerido");
    if (!data.beneficiario?.trim()) throw new Error("Beneficiario requerido");
    if (!data.metodo_pago?.trim()) throw new Error("Método de pago requerido");
    if (!['pendiente', 'completada', 'cancelada'].includes(data.estado)) throw new Error("Estado debe ser: pendiente, completada o cancelada");
    if (typeof data.anonima !== 'boolean') throw new Error("Anónima debe ser un valor booleano (true o false)");
}