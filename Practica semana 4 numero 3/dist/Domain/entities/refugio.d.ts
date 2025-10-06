export interface Refugio {
    id_refugio: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    descripcion?: string;
}
export declare function CreadorDeRefugio(data: Omit<Refugio, 'id_refugio'>): Refugio;
//# sourceMappingURL=refugio.d.ts.map