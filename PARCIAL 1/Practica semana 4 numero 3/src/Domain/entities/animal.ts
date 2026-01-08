import { v4 as uuidv4 } from "uuid";

export interface Animal {
    id_animal: string;
    nombre: string;
    id_especie: string; // FK a ESPECIE (uuid)
    edad: string; // conforme a diagrama: varchar
    estado: string;
    descripcion?: string;
    fotos?: string[]; // array de URLs o paths
    estado_adopcion: string;
    id_refugio: string; // FK a REFUGIO (uuid)
}

export function CreadorDeAnimal(data: Omit<Animal, "id_animal">): Animal {
    ValidarDatosAnimal(data);
    return {
        id_animal: uuidv4(),
        ...data
    };
}

function ValidarDatosAnimal(data: Omit<Animal, "id_animal">): void {
    if (!data.nombre || !data.nombre.trim()) throw new Error('Nombre requerido');
    if (!data.id_especie || !data.id_especie.trim()) throw new Error('id_especie (FK) requerido');
    if (!data.edad || !data.edad.trim()) throw new Error('Edad requerida');
    if (!data.estado || !data.estado.trim()) throw new Error('Estado requerido');
    if (!data.estado_adopcion || !data.estado_adopcion.trim()) throw new Error('Estado de adopcion requerido');
    if (!data.id_refugio || !data.id_refugio.trim()) throw new Error('id_refugio (FK) requerido');
    if (data.fotos && !Array.isArray(data.fotos)) throw new Error('fotos debe ser un array de strings');
}


