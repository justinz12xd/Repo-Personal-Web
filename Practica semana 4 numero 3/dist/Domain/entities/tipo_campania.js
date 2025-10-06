"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeTipoCampania = CreadorDeTipoCampania;
const uuid_1 = require("uuid");
function CreadorDeTipoCampania(data) {
    if (!data.nombre || !data.nombre.trim())
        throw new Error('Nombre requerido');
    return {
        id_tipo_campania: (0, uuid_1.v4)(),
        ...data
    };
}
//# sourceMappingURL=tipo_campania.js.map