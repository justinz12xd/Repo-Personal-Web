"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeRefugio = CreadorDeRefugio;
const uuid_1 = require("uuid");
function CreadorDeRefugio(data) {
    if (!data.nombre || !data.nombre.trim())
        throw new Error('Nombre de refugio requerido');
    return {
        id_refugio: (0, uuid_1.v4)(),
        ...data
    };
}
//# sourceMappingURL=refugio.js.map