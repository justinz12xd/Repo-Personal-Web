export interface TipoCampania {
    id_tipo_campania: string;
    nombre: string;
    descripcion?: string;
}
export declare function CreadorDeTipoCampania(data: Omit<TipoCampania, 'id_tipo_campania'>): TipoCampania;
//# sourceMappingURL=tipo_campania.d.ts.map