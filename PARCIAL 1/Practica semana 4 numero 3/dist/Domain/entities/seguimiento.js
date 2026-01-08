"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeSeguimiento = CreadorDeSeguimiento;
const uuid_1 = require("uuid");
function CreadorDeSeguimiento(data) {
    if (!data.titulo || !data.titulo.trim())
        throw new Error('Titulo requerido');
    if (!data.id_animal || !data.id_animal.trim())
        throw new Error('id_animal (FK) requerido');
    if (!data.id_supervisor || !data.id_supervisor.trim())
        throw new Error('id_supervisor (FK) requerido');
    return {
        id_seguimiento: (0, uuid_1.v4)(),
        fecha_seguimiento: new Date(),
        ...data
    };
}
//# sourceMappingURL=seguimiento.js.map