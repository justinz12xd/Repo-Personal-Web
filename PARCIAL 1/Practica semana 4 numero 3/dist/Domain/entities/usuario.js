"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreadorDeUsuario = CreadorDeUsuario;
const uuid_1 = require("uuid");
function CreadorDeUsuario(data) {
    ValidarDatosUsuario(data);
    return {
        id_usuario: (0, uuid_1.v4)(),
        fecha_registro: new Date(),
        ...data
    };
}
function ValidarDatosUsuario(data) {
    if (!data.nombre?.trim())
        throw new Error('Nombre requerido');
    if (!data.email?.trim() || !data.email.includes('@'))
        throw new Error('Email invalido');
    if (!data.contrasenia || data.contrasenia.length < 6)
        throw new Error('contrasenia debe tener al menos 6 caracteres');
}
//# sourceMappingURL=usuario.js.map