export interface Campania {
    id_campania: string;
    id_tipo_campania: string;
    titulo: string;
    descripcion?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar?: string;
    organizador?: string;
    estado: string;
}
export declare function CreadorDeCampania(data: Omit<Campania, 'id_campania'>): Campania;
//# sourceMappingURL=campania.d.ts.map