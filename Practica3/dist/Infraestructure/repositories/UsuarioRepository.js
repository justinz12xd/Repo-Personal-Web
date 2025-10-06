"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const data_source_1 = require("../../data-source");
const rusuario_1 = require("../entities/rusuario");
class UsuarioRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(rusuario_1.Usuario);
    }
    insert(usuario, callback) {
        this.createUsuario(usuario)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }
    async findById(id) {
        const usuario = await this.repository.findOne({
            where: { id_usuario: id }
        });
        return usuario ? this.toDomainEntity(usuario) : null;
    }
    async findAll() {
        const usuarios = await this.repository.find();
        return usuarios.map(this.toDomainEntity);
    }
    async update(id, data) {
        await this.repository.update({ id_usuario: id }, data);
        const updatedUsuario = await this.repository.findOne({
            where: { id_usuario: id }
        });
        if (!updatedUsuario) {
            throw new Error(`Usuario with id ${id} not found`);
        }
        return this.toDomainEntity(updatedUsuario);
    }
    async delete(id) {
        const result = await this.repository.delete({ id_usuario: id });
        return (result.affected ?? 0) > 0;
    }
    async createUsuario(usuarioData) {
        const rUsuario = this.toInfrastructureEntity(usuarioData);
        const savedUsuario = await this.repository.save(rUsuario);
        return this.toDomainEntity(savedUsuario);
    }
    toDomainEntity(rUsuario) {
        const domainUsuario = {
            id_usuario: rUsuario.id_usuario,
            nombre: rUsuario.nombre,
            email: rUsuario.email,
            contrasenia: rUsuario.contrasenia,
            fecha_registro: rUsuario.fecha_registro
        };
        // Asignar propiedades opcionales solo si tienen valor
        if (rUsuario.telefono) {
            domainUsuario.telefono = rUsuario.telefono;
        }
        if (rUsuario.direccion) {
            domainUsuario.direccion = rUsuario.direccion;
        }
        return domainUsuario;
    }
    toInfrastructureEntity(usuario) {
        const rUsuario = new rusuario_1.Usuario();
        rUsuario.nombre = usuario.nombre;
        rUsuario.email = usuario.email;
        rUsuario.contrasenia = usuario.contrasenia;
        // Asignar propiedades opcionales solo si tienen valor
        if (usuario.telefono) {
            rUsuario.telefono = usuario.telefono;
        }
        if (usuario.direccion) {
            rUsuario.direccion = usuario.direccion;
        }
        return rUsuario;
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=UsuarioRepository.js.map