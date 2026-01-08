"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeSupervisor = CreadorDeSupervisor;
const uuid_1 = require("uuid");
function CreadorDeSupervisor(data) {
    if (!data.nombre || !data.nombre.trim())
        throw new Error('Nombre de supervisor requerido');
    if (typeof data.total_animales !== 'number' || data.total_animales < 0)
        throw new Error('total_animales invalido');
    return {
        id_supervisor: (0, uuid_1.v4)(),
        ...data
    };
}
//# sourceMappingURL=supervisor.js.map