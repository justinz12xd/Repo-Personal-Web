"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeCausaUrgente = CreadorDeCausaUrgente;
const uuid_1 = require("uuid");
function CreadorDeCausaUrgente(data) {
    if (!data.titulo || !data.titulo.trim())
        throw new Error('Titulo requerido');
    if (typeof data.meta !== 'number' || isNaN(data.meta) || data.meta < 0)
        throw new Error('Meta invalida');
    if (!(data.fecha_limite instanceof Date) || isNaN(data.fecha_limite.getTime()))
        throw new Error('fecha_limite invalida');
    return {
        id_causa_urgente: (0, uuid_1.v4)(),
        ...data
    };
}
//# sourceMappingURL=causa_urgente.js.map