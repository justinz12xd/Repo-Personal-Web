import { Usuario } from "./rusuario";
import { Animal } from "./ranimal";
import { Adopcion } from "./radopcion";
export declare class Publicacion {
    id_publicacion: string;
    titulo: string;
    descripcion?: string;
    fecha_subida: Date;
    estado: string;
    id_usuario: string;
    id_animal: string;
    usuario: Usuario;
    animal: Animal;
    adopciones?: Adopcion[];
}
//# sourceMappingURL=rpublicacion.d.ts.map