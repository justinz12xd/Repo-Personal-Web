"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeAdopcion = CreadorDeAdopcion;
const uuid_1 = require("uuid");
function CreadorDeAdopcion(data) {
    if (!data.estado || !data.estado.trim())
        throw new Error('Estado requerido');
    if (!data.id_publicacion || !data.id_publicacion.trim())
        throw new Error('id_publicacion (FK) requerido');
    if (!data.id_usuario || !data.id_usuario.trim())
        throw new Error('id_usuario (FK) requerido');
    return {
        id_adopcion: (0, uuid_1.v4)(),
        fecha_adopcion: new Date(),
        ...data
    };
}
//# sourceMappingURL=adopcion.js.map