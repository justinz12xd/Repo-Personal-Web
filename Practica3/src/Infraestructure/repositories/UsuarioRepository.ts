import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IUsuarioRepo, UsuarioCreador, UsuarioUpdate } from "../../Domain/repositories/iusuario";
import { Usuario as DomainUsuario } from "../../Domain/entities/usuario";
import { Usuario as RUsuario } from "../entities/rusuario";

export class UsuarioRepository implements IUsuarioRepo {
    private repository: Repository<RUsuario>;

    constructor() {
        this.repository = AppDataSource.getRepository(RUsuario);
    }

    insert(usuario: UsuarioCreador, callback: (err: Error | null, result?: DomainUsuario) => void): void {
        this.createUsuario(usuario)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainUsuario | null> {
        const usuario = await this.repository.findOne({
            where: { id_usuario: id }
        });
        return usuario ? this.toDomainEntity(usuario) : null;
    }

    async findAll(): Promise<DomainUsuario[]> {
        const usuarios = await this.repository.find();
        return usuarios.map(this.toDomainEntity);
    }

    async update(id: string, data: UsuarioUpdate): Promise<DomainUsuario> {
        await this.repository.update({ id_usuario: id }, data);
        const updatedUsuario = await this.repository.findOne({
            where: { id_usuario: id }
        });
        if (!updatedUsuario) {
            throw new Error(`Usuario with id ${id} not found`);
        }
        return this.toDomainEntity(updatedUsuario);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_usuario: id });
        return (result.affected ?? 0) > 0;
    }

    private async createUsuario(usuarioData: UsuarioCreador): Promise<DomainUsuario> {
        const rUsuario = this.toInfrastructureEntity(usuarioData);
        const savedUsuario = await this.repository.save(rUsuario);
        return this.toDomainEntity(savedUsuario);
    }

    private toDomainEntity(rUsuario: RUsuario): DomainUsuario {
        const domainUsuario: DomainUsuario = {
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

    private toInfrastructureEntity(usuario: UsuarioCreador): RUsuario {
        const rUsuario = new RUsuario();
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