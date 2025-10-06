export interface Publicacion {
    id_publicacion: string;
    titulo: string;
    descripcion?: string;
    fecha_subida: Date;
    estado: string;
    id_usuario: string;
    id_animal: string;
}
export declare function CreadorDePublicacion(data: Omit<Publicacion, 'id_publicacion' | 'fecha_subida'>): Publicacion;
//# sourceMappingURL=publicacion.d.ts.map