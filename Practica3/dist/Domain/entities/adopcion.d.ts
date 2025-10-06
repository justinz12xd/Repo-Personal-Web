export interface Adopcion {
    id_adopcion: string;
    fecha_adopcion: Date;
    estado: string;
    id_publicacion: string;
    id_usuario: string;
}
export declare function CreadorDeAdopcion(data: Omit<Adopcion, 'id_adopcion' | 'fecha_adopcion'>): Adopcion;
//# sourceMappingURL=adopcion.d.ts.map