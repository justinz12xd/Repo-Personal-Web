"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeCampania = CreadorDeCampania;
const uuid_1 = require("uuid");
function CreadorDeCampania(data) {
    ValidarDatosCampania(data);
    return {
        id_campania: (0, uuid_1.v4)(),
        ...data
    };
}
function ValidarDatosCampania(data) {
    if (!data.id_tipo_campania?.trim())
        throw new Error('id_tipo_campania (FK) requerido');
    if (!data.titulo?.trim())
        throw new Error('Titulo requerido');
    if (!(data.fecha_inicio instanceof Date) || isNaN(data.fecha_inicio.getTime()))
        throw new Error('fecha_inicio invalida');
    if (!(data.fecha_fin instanceof Date) || isNaN(data.fecha_fin.getTime()))
        throw new Error('fecha_fin invalida');
    if (data.fecha_fin < data.fecha_inicio)
        throw new Error('fecha_fin debe ser posterior a fecha_inicio');
    if (!data.estado?.trim())
        throw new Error('Estado requerido');
}
//# sourceMappingURL=campania.js.map