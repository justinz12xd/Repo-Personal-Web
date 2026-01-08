export interface Campania {
    id_campania: string;
    tipo_campania: string;
    titulo: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    lugar: string;
    organizador: string;
    estado: string;
}
export declare function createCampania(tipo_campania: string, titulo: string, descripcion: string, fecha_inicio: Date, fecha_fin: Date, lugar: string, organizador: string, estado: string): Campania;
//# sourceMappingURL=campania.d.ts.map