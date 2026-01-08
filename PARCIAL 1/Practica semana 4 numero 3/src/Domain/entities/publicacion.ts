import { v4 as uuidv4 } from 'uuid';



export interface Publicacion {
    id_publicacion: string;
    titulo: string;
    descripcion?: string;
    fecha_subida: Date;
    estado: string;
    id_usuario: string;
    id_animal: string;
}

export function CreadorDePublicacion(data: Omit<Publicacion, 'id_publicacion' | 'fecha_subida'>): Publicacion {
    if (!data.titulo || !data.titulo.trim()) throw new Error('Titulo requerido');
    if (!data.id_usuario || !data.id_usuario.trim()) throw new Error('id_usuario (FK) requerido');
    if (!data.id_animal || !data.id_animal.trim()) throw new Error('id_animal (FK) requerido');
    return {
        id_publicacion: uuidv4(),
        fecha_subida: new Date(),
        ...data
    };
}
