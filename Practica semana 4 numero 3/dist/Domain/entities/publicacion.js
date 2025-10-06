"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDePublicacion = CreadorDePublicacion;
const uuid_1 = require("uuid");
function CreadorDePublicacion(data) {
    if (!data.titulo || !data.titulo.trim())
        throw new Error('Titulo requerido');
    if (!data.id_usuario || !data.id_usuario.trim())
        throw new Error('id_usuario (FK) requerido');
    if (!data.id_animal || !data.id_animal.trim())
        throw new Error('id_animal (FK) requerido');
    return {
        id_publicacion: (0, uuid_1.v4)(),
        fecha_subida: new Date(),
        ...data
    };
}
//# sourceMappingURL=publicacion.js.map