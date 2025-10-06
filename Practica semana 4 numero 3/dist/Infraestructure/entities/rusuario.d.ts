import { Adopcion } from "./radopcion";
import { Publicacion } from "./rpublicacion";
import { Donacion } from "./rdonacion";
import { Voluntario } from "./rvoluntario";
export declare class Usuario {
    id_usuario: string;
    nombre: string;
    email: string;
    contrasenia: string;
    telefono?: string;
    direccion?: string;
    fecha_registro: Date;
    adopciones?: Adopcion[];
    publicaciones?: Publicacion[];
    donaciones?: Donacion[];
    voluntarios?: Voluntario[];
}
//# sourceMappingURL=rusuario.d.ts.map