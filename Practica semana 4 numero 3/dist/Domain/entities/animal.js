"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeAnimal = CreadorDeAnimal;
const uuid_1 = require("uuid");
function CreadorDeAnimal(data) {
    ValidarDatosAnimal(data);
    return {
        id_animal: (0, uuid_1.v4)(),
        ...data
    };
}
function ValidarDatosAnimal(data) {
    if (!data.nombre || !data.nombre.trim())
        throw new Error('Nombre requerido');
    if (!data.id_especie || !data.id_especie.trim())
        throw new Error('id_especie (FK) requerido');
    if (!data.edad || !data.edad.trim())
        throw new Error('Edad requerida');
    if (!data.estado || !data.estado.trim())
        throw new Error('Estado requerido');
    if (!data.estado_adopcion || !data.estado_adopcion.trim())
        throw new Error('Estado de adopcion requerido');
    if (!data.id_refugio || !data.id_refugio.trim())
        throw new Error('id_refugio (FK) requerido');
    if (data.fotos && !Array.isArray(data.fotos))
        throw new Error('fotos debe ser un array de strings');
}
//# sourceMappingURL=animal.js.map