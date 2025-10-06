"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeEspecie = CreadorDeEspecie;
const uuid_1 = require("uuid");
function CreadorDeEspecie(data) {
    if (!data.nombre || !data.nombre.trim())
        throw new Error('Nombre de especie requerido');
    return {
        id_especie: (0, uuid_1.v4)(),
        ...data
    };
}
//# sourceMappingURL=especie.js.map