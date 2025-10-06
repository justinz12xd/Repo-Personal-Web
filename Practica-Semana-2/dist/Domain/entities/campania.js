import { v4 as uuidv4 } from 'uuid';
export function createCampania(tipo_campania, titulo, descripcion, fecha_inicio, fecha_fin, lugar, organizador, estado) {
    return {
        id_campania: uuidv4(),
        tipo_campania,
        titulo,
        descripcion,
        fecha_inicio,
        fecha_fin,
        lugar,
        organizador,
        estado
    };
}
//# sourceMappingURL=campania.js.map