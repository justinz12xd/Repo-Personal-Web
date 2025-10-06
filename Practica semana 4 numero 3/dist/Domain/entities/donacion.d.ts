export interface Donacion {
    id_donacion: string;
    monto: number;
    fecha: Date;
    id_usuario: string;
    id_causa_urgente?: string;
}
export declare function CreadorDeDonacion(data: Omit<Donacion, 'id_donacion'>): Donacion;
//# sourceMappingURL=donacion.d.ts.map