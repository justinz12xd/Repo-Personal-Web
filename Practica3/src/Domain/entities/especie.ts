import { v4 as uuidv4 } from 'uuid';

// ESPECIE {
//   uuid id_especie PK
//   varchar nombre UK
// }

export interface Especie {
    id_especie: string;
    nombre: string;
}

export function CreadorDeEspecie(data: Omit<Especie, 'id_especie'>): Especie {
    if (!data.nombre || !data.nombre.trim()) throw new Error('Nombre de especie requerido');
    return {
        id_especie: uuidv4(),
        ...data
    };
}
