"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeVoluntario = CreadorDeVoluntario;
const uuid_1 = require("uuid");
function CreadorDeVoluntario(data) {
    if (!data.rol || !data.rol.trim())
        throw new Error('Rol requerido');
    if (!data.estado || !data.estado.trim())
        throw new Error('Estado requerido');
    if (!data.id_usuario || !data.id_usuario.trim())
        throw new Error('id_usuario (FK) requerido');
    if (!data.id_campania || !data.id_campania.trim())
        throw new Error('id_campania (FK) requerido');
    return {
        id_voluntario: (0, uuid_1.v4)(),
        ...data
    };
}
//# sourceMappingURL=voluntario.js.map