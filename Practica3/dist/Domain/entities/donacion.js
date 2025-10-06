"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeDonacion = CreadorDeDonacion;
const uuid_1 = require("uuid");
function CreadorDeDonacion(data) {
    ValidarDatosDonacion(data);
    return {
        id_donacion: (0, uuid_1.v4)(),
        ...data
    };
}
function ValidarDatosDonacion(data) {
    if (typeof data.monto !== 'number' || isNaN(data.monto) || data.monto <= 0)
        throw new Error('monto invalido');
    if (!(data.fecha instanceof Date) || isNaN(data.fecha.getTime()))
        throw new Error('fecha invalida');
    if (!data.id_usuario?.trim())
        throw new Error('id_usuario (FK) requerido');
}
//# sourceMappingURL=donacion.js.map