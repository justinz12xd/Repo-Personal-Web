export interface Seguimiento {
    id_seguimiento: string;
    titulo: string;
    observaciones?: string;
    fecha_seguimiento: Date;
    id_animal: string;
    id_supervisor: string;
}
export declare function CreadorDeSeguimiento(data: Omit<Seguimiento, 'id_seguimiento' | 'fecha_seguimiento'>): Seguimiento;
//# sourceMappingURL=seguimiento.d.ts.map